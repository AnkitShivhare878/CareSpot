import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

type NavigationProp = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

const DoctorInfoScreen = ({ navigation }: { navigation: NavigationProp }) => {
  const [selectedDate, setSelectedDate] = useState('23');
  const [selectedTime, setSelectedTime] = useState('02:00 PM');

  const dates = ['21', '22', '23', '24', '25', '26', '27'];
  const times = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM',
    '04:00 PM', '07:00 PM', '08:00 PM',
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment</Text>
      </View>

      {/* Doctor Card */}
      <View style={styles.doctorCard}>
        <Image
          source={{ uri: 'https://www.woodlandshospital.in/images/doctor-img/Sushovan-Chowdhury.jpg' }}
          style={styles.doctorImage}
        />
        <View>
          <Text style={styles.doctorName}>Dr. Neha Viswanathan</Text>
          <Text style={styles.doctorSpecialty}>Cardiovascular Technologist</Text>
          <Text style={styles.doctorRating}>★★★★☆ (4.6)</Text>
        </View>
      </View>

      {/* About */}
      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>
          Dr. Neha Viswanathan is a highly skilled cardiovascular technologist...
          <Text style={styles.readMore}> Read more</Text>
        </Text>
      </View>

      {/* Date */}
      <View style={styles.dateSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Select date</Text>
          <TouchableOpacity>
            <Text style={styles.changeButton}>Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((date) => (
            <TouchableOpacity
              key={date}
              style={[styles.date, selectedDate === date && styles.selectedDate]}
              onPress={() => setSelectedDate(date)}
            >
              <Text style={[styles.dateText, selectedDate === date && styles.selectedDateText]}>
                {date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Time */}
      <View style={styles.timeSection}>
        <Text style={styles.sectionTitle}>Select Time</Text>
        <View style={styles.timeContainer}>
          {times.map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.time, selectedTime === time && styles.selectedTime]}
              onPress={() => setSelectedTime(time)}
            >
              <Text style={[styles.timeText, selectedTime === time && styles.selectedTimeText]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Book */}
      <TouchableOpacity style={styles.bookButton} onPress={() => navigation.navigate('Payment')}>
        <Text style={styles.bookButtonText}>Book Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DoctorInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },

  backButton: {
    fontSize: 28,
    marginRight: 16,
    color: '#E10600',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
  },

  doctorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    margin: 16,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },

  doctorName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000000',
  },

  doctorSpecialty: {
    color: '#777777',
  },

  doctorRating: {
    color: '#E10600',
    marginTop: 4,
  },

  aboutSection: {
    padding: 16,
  },

  aboutText: {
    color: '#444444',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 8,
    color: '#000000',
  },

  readMore: {
    color: '#E10600',
    fontWeight: '600',
  },

  dateSection: {
    padding: 16,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  changeButton: {
    color: '#E10600',
    fontWeight: '600',
  },

  date: {
    backgroundColor: '#F2F2F2',
    padding: 16,
    borderRadius: 12,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 60,
  },

  selectedDate: {
    backgroundColor: '#FF0000',
  },

  dateText: {
    color: '#000000',
    fontWeight: '600',
  },

  selectedDateText: {
    color: '#FFFFFF',
  },

  timeSection: {
    padding: 16,
  },

  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  time: {
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 12,
    width: '32%',
    alignItems: 'center',
    marginBottom: 10,
  },

  selectedTime: {
    backgroundColor: '#FF0000',
  },

  timeText: {
    color: '#000000',
    fontWeight: '600',
  },

  selectedTimeText: {
    color: '#FFFFFF',
  },

  bookButton: {
    backgroundColor: '#FF0000',
    padding: 18,
    margin: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },

  bookButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 18,
  },
});
