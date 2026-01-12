import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const MapViewPlaceholder = () => (
  <View style={styles.mapPlaceholder}>
    <Text style={styles.mapText}>Map View</Text>
  </View>
);

const AmbulancePickupScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#E10600" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pick-up Location</Text>
      </View>

      {/* Map */}
      <MapViewPlaceholder />

      {/* Confirm */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => router.push('/ambulance/destination')}
      >
        <Text style={styles.confirmButtonText}>Confirm Pick-up location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbulancePickupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 16,
    color: '#000000',
  },

  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
  },

  mapText: {
    color: '#000000',
    fontWeight: '600',
  },

  confirmButton: {
    margin: 16,
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
