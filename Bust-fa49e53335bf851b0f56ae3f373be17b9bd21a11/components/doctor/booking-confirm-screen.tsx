import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

type NavigationProp = {
  navigate: (screen: string) => void;
};

const BookingConfirmScreen = ({ navigation }: { navigation: NavigationProp }) => (
  <View style={styles.container}>
    <View style={styles.confirmationContainer}>
      <View style={styles.circle}>
        <Text style={styles.tick}>✓</Text>
      </View>

      <Text style={styles.title}>Booking Confirmed!</Text>

      <Text style={styles.subtitle}>
        Your Chat consultation is booked! Connect with your doctor at the scheduled time.
      </Text>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Doctor name</Text>
          <Text style={styles.value}>Dr. Neha</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>23 Dec 2024</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>Wed 02:00 PM</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Consultation Type</Text>
          <Text style={styles.value}>Chat</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Payment Method</Text>
          <Text style={styles.value}>UPI Payment</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.total}>Total</Text>
          <Text style={styles.total}>Rs 200</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('DoctorFilter')}
      >
        <Text style={styles.homeButtonText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default BookingConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  confirmationContainer: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    margin: 16,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },

  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  tick: {
    fontSize: 40,
    color: '#FF0000',
    fontWeight: '800',
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 8,
    color: '#000000',
  },

  subtitle: {
    textAlign: 'center',
    color: '#777777',
    marginBottom: 24,
  },

  detailsContainer: {
    width: '100%',
    marginBottom: 24,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  label: {
    color: '#000000',
    fontWeight: '500',
  },

  value: {
    color: '#000000',
    fontWeight: '600',
  },

  total: {
    fontWeight: '800',
    color: '#FF0000',
  },

  homeButton: {
    backgroundColor: '#FF0000',
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#FF0000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  homeButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
});
