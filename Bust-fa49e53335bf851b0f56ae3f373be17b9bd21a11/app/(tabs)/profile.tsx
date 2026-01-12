import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router'; // ✅ added
import { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  const [logoutVisible, setLogoutVisible] = useState(false);

  const confirmLogout = () => {
    setLogoutVisible(false);
    console.log('User logged out');
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Profile</Text>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/300' }}
              style={styles.avatar}
            />
          </View>

          <Text style={styles.name}>Safarniyas Reddy</Text>
          <Text style={styles.subText}>32 Years | Bangalore</Text>

          {/* ✅ navigation added */}
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/profile/edit-profile')}
          >
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu */}
        <View style={styles.menu}>
          {/* ✅ navigation added */}
          <MenuItem
            icon="time-outline"
            label="Booking History"
            onPress={() => router.push('/profile/booking-history')}
          />

          <MenuItem icon="card-outline" label="Manage Payment methods" />
          <MenuItem icon="person-add-outline" label="Invite friends" />
          <MenuItem icon="help-circle-outline" label="Help / Support" />
          <MenuItem icon="settings-outline" label="Settings" />

          <MenuItem
            icon="log-out-outline"
            label="Logout"
            danger
            onPress={() => setLogoutVisible(true)}
          />
        </View>
      </ScrollView>

      {/* Logout Modal — unchanged */}
      <Modal
        transparent
        animationType="fade"
        visible={logoutVisible}
        onRequestClose={() => setLogoutVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.logoutIcon}>
              <Ionicons name="log-out-outline" size={22} color="#00A8A8" />
            </View>

            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalSub}>
              Are you sure you want to logout?
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.logoutBtn}
                onPress={confirmLogout}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setLogoutVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

/* Menu Item — unchanged */
function MenuItem({
  icon,
  label,
  danger = false,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  danger?: boolean;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={22}
        color={danger ? '#E53935' : '#444'}
      />
      <Text style={[styles.menuText, danger && { color: '#E53935' }]}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}

/* Styles — UNCHANGED */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
  },

  header: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 16,
    color: '#000',
  },

  profileCard: {
    alignItems: 'center',
    paddingVertical: 20,
  },

  avatarWrapper: {
    borderWidth: 3,
    borderColor: '#FF0000',
    borderRadius: 60,
    padding: 4,
    marginBottom: 10,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },

  name: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },

  subText: {
    fontSize: 13,
    color: '#777',
    marginVertical: 4,
  },

  editBtn: {
    marginTop: 12,
    backgroundColor: '#FF0000',
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderRadius: 12,
    shadowColor: '#FF0000',
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 5,
  },

  editBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },

  menu: {
    marginTop: 20,
  },

  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#FFF',
  },

  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: '#000',
    fontWeight: '600',
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalCard: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },

  logoutIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 6,
    color: '#000',
  },

  modalSub: {
    fontSize: 13,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },

  modalActions: {
    width: '100%',
  },

  logoutBtn: {
    borderWidth: 2,
    borderColor: '#FF0000',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 12,
  },

  logoutText: {
    color: '#FF0000',
    fontWeight: '700',
  },

  cancelBtn: {
    backgroundColor: '#FF0000',
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: 'center',
  },

  cancelText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
