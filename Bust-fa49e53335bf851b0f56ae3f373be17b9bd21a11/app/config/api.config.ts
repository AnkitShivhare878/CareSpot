// =============================================================================
// 🔧 API CONFIGURATION - USER APP
// =============================================================================
// Change this to your server's IP address when running on a physical device
// For Android Emulator, use: 10.0.2.2
// For iOS Simulator, use: localhost
// For physical device, use your computer's local IP (e.g., 192.168.1.X)
// =============================================================================

import { Platform } from 'react-native';

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
        return 'http://localhost:3000'; // Always use localhost for web
    }

    if (Platform.OS === 'android') {
        // Use Android Emulator URL for emulator, or physical device URL
        // Change this based on your testing environment
        return DEV_CONFIG.ANDROID_EMULATOR_URL;
    }

    // iOS Simulator
    if (Platform.OS === 'ios') {
        return DEV_CONFIG.WEB_URL; // localhost works for iOS simulator
    }

    // Default to physical device URL
    return DEV_CONFIG.PHYSICAL_DEVICE_URL;
};

// =============================================================================
// 📡 API CONFIGURATION
// =============================================================================
export const API_BASE_URL = getBaseUrl();

// =============================================================================
// 🔐 AUTH TOKEN MANAGEMENT
// =============================================================================
let authToken: string | null = null;

export const setAuthToken = (token: string | null): void => {
    authToken = token;
};

export const getAuthToken = (): string | null => authToken;

// =============================================================================
// 🌐 FETCH WRAPPER
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

    if (authenticated && authToken) {
        headers['x-auth-token'] = authToken;
    }

    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`📤 API Request: ${fetchOptions.method || 'GET'} ${url}`);

    try {
        const response = await fetch(url, {
            ...fetchOptions,
            headers,
        });

        console.log(`📥 API Response: ${response.status} ${url}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ msg: 'Request failed' }));
            throw new Error(errorData.msg || `HTTP error! status: ${response.status}`);
        }

        // Handle empty responses
        const text = await response.text();
        if (!text) return {} as T;

        return JSON.parse(text) as T;
    } catch (error) {
        console.error('❌ API Error:', error);
        throw error;
    }
};

// =============================================================================
// 🏥 API TYPES
// =============================================================================
interface LoginCredentials {
    email: string;
    password: string;
}

interface SignupData {
    name?: string;
    email: string;
    password: string;
    hospitalName?: string;
}

interface AuthResponse {
    token: string;
    role: string;
}

interface BedBookingData {
    hospitalName: string;
    bedType: string;
    date: string;
    time: string;
    price: number;
}

interface AmbulanceBookingData {
    pickupLat: number;
    pickupLon: number;
    hospitalId: string;
}

interface Hospital {
    _id: string;
    name: string;
    photo?: string;
    bio?: string;
    rating?: number;
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

interface Bed {
    _id: string;
    bedNumber: string;
    isAvailable: boolean;
    hospital: string;
}

interface HospitalDetails {
    hospital: Hospital;
    beds: Bed[];
    ambulances: Ambulance[];
}

interface AmbulanceStatus {
    _id: string;
    currentLocation: { type: string; coordinates: number[] };
    status: string;
}

// =============================================================================
// 🏥 API METHODS
// =============================================================================
export const api = {
    // ==========================================================================
    // 🔐 AUTHENTICATION
    // ==========================================================================

    /**
     * Login user and get JWT token
     */
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const data = await fetchApi<AuthResponse>('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
            authenticated: false,
        });
        if (data.token) {
            setAuthToken(data.token);
        }
        return data;
    },

    /**
     * Register new user
     */
    signup: async (userData: SignupData): Promise<AuthResponse> => {
        const data = await fetchApi<AuthResponse>('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
            authenticated: false,
        });
        if (data.token) {
            setAuthToken(data.token);
        }
        return data;
    },

    /**
     * Logout - clear token
     */
    logout: (): void => {
        setAuthToken(null);
    },

    // ==========================================================================
    // 🏥 HOSPITALS
    // ==========================================================================

    /**
     * Get all hospitals
     */
    getHospitals: async (): Promise<Hospital[]> => {
        return fetchApi<Hospital[]>('/hospitals', { authenticated: false });
    },

    /**
     * Get single hospital with beds and ambulances
     */
    getHospitalDetails: async (hospitalId: string): Promise<HospitalDetails> => {
        return fetchApi<HospitalDetails>(`/hospitals/${hospitalId}`, { authenticated: false });
    },

    // ==========================================================================
    // 🛏️ BEDS
    // ==========================================================================

    /**
     * Get all beds
     */
    getBeds: async (): Promise<Bed[]> => {
        return fetchApi<Bed[]>('/beds', { authenticated: false });
    },

    /**
     * Book a bed
     */
    bookBed: async (bookingData: BedBookingData): Promise<unknown> => {
        return fetchApi('/bookings', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    // ==========================================================================
    // 🚑 AMBULANCES
    // ==========================================================================

    /**
     * Get all ambulances
     */
    getAmbulances: async (): Promise<Ambulance[]> => {
        return fetchApi<Ambulance[]>('/ambulances', { authenticated: false });
    },

    /**
     * Book an ambulance
     */
    bookAmbulance: async (bookingData: AmbulanceBookingData): Promise<Ambulance> => {
        return fetchApi<Ambulance>('/ambulance/book', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        });
    },

    /**
     * Get ambulance status (for tracking)
     */
    getAmbulanceStatus: async (ambulanceId: string): Promise<AmbulanceStatus> => {
        return fetchApi<AmbulanceStatus>(`/ambulance/status/${ambulanceId}`);
    },

    // ==========================================================================
    // 📋 BOOKINGS
    // ==========================================================================

    /**
     * Chat with AI Bot
     */
    chatWithBot: async (message: string): Promise<{ reply: string }> => {
        return fetchApi<{ reply: string }>('/api/chat', {
            method: 'POST',
            body: JSON.stringify({ message }),
            authenticated: false
        });
    },

    /**
     * Get all bookings for current user
     */
    getBookings: async (): Promise<unknown[]> => {
        return fetchApi<unknown[]>('/bookings');
    },
};

// Export default
export default api;
