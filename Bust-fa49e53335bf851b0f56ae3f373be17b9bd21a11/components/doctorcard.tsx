import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface DoctorCardProps {
  doctor: {
    name: string;
    specialization: string;
    rating: number;
    image: string;
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <View style={styles.card}>
      <Image source={doctor.image} style={styles.image} />
      <View style={styles.info}>
        <ThemedText style={styles.name}>{doctor.name}</ThemedText>
        <ThemedText style={styles.specialization}>{doctor.specialization}</ThemedText>
        <View style={styles.rating}>
          <IconSymbol name="star.fill" size={16} color="#FFD700" />
          <ThemedText>{doctor.rating}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  specialization: {
    color: '#666666',
    marginVertical: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
