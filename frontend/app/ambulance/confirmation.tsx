import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, ZoomIn, FadeInUp } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { COLORS, SHADOWS } from '../../constants/theme';

const { width } = Dimensions.get('window');

const AmbulanceConfirmationScreen = () => {
  const router = useRouter();

  const handleTrackNow = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/ambulance/tracking');
  };

  const handleBackHome = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[COLORS.white, COLORS.surface]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <Animated.View entering={ZoomIn.duration(800)} style={styles.successIconContainer}>
            <LinearGradient
              colors={['#4CAF50', '#2E7D32']}
              style={styles.iconGradient}
            >
              <MaterialCommunityIcons name="check-bold" size={60} color={COLORS.white} />
            </LinearGradient>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.textContainer}>
            <ThemedText style={styles.title}>Booking Confirmed!</ThemedText>
            <ThemedText style={styles.subtitle}>
              Your ambulance is being dispatched and will reach your location shortly.
            </ThemedText>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(500).duration(600)} style={styles.card}>
            <View style={styles.cardRow}>
              <ThemedText style={styles.cardLabel}>Booking ID</ThemedText>
              <ThemedText style={styles.cardValue}>#AMB-99210</ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={styles.cardLabel}>Service Type</ThemedText>
              <ThemedText style={styles.cardValue}>Basic Life Support</ThemedText>
            </View>
            <View style={styles.cardRow}>
              <ThemedText style={styles.cardLabel}>Price Paid</ThemedText>
              <ThemedText style={styles.cardValue}>₹2500</ThemedText>
            </View>
            <View style={styles.cardDivider} />
            <View style={styles.infoBox}>
              <MaterialCommunityIcons name="clock-outline" size={20} color={COLORS.primary} />
              <ThemedText style={styles.infoText}>Estimated Arrival: 8 - 12 mins</ThemedText>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(700).duration(600)} style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.trackButton}
              onPress={handleTrackNow}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.accent]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <MaterialCommunityIcons name="map-marker-radius" size={24} color={COLORS.white} />
                <ThemedText style={styles.trackButtonText}>Track Ambulance</ThemedText>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              onPress={handleBackHome}
              activeOpacity={0.7}
            >
              <ThemedText style={styles.homeButtonText}>Return to Home</ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default AmbulanceConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  successIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.white,
    ...SHADOWS.large,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    padding: 10,
  },
  iconGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: COLORS.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  card: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    ...SHADOWS.medium,
    marginBottom: 40,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  cardLabel: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 14,
    color: COLORS.text,
    fontWeight: '700',
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.surface,
    marginVertical: 16,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  trackButton: {
    borderRadius: 20,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  trackButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
  },
  homeButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textLight,
  },
});
