import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getUnreadNotificationCount } from '../utils/notifications';

const Header = ({ title, showNotification = true, router: propRouter }) => {
  const router = propRouter || useRouter();
  const unreadCount = getUnreadNotificationCount();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {showNotification && (
        <TouchableOpacity
          style={styles.notificationIcon}
          onPress={() => router.push('/screens/NotificationScreen')}
        >
          <Ionicons name="notifications-outline" size={26} color="white" />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  notificationIcon: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

export default Header; 