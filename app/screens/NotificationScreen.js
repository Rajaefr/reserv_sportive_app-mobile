
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import FloatingTabBar from '../components/FloatingTabBar';

export default function NotificatinScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const notificationData = [
    { id: 1, activity: 'Piscine', date: '2025-07-10', status: 'validé', duration: 'Il y a 2 jours' },
    { id: 2, activity: 'Tennis', date: '2025-07-12', status: 'en attente', duration: 'Il y a 10 heures' },
    { id: 3, activity: 'Salle Workout', date: '2025-07-14', status: 'refusé', duration: 'Il y a 3 heures' },
  ];

  const filteredData = filter === 'all' ? notificationData : notificationData.filter(item => item.status === filter);

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
              <View style={styles.badge} />
            </View>
          </View>
         

          <View style={styles.filterContainer}>
            {['all', 'validé', 'en attente', 'refusé'].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setFilter(item)}
                style={[styles.filterButton, filter === item && styles.activeFilterButton]}
              >
                <Text style={[styles.filterText, filter === item && styles.activeFilterText]}>
                  {item === 'all' ? 'Tous' : item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {filteredData.map(item => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardRow}>
                  <View>
                    <Text style={styles.activity}>{item.activity}</Text>
                    <Text style={styles.date}>{item.date} • {item.duration}</Text>
                  </View>
                  <View>{statusIcon(item.status)}</View>
                </View>
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
  gradient: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
 // header: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
 header: {
  marginTop: 25,
  marginBottom: 40,
  paddingHorizontal: 10,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},

notificationIcon: { position: 'relative' },
badge: {
  position: 'absolute',
  top: -4,
  right: -4,
  width: 10,
  height: 10,
  backgroundColor: 'red',
  borderRadius: 5,
},
 title: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  filterContainer: { flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 },
  filterButton: { paddingVertical: 4, paddingHorizontal: 16, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, margin: 4 },
  activeFilterButton: { backgroundColor: '#1FA739' },
  filterText: { color: 'white' },
  activeFilterText: { fontWeight: 'bold' },
  content: { paddingBottom: 140 },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: 16, borderRadius: 12, marginBottom: 10 , borderWidth: 2,
    borderColor: '#999', },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  activity: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  date: { color: '#ccc', fontSize: 13, marginTop: 4 },
});
