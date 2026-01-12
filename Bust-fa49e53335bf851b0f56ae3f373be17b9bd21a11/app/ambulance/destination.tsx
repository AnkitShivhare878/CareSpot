import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const hospitals = [
  { id: '1', name: 'Apollo Hospital' },
  { id: '2', name: 'Fortis Hospital' },
  { id: '3', name: 'Narayana Health City' },
  { id: '4', name: 'Columbia Asia Hospital' },
];

const AmbulanceDestinationScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#E10600" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Destination</Text>
      </View>

      <View style={styles.searchContainer}>
        {/* Search input for destination */}
      </View>

      <Text style={styles.nearbyTitle}>Nearby Hospitals</Text>

      <FlatList
        data={hospitals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.hospitalItem}>
            <Text style={styles.hospitalText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => router.push('/ambulance/ambulance-type')}
      >
        <Text style={styles.confirmButtonText}>Confirm Destination</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbulanceDestinationScreen;

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

  searchContainer: {
    padding: 16,
  },

  nearbyTitle: {
    fontSize: 18,
    fontWeight: '800',
    paddingHorizontal: 16,
    marginBottom: 8,
    color: '#000000',
  },

  hospitalItem: {
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  hospitalText: {
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
