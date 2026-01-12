import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const AmbulancePaymentScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#E10600" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment</Text>
      </View>

      {/* Ambulance details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Ambulance Details</Text>
        {/* Add ambulance details here */}
      </View>

      {/* Customer details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Add Customer Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Customer name"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Mobile number"
          placeholderTextColor="#999"
        />
      </View>

      {/* Payment type */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>Select Payment Type</Text>
        {/* Add payment options here */}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => router.push('/ambulance/confirmation')}
      >
        <Text style={styles.confirmButtonText}>Pay now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbulancePaymentScreen;

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

  detailsContainer: {
    padding: 16,
  },

  detailsTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    color: '#000000',
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    color: '#000000',
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
