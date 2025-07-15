import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FloatingTabBar from '../components/FloatingTabBar';

const activities = [
  {
    id: 'piscine',
    title: 'Piscine',
    description: "Nage libre et cours d'aquagym.",
    image: require('../../assets/images/piscine.jpg'),
  },
  {
    id: 'tennis',
    title: 'Tennis',
    description: 'Cours collectifs et réservation de courts.',
    image: require('../../assets/images/tennis.jpg'),
  },
  {
    id: 'lancer',
    title: 'Lancer du poids',
    description: 'Ateliers de technique et entraînements.',
    image: require('../../assets/images/lancer.jpeg'),
  },
  {
    id: 'basketball',
    title: 'Basketball',
    description: 'Matchs amicaux et entraînements.',
    image: require('../../assets/images/basketball.jpg'),
  },
  {
    id: 'football',
    title: 'Football',
    description: "Tournois et sessions d'entraînement.",
    image: require('../../assets/images/football.jpg'),
  },
  {
    id: 'workout',
    title: 'Workout Salle',
    description: 'Accès à la salle de sport et cours guidés.',
    image: require('../../assets/images/workout.jpg'),
  },
];

export default function Home() {
  const router = useRouter();
  const userFirstName = 'Rajaa';

  const handleCardPress = (id) => {
    router.push(`/activity/${id}`);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background_app.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(34, 39, 34, 0.14)', 'rgba(147, 148, 150, 0.63)']}
          style={styles.gradient}
        >
         
          <View style={styles.header}>
            <Text style={styles.userName}>{userFirstName}</Text>
            <View style={styles.notificationIcon}>
              <Ionicons name="notifications-outline" size={26} color="white" />
              <View style={styles.badge} />
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent}>
            {/* Statistiques */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>Réservations en attente</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>Réservations validées</Text>
              </View>
            </View>

            {/* Cartes Activités */}
            {activities.map((activity) => (
              <View style={styles.shadowWrapper} key={activity.id}>
                <TouchableOpacity
                  onPress={() => handleCardPress(activity.id)}
                  activeOpacity={0.85}
                >
                  <ImageBackground
                    source={activity.image}
                    style={styles.card}
                    imageStyle={{ borderRadius: 16 }}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.6)']}
                      style={styles.cardContent}
                    >
                      <Text style={styles.cardTitle}>{activity.title}</Text>
                      <Text style={styles.cardDescription}>{activity.description}</Text>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Barre de navigation flottante */}
          <FloatingTabBar />
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'space-between' },
  header: {
    marginTop: 60,
    marginBottom: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
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
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    borderRadius: 10,
    padding: 10,
    flex: 0.48,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999',
  },
  statNumber: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  shadowWrapper: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 10,
  },
  card: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 16,
  },
  cardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  cardDescription: {
    color: '#D1D5DB',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'left',
  },
});
