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

// 👉 importe ta barre flottante
import FloatingTabBar from '../components/FloatingTabBar';

export default function HistoryScreen() {
  const router = useRouter();

  const [filter, setFilter] = useState('all');

  const historyData = [
    { id: 1, activity: 'Piscine', date: '2025-07-10', status: 'validé' },
    { id: 2, activity: 'Tennis', date: '2025-07-12', status: 'en attente' },
    { id: 3, activity: 'Salle Workout', date: '2025-07-14', status: 'validé' },
  ];

  const filteredData =
    filter === 'all' ? historyData : historyData.filter(item => item.status === filter);

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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Historique des Réservations</Text>

          <View style={styles.filterContainer}>
            {['all', 'validé', 'en attente'].map(item => (
              <TouchableOpacity
                key={item}
                onPress={() => setFilter(item)}
                style={[
                  styles.filterButton,
                  filter === item && styles.activeFilterButton,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === item && styles.activeFilterText,
                  ]}
                >
                  {item === 'all'
                    ? 'Tous'
                    : item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {filteredData.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.activity}>{item.activity}</Text>
                <Text style={styles.date}>{item.date}</Text>
                <Text
                  style={[
                    styles.status,
                    item.status === 'validé' ? styles.valid : styles.pending,
                  ]}
                >
                  {item.status === 'validé' ? 'Validé' : 'En attente'}
                </Text>
              </View>
            ))}
          </ScrollView>
        </LinearGradient>

        {/* 👉 BARRE FLOTTANTE */}
        <FloatingTabBar />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  gradient: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  backButton: { position: 'absolute', top: 50, left: 20 },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginVertical: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 4,
    paddingHorizontal: 32,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  activeFilterButton: { backgroundColor: '#1FA739' },
  filterText: { color: 'white' },
  activeFilterText: { fontWeight: 'bold' },
  content: { paddingBottom: 150 },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  activity: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  date: { color: '#ccc', fontSize: 14, marginTop: 4 },
  status: { fontSize: 14, marginTop: 6 },
  valid: { color: '#1FA739' },
  pending: { color: '#facc15' },
});
