import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type NavigationProp = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

const PaymentScreen = ({ navigation }: { navigation: NavigationProp }) => {
  const [selectedPayment, setSelectedPayment] = useState('Google Pay');

  const paymentOptions = [
    { name: 'Debit Card / Credit Card', icon: 'credit-card' },
    { name: 'Google Pay', icon: 'google' },
    { name: 'Paytm', icon: 'alpha-p-circle' },
    { name: 'Paypal', icon: 'paypal' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Appointment</Text>
      </View>

      <Text style={styles.title}>Select Payment Type</Text>

      {paymentOptions.map((option) => (
        <TouchableOpacity
          key={option.name}
          style={styles.paymentOption}
          onPress={() => setSelectedPayment(option.name)}
        >
          <MaterialCommunityIcons
            name={option.icon as any}
            size={24}
            color={selectedPayment === option.name ? '#E10600' : '#777'}
          />

          <Text style={styles.optionText}>{option.name}</Text>

          <View
            style={[
              styles.radioButton,
              selectedPayment === option.name && styles.radioButtonSelected,
            ]}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.payButton}
        onPress={() => navigation.navigate('BookingConfirm')}
      >
        <Text style={styles.payButtonText}>Pay now</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentScreen;

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

  backButton: {
    fontSize: 28,
    marginRight: 16,
    color: '#E10600',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
    margin: 16,
    color: '#000000',
  },

  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  optionText: {
    marginLeft: 16,
    color: '#000000',
    fontWeight: '500',
  },

  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E10600',
    marginLeft: 'auto',
  },

  radioButtonSelected: {
    backgroundColor: '#E10600',
  },

  payButton: {
    backgroundColor: '#FF0000',
    padding: 18,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  payButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
});
