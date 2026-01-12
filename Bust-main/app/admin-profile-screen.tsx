import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

const API_URL = 'http://localhost:3000';

const AdminProfileScreen = ({ navigation }) => {
  const [hospital, setHospital] = useState(null);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [bio, setBio] = useState('');
  const [rating, setRating] = useState('');

  const fetchHospital = async () => {
    try {
      const response = await fetch(`${API_URL}/hospitals/me`); // Assumes an endpoint to get the admin's hospital
      const data = await response.json();
      setHospital(data);
      setName(data.name);
      setPhoto(data.photo);
      setBio(data.bio);
      setRating(data.rating.toString());
    } catch (error) {
      console.error('Could not fetch hospital', error);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${API_URL}/hospitals/${hospital._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Include auth token if required
        },
        body: JSON.stringify({ name, photo, bio, rating }),
      });

      if (response.ok) {
        Alert.alert('Profile Updated', 'Your hospital profile has been successfully updated.');
        navigation.goBack();
      } else {
        Alert.alert('Update Failed', 'Could not update your profile. Please try again.');
      }
    } catch (error) {
      console.error('Could not update hospital', error);
    }
  };

  if (!hospital) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Image source={{ uri: photo }} style={styles.photo} />

      <TextInput
        style={styles.input}
        placeholder="Hospital Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Photo URL"
        value={photo}
        onChangeText={setPhoto}
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AdminProfileScreen;
