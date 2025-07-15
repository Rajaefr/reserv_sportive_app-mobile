import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { height } = Dimensions.get('window');

const activityDetails = {
  piscine: {
    title: 'Piscine',
    image: require('../../assets/images/piscine.jpg'),
    description:
      "Profitez de notre piscine chauffée pour vos séances de natation et d’aquagym. Réservation obligatoire avec créneau limité à 1h30 par utilisateur. Bonnet de bain et douche avant accès requis.",
    rules: [
      'Réservation obligatoire (1h30 maximum par session)',
      'Port du bonnet de bain obligatoire',
      'Douche avant l\'entrée dans la piscine',
      'Nombre de places limité par créneau',
    ],
    canReserve: true,
  },
  tennis: {
    title: 'Tennis',
    image: require('../../assets/images/tennis.jpg'),
    description:
      "Réservez votre court de tennis et profitez d'un moment sportif en plein air ou en salle selon la disponibilité. Prêt de raquettes possible sur demande.",
    rules: [
      'Réservation obligatoire',
      'Respect des horaires',
      'Prévenir en cas d\'annulation',
    ],
    canReserve: true,
  },
  basketball: {
    title: 'Basketball',
    image: require('../../assets/images/basketball.jpg'),
    description: "Matchs amicaux et entraînements ouverts aux membres inscrits.",
    rules: [
      'Réservation recommandée',
      'Respect du matériel',
      'Tenue sportive obligatoire',
    ],
    canReserve: false,
  },
  football: {
    title: 'Football',
    image: require('../../assets/images/football.jpg'),
    description: "Participez aux sessions de minifoot ou tournois du week-end.",
    rules: [
      'Réservation nécessaire pour les matchs organisés',
      'Respect des équipes et des horaires',
    ],
    canReserve: false,
  },
  workout: {
    title: 'Workout Salle',
    image: require('../../assets/images/workout.jpg'),
    description: "Accès libre à la salle de musculation et aux équipements de fitness.",
    rules: [
      'Port d’une serviette obligatoire',
      'Nettoyage du matériel après utilisation',
      'Respect du silence pendant les séances',
    ],
    canReserve: true,
  },
  lancer: {
    title: 'Lancer du poids',
    image: require('../../assets/images/lancer.jpeg'),
    description: "Séances techniques de lancer pour tous niveaux, sur terrain dédié.",
    rules: [
      'Surveillance obligatoire pendant l’activité',
      'Respect des consignes de sécurité',
    ],
    canReserve: false,
  },
};


export default function ActivityDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const activityId = Array.isArray(id) ? id[0] : id;
  const activity = activityDetails[activityId as keyof typeof activityDetails];

  if (!activity) {
    return (
      <View style={styles.center}>
        <Text style={styles.notFound}>Activité non trouvée.</Text>
      </View>
    );
  }

  const handleReservation = () => {
  if (activityId === 'piscine') {
    
    router.push('/reservation/piscine');
  } else if (activityId === 'workout') {
    router.push('/reservation/workout');
  } else {
    alert(`La réservation n'est pas disponible pour ${activity.title}.`);
  }
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
          {/* Wrapper pour l'image avec borderRadius */}
          <View style={styles.imageHeaderContainer}>
            <ImageBackground
              source={activity.image}
              style={styles.imageHeader}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(255,255,255,0.3)', 'rgba(17, 24, 39, 0.76)']}
                style={styles.imageOverlay}
              >
                <TouchableOpacity onPress={router.back} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={26} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>{activity.title}</Text>
              </LinearGradient>
            </ImageBackground>
          </View>

          {/* Contenu scrollable */}
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.description}>{activity.description}</Text>

            <Text style={styles.sectionTitle}>Règles à respecter :</Text>
            {activity.rules.map((rule, index) => (
              <Text key={index} style={styles.rule}>
                • {rule}
              </Text>
            ))}

            {activity.canReserve && (
              <TouchableOpacity style={styles.button} onPress={handleReservation}>
                <Text style={styles.buttonText}>Réserver maintenant</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },

  background: {
    flex: 1,
  },

  gradient: {
    flex: 1,
  },

  // Conteneur qui gère le borderRadius + overflow pour l'image
  imageHeaderContainer: {
    borderRadius: 22,
    overflow: 'hidden',
  
  },

  imageHeader: {
    height: height / 3.2,
    width: '100%',
    justifyContent: 'flex-end',
  },

  imageOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
  },

  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 28,
  },

  description: {
    color: '#d1d5db',
    fontSize: 17,
    marginBottom: 22,
    marginTop: 30,
    lineHeight: 24,
  },

  sectionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  rule: {
    color: '#d1d5db',
    fontSize: 17,
    marginBottom: 6,
  },

  button: {
    backgroundColor: '#1FA739',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 20,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  notFound: {
    color: 'white',
    fontSize: 18,
  },
});
