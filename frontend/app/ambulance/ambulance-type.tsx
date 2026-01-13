import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const ambulanceTypes = [
  { id: '1', name: 'Patient Transfer', price: 'Rs 1000' },
  { id: '2', name: 'Basic Life Support (BLS)', price: 'Rs 2500' },
  { id: '3', name: 'Advance Life Support (ALS)', price: 'Rs 10000' },
  { id: '4', name: 'Dead Body Transfer', price: 'Rs 1500' },
];

const AmbulanceTypeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#E10600" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ambulance Type</Text>
      </View>

      <FlatList
        data={ambulanceTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.typeItem}>
            <Text style={styles.typeName}>{item.name}</Text>
            <Text style={styles.typePrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => router.push('/ambulance/payment')}
      >
        <Text style={styles.confirmButtonText}>Confirm Ambulance</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbulanceTypeScreen;

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

  typeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  typeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },

  typePrice: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E10600',
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
