import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, useAnimatedStyle, useSharedValue, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { ThemedText } from '@/components/themed-text';
import { COLORS, SHADOWS } from '../../constants/theme';
import AmbulanceMap from '../../components/AmbulanceMap';

const { width } = Dimensions.get('window');

const AmbulanceTrackingScreen = () => {
    const router = useRouter();
    const [eta, setEta] = useState(10);
    const pulse = useSharedValue(1);

    useEffect(() => {
        pulse.value = withRepeat(
            withSequence(
                withTiming(1.2, { duration: 1000 }),
                withTiming(1, { duration: 1000 })
            ),
            -1,
            true
        );

        const timer = setInterval(() => {
            setEta((prev) => (prev > 1 ? prev - 1 : 1));
        }, 60000); // Reduce ETA every minute

        return () => clearInterval(timer);
    }, []);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulse.value }],
        opacity: 1.2 - pulse.value,
    }));

    return (
        <View style={styles.container}>
            {/* Map View */}
            <View style={styles.mapWrapper}>
                <AmbulanceMap
                    location={{ coords: { latitude: 12.9716, longitude: 77.5946 } } as any}
                    nearbyAmbulances={[{ id: 1, latitude: 12.9750, longitude: 77.5980 }]}
                    region={{
                        latitude: 12.9733,
                        longitude: 77.5963,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                />

                {/* Header Overlay */}
                <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.back()}
                        style={styles.backButton}
                    >
                        <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.text} />
                    </TouchableOpacity>
                    <View style={styles.statusBadge}>
                        <View style={styles.statusDot} />
                        <ThemedText style={styles.statusText}>On the way</ThemedText>
                    </View>
                </Animated.View>
            </View>

            {/* Driver Info & ETA Card */}
            <Animated.View entering={FadeInUp.duration(600)} style={styles.footer}>
                <View style={styles.etaContainer}>
                    <View>
                        <ThemedText style={styles.etaLabel}>Estimated Arrival</ThemedText>
                        <ThemedText style={styles.etaTime}>{eta} mins</ThemedText>
                    </View>
                    <View style={styles.pulseContainer}>
                        <Animated.View style={[styles.pulseCircle, pulseStyle]} />
                        <View style={styles.mainCircle}>
                            <MaterialCommunityIcons name="ambulance" size={24} color={COLORS.white} />
                        </View>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.driverSection}>
                    <View style={styles.driverInfo}>
                        <View style={styles.avatar}>
                            <MaterialCommunityIcons name="account" size={30} color={COLORS.textLight} />
                        </View>
                        <View>
                            <ThemedText style={styles.driverName}>Rajesh Kumar</ThemedText>
                            <View style={styles.ratingRow}>
                                <MaterialCommunityIcons name="star" size={14} color="#FFD700" />
                                <ThemedText style={styles.ratingText}>4.9 (120+ trips)</ThemedText>
                            </View>
                        </View>
                    </View>
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                        >
                            <MaterialCommunityIcons name="phone" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionBtn}
                            onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                        >
                            <MaterialCommunityIcons name="message-text" size={24} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity
                    style={styles.emergencyBtn}
                    onPress={() => {
                        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
                        alert('Calling Emergency Services...');
                    }}
                >
                    <LinearGradient
                        colors={['#FF5252', '#D32F2F']}
                        style={styles.emergencyGradient}
                    >
                        <ThemedText style={styles.emergencyText}>Emergency Call</ThemedText>
                    </LinearGradient>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default AmbulanceTrackingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    mapWrapper: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 40,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.medium,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        gap: 8,
        ...SHADOWS.medium,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.success,
    },
    statusText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 24,
        paddingBottom: Platform.OS === 'ios' ? 44 : 24,
        ...SHADOWS.large,
    },
    etaContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    etaLabel: {
        fontSize: 14,
        color: COLORS.textLight,
        fontWeight: '600',
        marginBottom: 4,
    },
    etaTime: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.primary,
    },
    pulseContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulseCircle: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.primary,
    },
    mainCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: COLORS.surface,
        marginBottom: 20,
    },
    driverSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    driverInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    driverName: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    ratingText: {
        fontSize: 12,
        color: COLORS.textLight,
        fontWeight: '500',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },
    actionBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.surface,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emergencyBtn: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    emergencyGradient: {
        paddingVertical: 14,
        alignItems: 'center',
    },
    emergencyText: {
        color: COLORS.white,
        fontWeight: '800',
        fontSize: 16,
    },
});
