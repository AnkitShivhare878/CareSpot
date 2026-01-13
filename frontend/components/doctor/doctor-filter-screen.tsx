import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type NavigationProp = {
  navigate: (screen: string) => void;
  goBack: () => void;
};

const DoctorFilterScreen = ({ navigation }: { navigation: NavigationProp }) => {
  const initialFilter = 'Earliest available any location';
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const filters = [
    { name: 'Earliest available any location', icon: 'calendar-clock' },
    { name: 'Nearest first', icon: 'map-marker' },
    { name: 'Most experienced', icon: 'trophy' },
    { name: 'Doctor fees - high to low', icon: 'sort-ascending' },
    { name: 'Doctor fees - low to high', icon: 'sort-descending' },
    { name: 'Specialization', icon: 'star' },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctor</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor="#999" />
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Protect Yourself Against Covid-19</Text>
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Filter</Text>

        <ScrollView>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.name}
              style={styles.filterOption}
              onPress={() => setSelectedFilter(filter.name)}
            >
              <MaterialCommunityIcons
                name={filter.icon as any}
                size={22}
                color={selectedFilter === filter.name ? '#E10600' : '#777'}
              />

              <Text style={styles.filterText}>{filter.name}</Text>

              <View
                style={[
                  styles.radioButton,
                  selectedFilter === filter.name && styles.radioButtonSelected,
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.clearButton} onPress={() => setSelectedFilter(initialFilter)}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.applyButton} onPress={() => navigation.navigate('DoctorInfo')}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DoctorFilterScreen;

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

  searchContainer: {
    padding: 16,
  },

  searchInput: {
    backgroundColor: '#F3F3F3',
    padding: 14,
    borderRadius: 10,
    color: '#000',
  },

  banner: {
    backgroundColor: '#111111',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },

  bannerText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  filterContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  filterTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
    color: '#000000',
  },

  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  filterText: {
    marginLeft: 16,
    color: '#000000',
    fontWeight: '500',
  },

  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E10600',
    marginLeft: 'auto',
  },

  radioButtonSelected: {
    backgroundColor: '#E10600',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  clearButton: {
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    width: '45%',
    alignItems: 'center',
  },

  clearText: {
    color: '#000000',
    fontWeight: '600',
  },

  applyButton: {
    backgroundColor: '#FF0000',
    padding: 16,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#FF0000',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },

  applyButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
