
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import BookingConfirmScreen from '../../components/doctor/booking-confirm-screen';
import DoctorFilterScreen from '../../components/doctor/doctor-filter-screen';
import DoctorInfoScreen from '../../components/doctor/doctor-info';
import PaymentScreen from '../../components/doctor/payment-screen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const BookingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="DoctorFilter" component={DoctorFilterScreen} />
    <Stack.Screen name="DoctorInfo" component={DoctorInfoScreen} />
    <Stack.Screen name="Payment" component={PaymentScreen} />
    <Stack.Screen name="BookingConfirm" component={BookingConfirmScreen} />
  </Stack.Navigator>
);

const ProfileScreen = () => null; // Placeholder for profile screen

export default BookingStack;