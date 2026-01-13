import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AmbulanceTabScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ambulance</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/ambulance/pickup')}
      >
        <Text style={styles.buttonText}>Book an Ambulance</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AmbulanceTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 24,
    color: '#000000',
  },

  button: {
    paddingVertical: 18,
    paddingHorizontal: 28,
    backgroundColor: '#FF0000',
    borderRadius: 16,
    shadowColor: '#FF0000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});
