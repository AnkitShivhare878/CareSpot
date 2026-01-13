import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Keyboard, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AmbulanceMap from '../../components/AmbulanceMap';

const AmbulancePickupScreen = () => {
  const router = useRouter();
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [nearbyAmbulances, setNearbyAmbulances] = useState<any[]>([]);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [mapRegion, setMapRegion] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        console.log("📍 Requesting location permissions...");
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.warn("⚠️ Location permission denied. Using fallback.");
          useFallbackLocation();
          return;
        }

        console.log("📍 Getting current position...");
        // Add a timeout because getCurrentPosition can be slow/stuck on some browsers
        const locationPromise = Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Location timeout")), 5000)
        );

        const location = await Promise.race([locationPromise, timeoutPromise]) as Location.LocationObject;

        console.log("✅ Location received:", location.coords);
        setLocation(location);
        generateNearbyAmbulances(location.coords.latitude, location.coords.longitude);
      } catch (error) {
        console.error("❌ Location Error:", error);
        setErrorMsg("Could not get your precise location. Using default center.");
        useFallbackLocation();
      }
    })();
  }, []);

  const useFallbackLocation = () => {
    // Default to Bangalore (matches MOCK_DATA in server)
    const fallbackLoc = {
      coords: {
        latitude: 12.9716,
        longitude: 77.5946,
        altitude: 0,
        accuracy: 0,
        altitudeAccuracy: 0,
        heading: 0,
        speed: 0,
      },
      timestamp: Date.now(),
    };
    setLocation(fallbackLoc);
    generateNearbyAmbulances(fallbackLoc.coords.latitude, fallbackLoc.coords.longitude);
  };

  const generateNearbyAmbulances = (lat: number, long: number) => {
    // Generate 3 random locations near the user
    const ambulances = Array.from({ length: 3 }).map((_, i) => ({
      id: i,
      latitude: lat + (Math.random() - 0.5) * 0.01,
      longitude: long + (Math.random() - 0.5) * 0.01,
    }));
    setNearbyAmbulances(ambulances);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    Keyboard.dismiss();

    try {
      const geocoded = await Location.geocodeAsync(searchQuery);
      if (geocoded.length > 0) {
        const { latitude, longitude } = geocoded[0];
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } else {
        alert("Location not found");
      }
    } catch (e) {
      alert("Error finding location");
    }
  };

  const focusMyLocation = () => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar Overlay */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location (e.g., City Hospital)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <AmbulanceMap
          location={location}
          nearbyAmbulances={nearbyAmbulances}
          errorMsg={errorMsg}
          region={mapRegion}
        />
      </View>

      {/* Focus Location Button */}
      <TouchableOpacity style={styles.focusButton} onPress={focusMyLocation}>
        <Ionicons name="locate" size={26} color="#000" />
      </TouchableOpacity>

      {/* Confirm */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => router.push('/ambulance/destination')}
        >
          <Text style={styles.confirmButtonText}>Confirm Pick-up location</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AmbulancePickupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },

  backButton: {
    padding: 10,
  },

  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },

  searchButton: {
    backgroundColor: '#E10600',
    borderRadius: 20,
    padding: 8,
    marginRight: 2,
  },

  mapContainer: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },

  focusButton: {
    position: 'absolute',
    bottom: 100, // Above the footer
    right: 20,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 100,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },

  confirmButton: {
    padding: 18,
    backgroundColor: '#FF0000',
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  confirmButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
