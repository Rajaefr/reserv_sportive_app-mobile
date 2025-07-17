import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';
import FloatingTabBar from '../components/FloatingTabBar';

export default function NotificationScreen() {
  const router = useRouter();

  const notifications = [
    { id: 1, activity: 'Piscine', date: '2025-07-10', status: 'validé', duration: 'Il y a 2 jours', isRead: false },
    { id: 2, activity: 'Tennis', date: '2025-07-12', status: 'en attente', duration: 'Il y a 10 heures', isRead: false },
    { id: 3, activity: 'Salle Workout', date: '2025-07-14', status: 'refusé', duration: 'Il y a 3 heures', isRead: true },
    { id: 4, activity: 'Piscine', date: '2025-07-10', status: 'validé', duration: 'Il y a 2 jours', isRead: true },
    { id: 5, activity: 'Basketball', date: '2025-07-12', status: 'validé', duration: 'Il y a 9 heures', isRead: false },
  ];

  // Regrouper par date
  const groupedNotifications = notifications.reduce((acc, notif) => {
    if (!acc[notif.date]) acc[notif.date] = [];
    acc[notif.date].push(notif);
    return acc;
  }, {});

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const statusIcon = (status) => {
    if (status === 'validé') return <Ionicons name="checkmark-circle" size={22} color="#32CD32" />;
    if (status === 'en attente') return <Ionicons name="time" size={22} color="#FACC15" />;
    if (status === 'refusé') return <Ionicons name="close-circle" size={22} color="#DC2626" />;
    return null;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ImageBackground
        source={require('../../assets/images/background_app.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']}
          style={styles.gradient}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.notificationIcon}>
              <Ionicons name="notifications-outline" size={26} color="white" />
              {unreadCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{unreadCount}</Text></View>}
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {Object.entries(groupedNotifications).map(([date, items]) => (
              <View key={date}>
                <Text style={styles.dateGroup}>{date}</Text>
                {items.map(item => (
                  <View key={item.id} style={styles.card}>
                    <View style={styles.cardRow}>
                      <View>
                        <Text style={styles.activity}>{item.activity}</Text>
                        <Text style={styles.date}>{item.duration}</Text>
                      </View>
                      <View>{statusIcon(item.status)}</View>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        </LinearGradient>
        <FloatingTabBar />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  gradient: { flex: 1, paddingTop: 80, paddingHorizontal: 20 },
  header: {
    marginBottom: 40,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationIcon: {
    position: 'relative',
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
  title: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  content: { paddingBottom: 140 },
  dateGroup: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ccc',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#999',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activity: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  date: {
    color: '#ccc',
    fontSize: 13,
    marginTop: 4,
  },
});
