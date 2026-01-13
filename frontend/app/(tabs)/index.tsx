import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import DoctorCard from '../../components/doctorcard';
import HospitalCard from '../../components/hospitalcard';
import { api } from '../config/api.config';

// Define theme colors
const THEME = {
  background: 'white',
  cardBackground: '#FFF5F5',
  primary: '#FF0000',
  textPrimary: '#000000',
  textSecondary: '#AAAAAA',
  borderColor: '#E5E5E5',
};

// Fallback dummy doctors (since Doctor API not in backend yet)
const fallbackDoctors = [
  {
    name: 'Dr. Srivathsavi Mallik',
    specialization: 'Orthopedic surgeon',
    rating: 4.7,
    image: require('@/assets/images/doctor1.png'),
  },
  {
    name: 'Dr. Michael Thompson',
    specialization: 'Neurosurgeon',
    rating: 4.8,
    image: require('@/assets/images/doctor2.jpeg'),
  },
  {
    name: 'Dr. Sarah Jenkin',
    specialization: 'Cardiologist',
    rating: 4.9,
    image: require('@/assets/images/doctor1.png'),
  },
  {
    name: 'Dr. James Wilson',
    specialization: 'General Surgeon',
    rating: 4.5,
    image: require('@/assets/images/doctor2.jpeg'),
  },
];

// Hospital images for mapping
const hospitalImages = [
  require('@/assets/images/h3.png'),
  require('@/assets/images/h4.png'),
  require('@/assets/images/h5.png'),
];

interface Hospital {
  _id: string;
  name: string;
  bio?: string;
  rating?: number;
  photo?: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch hospitals from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const data = await api.getHospitals();
        setHospitals(data);
        setError(null);
      } catch (err: any) {
        console.error('Failed to fetch hospitals:', err);
        setError('Failed to load hospitals');
        // Use fallback data if API fails
        setHospitals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Map hospital data for display
  const displayHospitals = hospitals.length > 0
    ? hospitals.map((h, index) => ({
      _id: h._id,
      name: h.name,
      location: h.bio || 'Location not available',
      rating: h.rating || 4.5,
      image: hospitalImages[index % hospitalImages.length],
    }))
    : [
      // Fallback if no hospitals from API
      { _id: '1', name: 'Patel Orthopaedic', location: 'Seattle, WA', rating: 4.6, image: hospitalImages[0] },
      { _id: '2', name: 'ARC Max Hospital', location: 'Springfield, IL', rating: 4.9, image: hospitalImages[1] },
      { _id: '3', name: 'City Care Clinic', location: 'Austin, TX', rating: 4.5, image: hospitalImages[2] },
    ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.headerText}>HealthHive</ThemedText>
      </ThemedView>

      <View style={styles.banner}>
        <Image
          source={require('@/assets/images/hospital2.png')}
          style={styles.bannerImage}
          contentFit="cover"
        />
        <View style={styles.bannerOverlay}>
          <ThemedText style={styles.bannerText}>Emergency? We are here.</ThemedText>
        </View>
      </View>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>What do you need?</ThemedText>
        <View style={styles.grid}>
          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/ambulance')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="ambulance" size={32} color={THEME.primary} />
            </View>
            <ThemedText style={styles.gridText}>Ambulance</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/doctor')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="doctor" size={32} color={THEME.primary} />
            </View>
            <ThemedText style={styles.gridText}>Doctor</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/hospitals')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="hospital-building" size={32} color={THEME.primary} />
            </View>
            <ThemedText style={styles.gridText}>Hospitals</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.gridItem} onPress={() => router.push('/chat')}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="message-text" size={32} color={THEME.primary} />
            </View>
            <ThemedText style={styles.gridText}>Health Chat</ThemedText>
          </TouchableOpacity>
        </View>
      </View>

      {/* Top Doctors Section */}
      <View style={styles.section}>
        <View style={styles.bigCard}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: THEME.textPrimary }]}>
              Top Doctors
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/doctors')}>
              <ThemedText style={styles.seeAllText}>See all</ThemedText>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {fallbackDoctors.map((doctor, index) => (
              <View key={index} style={styles.cardWrapper}>
                <DoctorCard doctor={doctor} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Top Hospital Section - Now with Real Data */}
      <View style={styles.section}>
        <View style={styles.bigCard}>
          <View style={styles.sectionHeader}>
            <ThemedText type="subtitle" style={[styles.sectionTitle, { color: THEME.textPrimary }]}>
              Top Hospital
            </ThemedText>
            <TouchableOpacity onPress={() => router.push('/hospitals')}>
              <ThemedText style={styles.seeAllText}>See all</ThemedText>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color={THEME.primary} style={{ marginVertical: 20 }} />
          ) : error ? (
            <ThemedText style={{ color: THEME.textSecondary, textAlign: 'center', marginVertical: 20 }}>
              {error}
            </ThemedText>
          ) : (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScrollContent}
            >
              {displayHospitals.map((hospital, index) => (
                <View key={hospital._id || index} style={styles.cardWrapper}>
                  <HospitalCard hospital={hospital} />
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>

      {/* Call Button */}
      <TouchableOpacity
        style={styles.ambulanceButton}
        onPress={() => router.push('/ambulance/pickup')}
      >
        <MaterialCommunityIcons name="phone" size={24} color="white" style={{ marginRight: 8 }} />
        <ThemedText style={styles.ambulanceButtonText}>Call Ambulance</ThemedText>
      </TouchableOpacity>

      <View style={styles.footer}>
        <ThemedText type="subtitle" style={styles.footerTitle}>Take care of your body</ThemedText>
        <ThemedText style={styles.footerText}>Your health, our priority - always here for you.</ThemedText>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.background,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 16,
    alignItems: 'center',
    backgroundColor: THEME.background,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: THEME.primary,
  },
  banner: {
    marginHorizontal: 16,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#333',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
  },
  bannerText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: THEME.textPrimary,
    fontSize: 18,
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  seeAllText: {
    color: THEME.primary,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  gridItem: {
    alignItems: 'center',
    width: 70,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: THEME.cardBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  gridText: {
    color: THEME.textPrimary,
    fontSize: 11,
    textAlign: 'center',
  },
  horizontalScrollContent: {
    paddingRight: 16,
    gap: 12,
  },
  cardWrapper: {},
  ambulanceButton: {
    backgroundColor: THEME.primary,
    flexDirection: 'row',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 32,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  ambulanceButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  footer: {
    margin: 16,
    marginTop: 32,
    marginBottom: 50,
    padding: 20,
    backgroundColor: THEME.cardBackground,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: THEME.primary,
  },
  footerTitle: {
    color: THEME.textPrimary,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  footerText: {
    color: THEME.textSecondary,
    fontSize: 13,
  },
  bigCard: {
    backgroundColor: THEME.cardBackground,
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: THEME.borderColor,
  },
});
