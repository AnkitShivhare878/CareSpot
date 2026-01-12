import { Tabs } from 'expo-router';
import React from 'react';
// 1. Import the icon library directly for better medical options
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { HapticTab } from '@/components/haptic-tab';
// We don't strictly need IconSymbol anymore if we use MaterialCommunityIcons directly
// import { IconSymbol } from '@/components/ui/icon-symbol'; 

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowRadius: 10,
          height: 60, // Added slightly more height for better touch area
          paddingBottom: 8, // Adjust padding for visual balance
        },
        tabBarActiveTintColor: '#FF0000', // Red for active
        tabBarInactiveTintColor: '#000000', // Black for inactive
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            // Changed to MaterialCommunityIcons 'home-variant'
            <MaterialCommunityIcons size={28} name="home-variant" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="doctor"
        options={{
          title: 'Doctor',
          tabBarIcon: ({ color }) => (
            // Changed to 'stethoscope' (or use 'doctor')
            <MaterialCommunityIcons size={28} name="stethoscope" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ambulance"
        options={{
          title: 'Ambulance',
          tabBarIcon: ({ color }) => (
            // Changed to actual 'ambulance' icon
            <MaterialCommunityIcons size={28} name="ambulance" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="hospitals"
        options={{
          title: 'Hospitals',
          tabBarIcon: ({ color }) => (
            // Changed to 'hospital-building'
            <MaterialCommunityIcons size={28} name="hospital-building" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            // Changed to 'account'
            <MaterialCommunityIcons size={28} name="account" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}