import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function BookingHistory() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="chevron-back"
          size={24}
          color="#000"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Booking history</Text>
      </View>

      {/* Ambulance */}
      <Text style={styles.section}>Ambulance Booking</Text>
      <HistoryCard name="Manjunath M" price="₹1400" rating="4.6" />
      <HistoryCard name="Prasad Kumar" price="₹500" rating="4.7" />

      {/* Doctor */}
      <Text style={styles.section}>Doctor History</Text>
      <HistoryCard name="Dr. Jameson Abdu" price="₹550" rating="4.6" />
      <HistoryCard name="Dr. Abdul Patel" price="₹550" rating="4.6" />
    </ScrollView>
  );
}

function HistoryCard({
  name,
  price,
  rating,
}: {
  name: string;
  price: string;
  rating: string;
}) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: 'https://via.placeholder.com/60' }}
        style={styles.img}
      />

      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{name}</Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={14} color="#FFC107" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.rebookBtn}>
        <Text style={styles.rebookText}>{price}</Text>
      </TouchableOpacity>
    </View>
  );
}

/* Styles — MATCH PROFILE THEME */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 32,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    marginLeft: 12,
    color: '#000',
  },

  section: {
    fontSize: 16,
    fontWeight: '800',
    marginTop: 24,
    marginBottom: 12,
    color: '#000',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  img: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },

  cardContent: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
    color: '#000',
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  ratingText: {
    fontSize: 13,
    color: '#777',
    marginLeft: 4,
  },

  rebookBtn: {
    backgroundColor: '#FFEEEE',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },

  rebookText: {
    color: '#FF0000',
    fontWeight: '800',
    fontSize: 14,
  },
});
