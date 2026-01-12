import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const API_URL = 'http://localhost:3000';

const HospitalDetailsScreen = ({ route, navigation }) => {
  const { hospital } = route.params;
  const [beds, setBeds] = useState([]);
  const [ambulances, setAmbulances] = useState([]);

  const fetchHospitalDetails = async () => {
    try {
      const response = await fetch(`${API_URL}/hospitals/${hospital._id}`);
      const data = await response.json();
      setBeds(data.beds);
      setAmbulances(data.ambulances);
    } catch (error) {
      console.error('Could not fetch hospital details', error);
    }
  };

  useEffect(() => {
    fetchHospitalDetails();
  }, []);

  const bookBed = async (bedId) => {
    // Booking logic will be implemented in the next step
  };

  const bookAmbulance = async (ambulanceId) => {
    // Booking logic will be implemented in the next step
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{hospital.name}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beds</Text>
        <FlatList
          data={beds}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.bedNumber}</Text>
              {item.isAvailable ? (
                <TouchableOpacity
                  style={[styles.button, styles.bookButton]}
                  onPress={() => bookBed(item._id)}
                >
                  <Text style={styles.buttonText}>Book</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.unavailableText}>Unavailable</Text>
              )}
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ambulances</Text>
        <FlatList
          data={ambulances}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.ambulanceNumber}</Text>
              {item.isAvailable ? (
                <TouchableOpacity
                  style={[styles.button, styles.bookButton]}
                  onPress={() => bookAmbulance(item._id)}
                >
                  <Text style={styles.buttonText}>Book</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.unavailableText}>Unavailable</Text>
              )}
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
  button: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  bookButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  unavailableText: {
    fontSize: 14,
    color: '#ccc',
    fontStyle: 'italic',
  },
});

export default HospitalDetailsScreen;
