import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

// IMPORTANT: Replace with your deployed backend URL
const API_URL = 'http://localhost:3000';

const Banner = ({ message, type }) => {
  if (!message) return null;

  const bannerStyle = type === 'success' ? styles.successBanner : styles.errorBanner;
  const textStyle = type === 'success' ? styles.successBannerText : styles.errorBannerText;

  return (
    <View style={[styles.banner, bannerStyle]}>
      <Text style={textStyle}>{message}</Text>
    </View>
  );
};

const DashboardScreen = () => {
  const { token, user } = useContext(AuthContext);
  const [beds, setBeds] = useState([]);
  const [ambulances, setAmbulances] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [bedBookings, setBedBookings] = useState([]);
  const [ambulanceBookings, setAmbulanceBookings] = useState([]);
  const [newBed, setNewBed] = useState('');
  const [newAmbulance, setNewAmbulance] = useState('');
  const [newHospital, setNewHospital] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [banner, setBanner] = useState({ message: '', type: '' });
  const [hasHospital, setHasHospital] = useState(false);

  const showBanner = (message, type) => {
    setBanner({ message, type });
    setTimeout(() => {
      setBanner({ message: '', type: '' });
    }, 3000);
  };

  const fetchBeds = async () => {
    try {
      const response = await fetch(`${API_URL}/beds`);
      const data = await response.json();
      setBeds(data);
    } catch (error) {
      showBanner('Could not fetch beds', 'error');
    }
  };

  const fetchAmbulances = async () => {
    try {
      const response = await fetch(`${API_URL}/ambulances`);
      const data = await response.json();
      setAmbulances(data);
    } catch (error) {
      showBanner('Could not fetch ambulances', 'error');
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await fetch(`${API_URL}/hospitals`);
      const data = await response.json();
      setHospitals(data);
      if (user) {
        const userHospital = data.find(hospital => hospital.user === user.id);
        setHasHospital(!!userHospital);
      }
    } catch (error) {
      showBanner('Could not fetch hospitals', 'error');
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`);
      const data = await response.json();
      setBookings(data);
      setBedBookings(data.filter(booking => booking.bookingType === 'bed'));
      setAmbulanceBookings(data.filter(booking => booking.bookingType === 'ambulance'));
    } catch (error) {
      showBanner('Could not fetch bookings', 'error');
    }
  };

  useEffect(() => {
    if (user) {
      fetchHospitals();
    }
    fetchBookings();
    if (selectedHospital) {
      fetchBeds();
      fetchAmbulances();
    }
  }, [selectedHospital, user]);

  const addBed = async () => {
    if (!selectedHospital) return;
    try {
      const response = await fetch(`${API_URL}/beds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ bedNumber: newBed, isAvailable: true, hospital: selectedHospital._id }),
      });
      if (response.ok) {
        setNewBed('');
        fetchBeds();
        showBanner('Bed added successfully', 'success');
      } else {
        showBanner('Could not add bed', 'error');
      }
    } catch (error) {
      showBanner('Could not add bed', 'error');
    }
  };

  const removeBed = async (id) => {
    try {
      const response = await fetch(`${API_URL}/beds/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });
      if (response.ok) {
        fetchBeds();
        showBanner('Bed removed successfully', 'success');
      } else {
        showBanner('Could not remove bed', 'error');
      }
    } catch (error) {
      showBanner('Could not remove bed', 'error');
    }
  };

  const addAmbulance = async () => {
    if (!selectedHospital) return;
    try {
      const response = await fetch(`${API_URL}/ambulances`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ ambulanceNumber: newAmbulance, isAvailable: true, hospital: selectedHospital._id }),
      });
      if (response.ok) {
        setNewAmbulance('');
        fetchAmbulances();
        showBanner('Ambulance added successfully', 'success');
      } else {
        showBanner('Could not add ambulance', 'error');
      }
    } catch (error) {
      showBanner('Could not add ambulance', 'error');
    }
  };

  const removeAmbulance = async (id) => {
    try {
      const response = await fetch(`${API_URL}/ambulances/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });
      if (response.ok) {
        fetchAmbulances();
        showBanner('Ambulance removed successfully', 'success');
      } else {
        showBanner('Could not remove ambulance', 'error');
      }
    } catch (error) {
      showBanner('Could not remove ambulance', 'error');
    }
  };

  const addHospital = async () => {
    try {
      const response = await fetch(`${API_URL}/hospitals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify({ name: newHospital }),
      });
      const data = await response.json();
      if (response.ok) {
        setNewHospital('');
        fetchHospitals();
        showBanner('Hospital added successfully', 'success');
      } else {
        showBanner(data.msg || 'Could not add hospital', 'error');
      }
    } catch (error) {
      showBanner('Could not add hospital', 'error');
    }
  };

  const removeHospital = async (id) => {
    try {
      const response = await fetch(`${API_URL}/hospitals/${id}`, {
        method: 'DELETE',
        headers: {
          'x-auth-token': token,
        },
      });
      if (response.ok) {
        fetchHospitals();
        showBanner('Hospital removed successfully', 'success');
      } else {
        showBanner('Could not remove hospital', 'error');
      }
    } catch (error) {
      showBanner('Could not remove hospital', 'error');
    }
  };

  const filteredBeds = selectedHospital ? beds.filter(bed => bed.hospital?._id === selectedHospital._id) : [];
  const filteredAmbulances = selectedHospital ? ambulances.filter(ambulance => ambulance.hospital?._id === selectedHospital._id) : [];

  return (
    <View style={styles.container}>
      <Banner message={banner.message} type={banner.type} />
      <Text style={styles.title}>Dashboard</Text>

      {selectedHospital ? (
        <View>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => setSelectedHospital(null)}>
            <Text style={styles.buttonText}>Back to Hospitals</Text>
          </TouchableOpacity>
          <Text style={styles.sectionTitle}>{selectedHospital.name}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Beds</Text>
            <FlatList
              data={filteredBeds}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.bedNumber}</Text>
                  <TouchableOpacity style={[styles.button, styles.removeButton]} onPress={() => removeBed(item._id)}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Bed Number"
                placeholderTextColor="#888"
                value={newBed}
                onChangeText={setNewBed}
              />
              <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addBed}>
                <Text style={styles.buttonText}>Add Bed</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ambulances</Text>
            <FlatList
              data={filteredAmbulances}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.ambulanceNumber}</Text>
                  <TouchableOpacity style={[styles.button, styles.removeButton]} onPress={() => removeAmbulance(item._id)}>
                    <Text style={styles.buttonText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Ambulance Number"
                placeholderTextColor="#888"
                value={newAmbulance}
                onChangeText={setNewAmbulance}
              />
              <TouchableOpacity style={[styles.button, styles.addButton]} onPress={addAmbulance}>
                <Text style={styles.buttonText}>Add Ambulance</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Confirmed Bed Bookings</Text>
            <FlatList
              data={bedBookings}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>Bed: {item.itemId.bedNumber}</Text>
                  <Text style={styles.itemText}>{item.hospital.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Confirmed Ambulance Bookings</Text>
            <FlatList
              data={ambulanceBookings}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>Ambulance: {item.itemId.ambulanceNumber}</Text>
                  <Text style={styles.itemText}>{item.hospital.name}</Text>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hospitals</Text>
            <FlatList
              data={hospitals}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text style={styles.itemText}>{item.name}</Text>
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={() => setSelectedHospital(item)}>
                      <Text style={styles.buttonText}>View</Text>
                    </TouchableOpacity>
                    {item.user === user?.id && (
                      <TouchableOpacity style={[styles.button, styles.removeButton]} onPress={() => removeHospital(item._id)}>
                        <Text style={styles.buttonText}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )}
              keyExtractor={(item) => item._id}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Hospital Name"
                placeholderTextColor="#888"
                value={newHospital}
                onChangeText={setNewHospital}
                editable={!hasHospital}
              />
              <TouchableOpacity
                style={[styles.button, styles.addButton, hasHospital && styles.disabledButton]}
                onPress={addHospital}
                disabled={hasHospital}
              >
                <Text style={styles.buttonText}>Add Hospital</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  banner: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
  successBanner: {
    backgroundColor: '#4CAF50',
  },
  errorBanner: {
    backgroundColor: '#f44336',
  },
  successBannerText: {
    color: '#fff',
    textAlign: 'center',
  },
  errorBannerText: {
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    marginBottom: 24,
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#000',
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
    color: '#000',
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 16,
  },
  addButton: {
    backgroundColor: '#000',
  },
  removeButton: {
    backgroundColor: '#e53935',
  },
  viewButton: {
    backgroundColor: '#2196F3',
    marginRight: 8,
  },
  backButton: {
    backgroundColor: '#6c757d',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
});

export default DashboardScreen;
