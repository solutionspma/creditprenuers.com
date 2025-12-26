import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { user, logout, updateProfile } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  function handleLogout() {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: logout },
      ]
    );
  }

  function SettingRow({ icon, label, value, onPress, hasArrow, isSwitch, switchValue, onToggle }) {
    return (
      <TouchableOpacity 
        style={styles.settingRow}
        onPress={onPress}
        disabled={isSwitch}
      >
        <View style={styles.settingLeft}>
          <Text style={styles.settingIcon}>{icon}</Text>
          <Text style={styles.settingLabel}>{label}</Text>
        </View>
        <View style={styles.settingRight}>
          {value && <Text style={styles.settingValue}>{value}</Text>}
          {isSwitch && (
            <Switch
              value={switchValue}
              onValueChange={onToggle}
              trackColor={{ false: '#E5E7EB', true: '#86EFAC' }}
              thumbColor={switchValue ? '#16A34A' : '#f4f3f4'}
            />
          )}
          {hasArrow && <Text style={styles.arrow}>›</Text>}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0) || 'D'}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || 'Driver Name'}</Text>
          <Text style={styles.profileEmail}>{user?.email || 'driver@coyslogistics.com'}</Text>
          <View style={styles.driverIdBadge}>
            <Text style={styles.driverIdText}>ID: DRV-2024-001</Text>
          </View>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SettingRow
          icon="👤"
          label="Edit Profile"
          hasArrow
          onPress={() => Alert.alert('Coming Soon', 'Profile editing will be available soon')}
        />
        <SettingRow
          icon="🔒"
          label="Change Password"
          hasArrow
          onPress={() => Alert.alert('Coming Soon', 'Password change will be available soon')}
        />
        <SettingRow
          icon="📱"
          label="Phone Number"
          value="+1 (555) 123-4567"
          hasArrow
        />
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        <SettingRow
          icon="🔔"
          label="Push Notifications"
          isSwitch
          switchValue={notifications}
          onToggle={setNotifications}
        />
        <SettingRow
          icon="📍"
          label="Location Tracking"
          isSwitch
          switchValue={locationTracking}
          onToggle={setLocationTracking}
        />
        <SettingRow
          icon="🔄"
          label="Auto Updates"
          isSwitch
          switchValue={autoUpdates}
          onToggle={setAutoUpdates}
        />
        <SettingRow
          icon="🌙"
          label="Dark Mode"
          isSwitch
          switchValue={darkMode}
          onToggle={setDarkMode}
        />
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <SettingRow
          icon="📏"
          label="Distance Unit"
          value="Miles"
          hasArrow
        />
        <SettingRow
          icon="🗣️"
          label="Language"
          value="English"
          hasArrow
        />
        <SettingRow
          icon="🗺️"
          label="Default Map"
          value="Google Maps"
          hasArrow
        />
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <SettingRow
          icon="❓"
          label="Help Center"
          hasArrow
          onPress={() => Alert.alert('Help', 'Contact dispatch at support@coyslogistics.com')}
        />
        <SettingRow
          icon="📞"
          label="Contact Support"
          value="24/7"
          hasArrow
        />
        <SettingRow
          icon="📄"
          label="Terms of Service"
          hasArrow
        />
        <SettingRow
          icon="🔐"
          label="Privacy Policy"
          hasArrow
        />
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <SettingRow
          icon="ℹ️"
          label="App Version"
          value="1.0.0"
        />
        <SettingRow
          icon="🏢"
          label="Company"
          value="Coys Logistics"
        />
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Coys FieldOps v1.0.0</Text>
        <Text style={styles.footerSubtext}>Powered by ModCRM</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#16A34A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileInfo: {
    marginLeft: 15,
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  driverIdBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  driverIdText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  settingLabel: {
    fontSize: 16,
    color: '#1f2937',
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 8,
  },
  arrow: {
    fontSize: 20,
    color: '#999',
  },
  logoutBtn: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 18,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
  },
  footer: {
    alignItems: 'center',
    padding: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});
