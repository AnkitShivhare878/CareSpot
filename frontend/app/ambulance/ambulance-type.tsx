import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, SlideInRight } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { COLORS, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const ambulanceTypes = [
  {
    id: '1',
    name: 'Patient Transfer',
    price: '1000',
    icon: 'ambulance',
    description: 'Standard transfer for stable patients',
    features: ['Basic Stretcher', 'Oxygen Cylinders']
  },
  {
    id: '2',
    name: 'Basic Life Support',
    price: '2500',
    icon: 'medical-bag',
    description: 'Equipped for non-emergency medical needs',
    features: ['AED', 'Oxygen', 'Paramedic Support']
  },
  {
    id: '3',
    name: 'Advance Life Support',
    price: '10000',
    icon: 'heart-pulse',
    description: 'Intensive care unit on wheels',
    features: ['Ventilator', 'Defibrillator', 'Specialist Doctor']
  },
  {
    id: '4',
    name: 'Dead Body Transfer',
    price: '1500',
    icon: 'coffin',
    description: 'Dignified transfer for the deceased',
    features: ['Freezing Box', 'Dignified Service']
  },
];

const AmbulanceTypeScreen = () => {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>('2'); // Default to BLS

  const handleSelectType = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedType(id);
  };

  const handleConfirm = () => {
    if (!selectedType) return;
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/ambulance/payment');
  };

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
        <ThemedText style={styles.headerTitle}>Choose Ambulance</ThemedText>
      </Animated.View>

      <View style={styles.content}>
        <ThemedText style={styles.sectionTitle}>Available Services</ThemedText>

        <FlatList
          data={ambulanceTypes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Animated.View entering={SlideInRight.delay(index * 100).duration(600)}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleSelectType(item.id)}
                style={[
                  styles.typeItem,
                  selectedType === item.id && styles.selectedTypeItem
                ]}
              >
                <View style={styles.typeHeader}>
                  <View style={[
                    styles.iconBox,
                    selectedType === item.id && styles.selectedIconBox
                  ]}>
                    <MaterialCommunityIcons
                      name={item.icon as any}
                      size={28}
                      color={selectedType === item.id ? COLORS.white : COLORS.primary}
                    />
                  </View>
                  <View style={styles.titleBox}>
                    <ThemedText style={[
                      styles.typeName,
                      selectedType === item.id && styles.whiteText
                    ]}>{item.name}</ThemedText>
                    <ThemedText style={[
                      styles.typePrice,
                      selectedType === item.id && styles.whiteTextBold
                    ]}>₹{item.price}</ThemedText>
                  </View>
                </View>

                <ThemedText style={[
                  styles.description,
                  selectedType === item.id && styles.whiteTextLight
                ]}>{item.description}</ThemedText>

                <View style={styles.featuresRow}>
                  {item.features.map((feature, fIdx) => (
                    <View key={fIdx} style={[
                      styles.featurePoint,
                      selectedType === item.id && styles.selectedFeaturePoint
                    ]}>
                      <MaterialCommunityIcons
                        name="check-circle"
                        size={14}
                        color={selectedType === item.id ? COLORS.white : COLORS.primary}
                      />
                      <ThemedText style={[
                        styles.featureText,
                        selectedType === item.id && styles.whiteTextLight
                      ]}>{feature}</ThemedText>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        />
      </View>

      {/* Footer / Confirm Panel */}
      <Animated.View entering={FadeInUp.duration(600).delay(400)} style={styles.footer}>
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
            <ThemedText style={styles.confirmButtonText}>Book This Ambulance</ThemedText>
            <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default AmbulanceTypeScreen;

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
  content: {
    flex: 1,
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
    paddingBottom: 120,
  },
  typeItem: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    ...SHADOWS.medium,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedTypeItem: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIconBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  titleBox: {
    flex: 1,
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typeName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
  },
  typePrice: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.primary,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
    marginBottom: 16,
  },
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  featurePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  selectedFeaturePoint: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  featureText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },
  whiteText: {
    color: COLORS.white,
  },
  whiteTextBold: {
    color: COLORS.white,
    fontWeight: '900'
  },
  whiteTextLight: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    backgroundColor: 'transparent',
  },
  confirmButton: {
    borderRadius: 22,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  confirmGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
  },
});
