import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

export default function Payment() {
  const { bedType, date, time } = useLocalSearchParams<{
    bedType: string;
    date: string;
    time: string;
  }>();

  const [method, setMethod] = useState('Google Pay');

  const payments = [
    { label: 'Debit / Credit Card', icon: 'card-outline' },
    { label: 'Google Pay', icon: 'logo-google' },
    { label: 'Paytm', icon: 'wallet-outline' },
    { label: 'Paypal', icon: 'logo-paypal' },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Bed booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <Text style={styles.sectionTitle}>Select Payment Type</Text>

      {payments.map((p) => (
        <TouchableOpacity
          key={p.label}
          style={styles.paymentRow}
          onPress={() => setMethod(p.label)}
        >
          <Ionicons name={p.icon as any} size={20} />
          <Text style={styles.paymentText}>{p.label}</Text>
          <View
            style={[
              styles.radio,
              method === p.label && styles.radioActive,
            ]}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => router.push('/hospitals/booking-confirm')}>
        <Text style={styles.payText}>Pay now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000',
  },

  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },

  paymentText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },

  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FF0000',
  },

  radioActive: {
    backgroundColor: '#FF0000',
    borderColor: '#FF0000',
  },

  payBtn: {
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#FF0000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  payText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
});
