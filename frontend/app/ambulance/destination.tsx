import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, TextInput, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInRight, FadeOut } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { COLORS, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const hospitals = [
  { id: '1', name: 'Apollo Hospital', address: 'Bannerghatta Road, Bangalore', distance: '1.2 km', rating: 4.8 },
  { id: '2', name: 'Fortis Hospital', address: 'Cunningham Road, Bangalore', distance: '2.5 km', rating: 4.6 },
  { id: '3', name: 'Narayana Health City', address: 'Hosur Road, Bangalore', distance: '4.8 km', rating: 4.7 },
  { id: '4', name: 'Columbia Asia Hospital', address: 'Hebbal, Bangalore', distance: '5.2 km', rating: 4.5 },
  { id: '5', name: 'Manipal Hospital', address: 'HAL Old Airport Road, Bangalore', distance: '3.1 km', rating: 4.9 },
];

const AmbulanceDestinationScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState<string | null>(null);

  const handleSelectHospital = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedHospital(id);
  };

  const handleConfirm = () => {
    if (!selectedHospital) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/ambulance/ambulance-type');
  };

  const filteredHospitals = hospitals.filter(h =>
    h.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.back();
          }}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.text} />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Select Destination</ThemedText>
      </Animated.View>

      {/* Search Section */}
      <Animated.View entering={FadeInDown.delay(200).duration(600)} style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={22} color={COLORS.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hospitals or locations..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      <ThemedText style={styles.sectionTitle}>Nearby Hospitals</ThemedText>

      <FlatList
        data={filteredHospitals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInRight.delay(index * 100 + 300).duration(600)}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleSelectHospital(item.id)}
              style={[
                styles.hospitalItem,
                selectedHospital === item.id && styles.selectedHospitalItem
              ]}
            >
              <View style={styles.hospitalIconContainer}>
                <MaterialCommunityIcons
                  name="hospital-building"
                  size={24}
                  color={selectedHospital === item.id ? COLORS.white : COLORS.primary}
                />
              </View>
              <View style={styles.hospitalInfo}>
                <ThemedText style={[
                  styles.hospitalName,
                  selectedHospital === item.id && styles.selectedText
                ]}>{item.name}</ThemedText>
                <ThemedText style={[
                  styles.hospitalAddress,
                  selectedHospital === item.id && styles.selectedTextLight
                ]}>{item.address}</ThemedText>
                <View style={styles.tagContainer}>
                  <View style={styles.tag}>
                    <MaterialCommunityIcons name="map-marker-distance" size={14} color={COLORS.textLight} />
                    <ThemedText style={styles.tagText}>{item.distance}</ThemedText>
                  </View>
                  <View style={styles.tag}>
                    <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                    <ThemedText style={styles.tagText}>{item.rating}</ThemedText>
                  </View>
                </View>
              </View>
              <View style={styles.selectionIndicator}>
                <View style={[
                  styles.radio,
                  selectedHospital === item.id && styles.radioActive
                ]}>
                  {selectedHospital === item.id && <View style={styles.radioInner} />}
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}
      />

      {/* Confirm Button */}
      {selectedHospital && (
        <Animated.View
          entering={FadeInDown.duration(400)}
          style={styles.footer}
        >
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirm}
            activeOpacity={0.9}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.accent]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmGradient}
            >
              <ThemedText style={styles.confirmButtonText}>Confirm Destination</ThemedText>
              <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default AmbulanceDestinationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginLeft: 16,
    color: COLORS.text,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    ...SHADOWS.medium,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    marginLeft: 10,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    paddingHorizontal: 24,
    marginBottom: 16,
    color: COLORS.text,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  hospitalItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedHospitalItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
    ...SHADOWS.medium,
  },
  hospitalIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hospitalInfo: {
    flex: 1,
    marginLeft: 16,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 4,
  },
  hospitalAddress: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 8,
  },
  selectedText: {
    color: COLORS.white,
  },
  selectedTextLight: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textLight,
  },
  selectionIndicator: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: COLORS.white,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: COLORS.background,
  },
  confirmButton: {
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  confirmGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.white,
  },
});

