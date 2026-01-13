import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function BookingConfirm() {
  const { bedType, date, time, method } =
    useLocalSearchParams<{
      bedType: string;
      date: string;
      time: string;
      method: string;
    }>();

  return (
    <View style={styles.container}>
      {/* Success Icon */}
      <View style={styles.circle}>
        <Ionicons name="checkmark" size={36} color="#fff" />
      </View>

      <Text style={styles.title}>Booking Confirmed!</Text>
      <Text style={styles.sub}>
        Your Bed is booked! Connect with your doctor at the scheduled time.
      </Text>

      {/* Summary */}
      <View style={styles.summary}>
        <Row label="Date" value={date} />
        <Row label="Time" value={time} />
        <Row label="Bed Type" value={bedType} />
        <Row label="Payment Method" value={method} />
        <Row label="Total" value="Rs 200" bold />
      </View>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => router.replace('/(tabs)')}
      >
        <Text style={styles.homeText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, bold && { fontWeight: '600' }]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop: 100,
    paddingHorizontal: 16,
  },

  circle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
  },

  sub: {
    fontSize: 13,
    color: '#777777',
    textAlign: 'center',
    marginVertical: 12,
  },

  summary: {
    width: '100%',
    marginTop: 20,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  rowLabel: {
    color: '#000000',
    fontWeight: '500',
  },

  rowValue: {
    color: '#000000',
    fontWeight: '600',
  },

  homeBtn: {
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    width: '100%',
    marginTop: 30,
    shadowColor: '#FF0000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },

  homeText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
