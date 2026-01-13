import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { api } from '../config/api.config';

// Hospital images
const hospitalImages = [
  require('@/assets/images/h3.png'),
  require('@/assets/images/h4.png'),
  require('@/assets/images/h5.png'),
];

interface HospitalDetails {
  hospital: {
    _id: string;
    name: string;
    bio?: string;
    rating?: number;
  };
  beds: Array<{
    _id: string;
    bedNumber: string;
    isAvailable: boolean;
  }>;
  ambulances: Array<{
    _id: string;
    ambulanceNumber: string;
    isAvailable: boolean;
  }>;
}

export default function HospitalEnquiry() {
  const { hospitalId, name } = useLocalSearchParams<{
    hospitalId: string;
    name: string;
  }>();

  const [loading, setLoading] = useState(true);
  const [hospitalDetails, setHospitalDetails] = useState<HospitalDetails | null>(null);
  const enquiryNumber = '+919646715446';

  // Fetch hospital details from API
  useEffect(() => {
    const fetchDetails = async () => {
      if (!hospitalId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await api.getHospitalDetails(hospitalId);
        setHospitalDetails(data);
      } catch (err) {
        console.error('Failed to fetch hospital details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [hospitalId]);

  // Calculate bed stats
  const totalBeds = hospitalDetails?.beds?.length || 0;
  const availableBeds = hospitalDetails?.beds?.filter(b => b.isAvailable).length || 0;
  const bookedBeds = totalBeds - availableBeds;

  const handleCall = async () => {
    const url = `tel:${enquiryNumber}`;
    const supported = await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert('Error', 'Calling is not supported on this device');
      return;
    }

    await Linking.openURL(url);
  };

  const hospitalName = hospitalDetails?.hospital?.name || name || 'Hospital';
  const hospitalBio = hospitalDetails?.hospital?.bio || 'Location not available';
  const hospitalRating = hospitalDetails?.hospital?.rating?.toString() || '4.5';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="chevron-back" size={24} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Hospital Enquiry</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#FF0000" style={{ marginVertical: 60 }} />
      ) : (
        <>
          {/* Hospital Card */}
          <View style={styles.card}>
            <Image
              source={hospitalImages[0]}
              style={styles.cardImage}
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{hospitalName}</Text>
              <Text style={styles.cardSub}>{hospitalBio}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={14} color="#FFC107" />
                <Text style={styles.ratingText}>{hospitalRating}</Text>
              </View>
            </View>
          </View>

          {/* About */}
          <Text style={styles.sectionTitle}>About Hospital</Text>
          <Text style={styles.desc}>
            Advanced technology, skilled doctors, personalized care, and 24/7
            emergency services.
          </Text>

          {/* Specialities */}
          <Text style={styles.sectionTitle}>Our Specialities</Text>
          {['Cardiology', 'Orthopedics', 'Neurology', 'Pediatrics'].map((s) => (
            <Text key={s} style={styles.bullet}>• {s}</Text>
          ))}

          {/* Beds - Real Time Data from API */}
          <Text style={styles.sectionTitle}>Bed Real Time Tracking</Text>
          <View style={styles.beds}>
            <View style={styles.bedStat}>
              <Ionicons name="bed" size={20} color="#E53935" />
              <Text style={styles.bedStatText}>
                <Text style={{ color: '#E53935', fontWeight: '700' }}>{bookedBeds}</Text> Booked
              </Text>
            </View>
            <View style={styles.bedStat}>
              <Ionicons name="bed-outline" size={20} color="#43A047" />
              <Text style={styles.bedStatText}>
                <Text style={{ color: '#43A047', fontWeight: '700' }}>{availableBeds}</Text> Available
              </Text>
            </View>
          </View>

          {/* Ambulances Available */}
          {hospitalDetails?.ambulances && hospitalDetails.ambulances.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Ambulances Available</Text>
              <View style={styles.ambulanceInfo}>
                <Ionicons name="car" size={20} color="#FF0000" />
                <Text style={styles.ambulanceText}>
                  {hospitalDetails.ambulances.filter(a => a.isAvailable).length} ambulances ready
                </Text>
              </View>
            </>
          )}

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.primary}
              onPress={() => router.push({
                pathname: '/hospitals/bed-booking',
                params: { hospitalId, name: hospitalName }
              })}
            >
              <Text style={styles.primaryText}>Book a bed</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.outline} onPress={handleCall}>
              <Text style={styles.outlineText}>Enquiry a call</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  cardImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  cardSub: {
    fontSize: 12,
    color: '#777',
    marginVertical: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#000',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 20,
    color: '#000',
  },

  desc: {
    fontSize: 13,
    color: '#555',
    lineHeight: 20,
  },

  bullet: {
    fontSize: 13,
    color: '#000',
    marginLeft: 8,
    marginBottom: 6,
    fontWeight: '500',
  },

  beds: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    backgroundColor: '#FFF5F5',
    borderRadius: 12,
    padding: 16,
  },

  bedStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  bedStatText: {
    fontSize: 14,
    color: '#333',
  },

  ambulanceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 10,
    marginTop: 8,
  },

  ambulanceText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },

  actions: {
    flexDirection: 'row',
    marginTop: 28,
  },

  primary: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginRight: 8,
    shadowColor: '#FF0000',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  outline: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#FF0000',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  outlineText: {
    color: '#FF0000',
    fontWeight: '700',
  },
});
