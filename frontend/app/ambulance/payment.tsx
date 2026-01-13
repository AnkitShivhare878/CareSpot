import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Platform, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, ZoomIn } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { COLORS, SHADOWS } from '../../constants/theme';

const paymentMethods = [
  { id: 'upi', name: 'UPI / Google Pay', icon: 'qrcode', color: '#5E35B1' },
  { id: 'card', name: 'Credit / Debit Card', icon: 'credit-card', color: '#1E88E5' },
  { id: 'cash', name: 'Cash on Arrival', icon: 'cash-multiple', color: '#43A047' },
];

const AmbulancePaymentScreen = () => {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handlePayment = () => {
    if (!name || !phone) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      alert('Please fill in all details');
      return;
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    router.push('/ambulance/confirmation');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
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
          <ThemedText style={styles.headerTitle}>Checkout</ThemedText>
        </Animated.View>

        {/* Booking Summary */}
        <Animated.View entering={ZoomIn.delay(200).duration(600)} style={styles.summaryCard}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryHeader}>
              <MaterialCommunityIcons name="medical-bag" size={32} color={COLORS.white} />
              <View style={styles.summaryHeaderText}>
                <ThemedText style={styles.summaryTitle}>Basic Life Support</ThemedText>
                <ThemedText style={styles.summarySubtitle}>Ambulance Service</ThemedText>
              </View>
              <ThemedText style={styles.summaryPrice}>₹2500</ThemedText>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryDetails}>
              <View style={styles.summaryRow}>
                <MaterialCommunityIcons name="map-marker-outline" size={16} color={COLORS.white} />
                <ThemedText style={styles.summaryDetailText}>Pickup: Current Location</ThemedText>
              </View>
              <View style={styles.summaryRow}>
                <MaterialCommunityIcons name="hospital-building" size={16} color={COLORS.white} />
                <ThemedText style={styles.summaryDetailText}>Dest: Apollo Hospital</ThemedText>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Customer Details */}
        <Animated.View entering={FadeInUp.delay(400).duration(600)} style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Customer Details</ThemedText>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="account-outline" size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor={COLORS.textLight}
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputContainer}>
            <MaterialCommunityIcons name="phone-outline" size={20} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              placeholderTextColor={COLORS.textLight}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </Animated.View>

        {/* Payment Methods */}
        <Animated.View entering={FadeInUp.delay(600).duration(600)} style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Payment Method</ThemedText>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              activeOpacity={0.7}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedMethod(method.id);
              }}
              style={[
                styles.methodItem,
                selectedMethod === method.id && styles.selectedMethodItem
              ]}
            >
              <View style={[styles.methodIcon, { backgroundColor: method.color + '20' }]}>
                <MaterialCommunityIcons name={method.icon as any} size={24} color={method.color} />
              </View>
              <ThemedText style={styles.methodName}>{method.name}</ThemedText>
              <View style={[
                styles.radio,
                selectedMethod === method.id && styles.radioActive
              ]}>
                {selectedMethod === method.id && <View style={styles.radioInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Pay Button */}
      <Animated.View entering={FadeInUp.delay(800).duration(600)} style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handlePayment}
          activeOpacity={0.9}
        >
          <LinearGradient
            colors={[COLORS.primary, COLORS.accent]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.confirmGradient}
          >
            <ThemedText style={styles.confirmButtonText}>Complete Booking</ThemedText>
            <MaterialCommunityIcons name="lock-outline" size={20} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

export default AmbulancePaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 24,
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
  summaryCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 32,
    ...SHADOWS.large,
  },
  summaryGradient: {
    padding: 24,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryHeaderText: {
    flex: 1,
    marginLeft: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
  },
  summarySubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  summaryPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: COLORS.white,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    verticalAlign: 'middle',
    marginVertical: 20,
  },
  summaryDetails: {
    gap: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  summaryDetailText: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 12,
    ...SHADOWS.small,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    marginLeft: 10,
    fontWeight: '600',
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    ...SHADOWS.small,
  },
  selectedMethodItem: {
    borderColor: COLORS.primary,
    borderWidth: 1,
  },
  methodIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
    marginLeft: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: COLORS.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
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
    borderRadius: 22,
    overflow: 'hidden',
    ...SHADOWS.large,
  },
  confirmGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.white,
  },
});
