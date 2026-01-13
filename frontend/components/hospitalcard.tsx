import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

interface HospitalCardProps {
  hospital: {
    name: string;
    location: string;
    rating: number;
    image: string;
  };
}

export default function HospitalCard({ hospital }: HospitalCardProps) {
  return (
    <View style={styles.card}>
      <Image source={hospital.image} style={styles.image} />
      <View style={styles.info}>
        <ThemedText style={styles.name}>{hospital.name}</ThemedText>
        <ThemedText style={styles.location}>{hospital.location}</ThemedText>
        <View style={styles.rating}>
          <IconSymbol name="star.fill" size={16} color="#FFD700" />
          <ThemedText>{hospital.rating}</ThemedText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  info: {
    marginTop: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    color: '#666666',
    marginVertical: 4,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
