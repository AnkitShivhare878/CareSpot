import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Keyboard, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import AmbulanceMap from '../../components/AmbulanceMap';
import { ThemedText } from '@/components/themed-text';
import { COLORS, SHADOWS } from '../../constants/theme';
import Animated, { FadeInDown, FadeInUp, SlideInDown, withSpring, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const handleConfirm = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/ambulance/destination');
  };

  return (
    <View style={styles.container}>
      {/* Search Bar Overlay */}
      <Animated.View entering={FadeInDown.duration(800)} style={styles.searchContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search pickup location..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <MaterialCommunityIcons name="magnify" size={22} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </Animated.View>

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
      <TouchableOpacity
        style={styles.focusButton}
        onPress={focusMyLocation}
        activeOpacity={0.8}
      >
        <MaterialCommunityIcons name="crosshairs-gps" size={24} color={COLORS.primary} />
      </TouchableOpacity>

      {/* Footer / Confirm Panel */}
      <Animated.View entering={SlideInDown.duration(600).springify()} style={styles.footer}>
        <View style={styles.locationInfo}>
          <View style={styles.locationDot} />
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.locationLabel}>Pickup Location</ThemedText>
            <ThemedText style={styles.locationAddress} numberOfLines={1}>
              {searchQuery || (location ? "Current Location" : "Locating...")}
            </ThemedText>
          </View>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmGradient}
          >
            <ThemedText style={styles.confirmButtonText}>Confirm Pickup Location</ThemedText>
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AmbulancePickupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  searchContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 50,
    left: 16,
    right: 16,
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingLeft: 20,
    paddingRight: 4,
    height: 48,
    ...SHADOWS.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
  },
  focusButton: {
    position: 'absolute',
    bottom: 180,
    right: 20,
    backgroundColor: COLORS.white,
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
    zIndex: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    ...SHADOWS.large,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  locationDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.primary,
    borderWidth: 3,
    borderColor: '#FFCDD2',
  },
  locationLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  locationAddress: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: '700',
  },
  confirmButton: {
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  confirmGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
});
