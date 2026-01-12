// =============================================================================
// 🔧 API CONFIGURATION - ADMIN APP
// =============================================================================
// Change this to your server's IP address when running on a physical device
// For Android Emulator, use: 10.0.2.2
// For iOS Simulator, use: localhost
// For physical device, use your computer's local IP (e.g., 192.168.1.X)
// =============================================================================

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Development Configuration
const DEV_CONFIG = {
    // For Web & iOS Simulator
    WEB_URL: 'http://localhost:3000',
    // For Android Emulator
    ANDROID_EMULATOR_URL: 'http://10.0.2.2:3000',
    // For Physical Device - Replace with your computer's IP
    PHYSICAL_DEVICE_URL: 'http://192.168.1.X:3000',
};

// Production Configuration (when deployed)
const PROD_CONFIG = {
    URL: 'https://your-production-server.com',
};

// =============================================================================
// 🌐 DETERMINE THE CORRECT BASE URL
// =============================================================================
const getBaseUrl = (): string => {
    // Check if we're in production
    if (__DEV__ === false) {
        return PROD_CONFIG.URL;
    }

    // For development, detect platform
    if (Platform.OS === 'web') {
        return DEV_CONFIG.WEB_URL;
    }

    if (Platform.OS === 'android') {
        return DEV_CONFIG.ANDROID_EMULATOR_URL;
    }

    // iOS Simulator
    if (Platform.OS === 'ios') {
        return DEV_CONFIG.WEB_URL;
    }

    return DEV_CONFIG.PHYSICAL_DEVICE_URL;
};

// =============================================================================
// 📡 API CONFIGURATION
// =============================================================================
export const API_BASE_URL = getBaseUrl();

// Token storage key
const TOKEN_KEY = 'admin_auth_token';

// =============================================================================
// 🔐 AUTH TOKEN MANAGEMENT
// =============================================================================
let authToken: string | null = null;

export const setAuthToken = async (token: string | null): Promise<void> => {
    authToken = token;
    if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
    } else {
        await AsyncStorage.removeItem(TOKEN_KEY);
    }
};

export const getAuthToken = async (): Promise<string | null> => {
    if (authToken) return authToken;
    authToken = await AsyncStorage.getItem(TOKEN_KEY);
    return authToken;
};

export const clearAuthToken = async (): Promise<void> => {
    authToken = null;
    await AsyncStorage.removeItem(TOKEN_KEY);
};

// Initialize token from storage
export const initializeAuthToken = async (): Promise<string | null> => {
    authToken = await AsyncStorage.getItem(TOKEN_KEY);
    return authToken;
};

// =============================================================================
// 🌐 FETCH WRAPPER WITH AUTH
// =============================================================================
interface FetchOptions extends RequestInit {
    authenticated?: boolean;
}

const fetchApi = async <T>(endpoint: string, options: FetchOptions = {}): Promise<T> => {
    const { authenticated = true, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(fetchOptions.headers as Record<string, string> || {}),
    };

    if (authenticated) {
        const token = await getAuthToken();
        if (token) {
            headers['x-auth-token'] = token;
        }
    }

    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`📤 Admin API Request: ${fetchOptions.method || 'GET'} ${url}`);

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers,
        });

        console.log(`📥 Admin API Response: ${response.status} ${url}`);

        if (response.status === 401) {
            await clearAuthToken();
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ msg: 'Request failed' }));
            throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        if (!text) return {} as T;

        return JSON.parse(text) as T;
    } catch (error) {
        console.error('❌ Admin API Error:', error);
        throw error;
    }
};

// =============================================================================
// 🏥 API TYPES - ADMIN
// =============================================================================
interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupData {
    email: string;
    password: string;
    hospitalName: string;
}

interface AuthResponse {
    token: string;
    role: string;
}

interface HospitalData {
    name: string;
    photo?: string;
    bio?: string;
    rating?: number;
}

interface Hospital {
    _id: string;
    name: string;
    user: string;
    photo?: string;
    bio?: string;
    rating?: number;
}

interface BedData {
    bedNumber: string;
    isAvailable: boolean;
    hospital: string;
}

interface Bed {
    _id: string;
    bedNumber: string;
    isAvailable: boolean;
    hospital: string;
}

interface AmbulanceData {
    ambulanceNumber: string;
    isAvailable: boolean;
    hospital: string;
}

interface Ambulance {
    _id: string;
    ambulanceNumber: string;
    isAvailable: boolean;
    hospital: string;
    status?: string;
    currentLocation?: {
        type: string;
        coordinates: number[];
    };
}

interface AmbulanceLocationUpdate {
    lat: number;
    lon: number;
}

interface HospitalDetails {
    hospital: Hospital;
    beds: Bed[];
    ambulances: Ambulance[];
}

// =============================================================================
// 🏥 ADMIN API METHODS
// =============================================================================
export const adminApi = {
    // ==========================================================================
    // 🔐 AUTHENTICATION
    // ==========================================================================

    /**
     * Login admin and get JWT token
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const data = await fetchApi<AuthResponse>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            authenticated: false,
        });
        if (data.token) {
            await setAuthToken(data.token);
        }
        return data;
    },

    /**
     * Register new hospital admin
     */
    signup: async (userData: SignupData): Promise<AuthResponse> => {
        const data = await fetchApi<AuthResponse>('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
            authenticated: false,
        });
        if (data.token) {
            await setAuthToken(data.token);
        }
        return data;
    },

    /**
     * Logout - clear token
     */
    logout: async (): Promise<void> => {
        await clearAuthToken();
    },

    // ==========================================================================
    // 🏥 HOSPITAL MANAGEMENT (ADMIN)
    // ==========================================================================

    /**
     * Get current admin's hospital
     */
    getMyHospital: async (): Promise<Hospital> => {
        return fetchApi<Hospital>('/hospitals/me');
    },

    /**
     * Create a new hospital
     */
    createHospital: async (hospitalData: HospitalData): Promise<Hospital> => {
        return fetchApi<Hospital>('/hospitals', {
            method: 'POST',
            body: JSON.stringify(hospitalData),
        });
    },

    /**
     * Update hospital details
     */
    updateHospital: async (hospitalId: string, hospitalData: Partial<HospitalData>): Promise<Hospital> => {
        return fetchApi<Hospital>(`/hospitals/${hospitalId}`, {
            method: 'PUT',
            body: JSON.stringify(hospitalData),
        });
    },

    /**
     * Get all hospitals (public)
     */
    getAllHospitals: async (): Promise<Hospital[]> => {
        return fetchApi<Hospital[]>('/hospitals', { authenticated: false });
    },

    /**
     * Get hospital details with beds and ambulances
     */
    getHospitalDetails: async (hospitalId: string): Promise<HospitalDetails> => {
        return fetchApi<HospitalDetails>(`/hospitals/${hospitalId}`, { authenticated: false });
    },

    // ==========================================================================
    // 🛏️ BED MANAGEMENT
    // ==========================================================================

    /**
     * Get all beds
     */
    getBeds: async (): Promise<Bed[]> => {
        return fetchApi<Bed[]>('/beds', { authenticated: false });
    },

    /**
     * Add a new bed
     */
    addBed: async (bedData: BedData): Promise<Bed> => {
        return fetchApi<Bed>('/beds', {
            method: 'POST',
            body: JSON.stringify(bedData),
        });
    },

    /**
     * Delete a bed
     */
    deleteBed: async (bedId: string): Promise<{ msg: string }> => {
        return fetchApi<{ msg: string }>(`/beds/${bedId}`, {
            method: 'DELETE',
        });
    },

    // ==========================================================================
    // 🚑 AMBULANCE MANAGEMENT
    // ==========================================================================

    /**
     * Get all ambulances
     */
    getAmbulances: async (): Promise<Ambulance[]> => {
        return fetchApi<Ambulance[]>('/ambulances', { authenticated: false });
    },

    /**
     * Add a new ambulance
     */
    addAmbulance: async (ambulanceData: AmbulanceData): Promise<Ambulance> => {
        return fetchApi<Ambulance>('/ambulances', {
            method: 'POST',
            body: JSON.stringify(ambulanceData),
        });
    },

    /**
     * Delete an ambulance
     */
    deleteAmbulance: async (ambulanceId: string): Promise<{ msg: string }> => {
        return fetchApi<{ msg: string }>(`/ambulances/${ambulanceId}`, {
            method: 'DELETE',
        });
    },

    /**
     * Update ambulance location (for driver/admin)
     */
    updateAmbulanceLocation: async (ambulanceId: string, location: AmbulanceLocationUpdate): Promise<Ambulance> => {
        return fetchApi<Ambulance>(`/ambulance/location/${ambulanceId}`, {
            method: 'PUT',
            body: JSON.stringify(location),
        });
    },

    // ==========================================================================
    // 📋 BOOKINGS
    // ==========================================================================

    /**
     * Get all bookings
     */
    getBookings: async (): Promise<unknown[]> => {
        return fetchApi<unknown[]>('/bookings');
    },
};

// Export for direct fetch calls if needed
export { fetchApi };

export default adminApi;
