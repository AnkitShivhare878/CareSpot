import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { getToken } from './utils/auth-storage.js'; // Import the getToken helper

// --- Configuration ---
const API_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000';

// --- Main Component ---
const AmbulanceTrackingScreen = ({ route, navigation }) => {
  const { hospital } = route.params;

  // --- State Management ---
  const [userLocation, setUserLocation] = useState(null);
  const [bookedAmbulance, setBookedAmbulance] = useState(null);
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const mapRef = useRef(null);
  const pollingIntervalRef = useRef(null);

  // --- Effects ---

  // 1. Get user's initial location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied. Please enable it in your settings.');
        return;
      }
      try {
        let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        setUserLocation(location.coords);
      } catch (error) {
        setErrorMsg('Could not fetch your location. Please ensure GPS is enabled.');
      }
    })();
  }, []);

  // 2. Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  const startPolling = (ambulanceId) => {
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const authToken = await getToken(); // Retrieve the token
        if (!authToken) {
            Alert.alert("Authentication Error", "You are not logged in.");
            stopPollingAndReset();
            return;
        }

        const response = await fetch(`${API_URL}/ambulance/status/${ambulanceId}`, {
          headers: { 'Authorization': `Bearer ${authToken}` }
        });

        if (!response.ok) {
          if (response.status === 404) {
             Alert.alert('Ride Finished', 'The ambulance has completed the trip.');
             stopPollingAndReset();
          }
          return;
        }

        const data = await response.json();

        if (data.currentLocation?.coordinates) {
          const [longitude, latitude] = data.currentLocation.coordinates;
          setAmbulanceLocation({ latitude, longitude });

          mapRef.current?.fitToCoordinates(
            [{ latitude, longitude }, { latitude: userLocation.latitude, longitude: userLocation.longitude }],
            { edgePadding: { top: 100, right: 80, bottom: 150, left: 80 }, animated: true }
          );
        }

        if (data.status === 'completed') {
          Alert.alert('Ambulance Arrived', 'The ambulance has arrived at your location.');
          stopPollingAndReset();
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
    }, 5000);
  };

  const stopPollingAndReset = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    setBookedAmbulance(null);
    setAmbulanceLocation(null);
    navigation.goBack();
  };

  // Handle the initial booking request
  const handleBooking = async () => {
    if (!userLocation || isLoading) return;
    setIsLoading(true);

    try {
      const authToken = await getToken(); // Retrieve the token
      if (!authToken) {
          Alert.alert("Authentication Error", "Please log in to book an ambulance.");
          setIsLoading(false);
          return;
      }

      const body = {
        pickupLat: userLocation.latitude,
        pickupLon: userLocation.longitude,
        hospitalId: hospital._id,
      };

      const response = await fetch(`${API_URL}/ambulance/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Use the retrieved token
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Ambulance Booked!', `Ambulance ${data.ambulanceNumber} is on its way.`);
        setBookedAmbulance(data);
        if (data.currentLocation?.coordinates) {
            const [longitude, latitude] = data.currentLocation.coordinates;
            setAmbulanceLocation({ latitude, longitude });
        }
        startPolling(data._id); // Start polling for location updates
      } else {
        Alert.alert('Booking Failed', data.msg || 'No ambulances are available at this time.');
      }
    } catch (error) {
      console.error("Booking error:", error);
      Alert.alert('An Error Occurred', 'Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- Render methods are unchanged ---

  return (
    <View style={styles.container}>
        {/* Map and Bottom Panel rendering logic remains the same */}
    </View>
  );
};

const styles = StyleSheet.create({
    // Styles remain the same
});

export default AmbulanceTrackingScreen;
