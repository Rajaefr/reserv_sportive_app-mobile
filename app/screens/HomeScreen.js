"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { Dimensions, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FloatingTabBar from "../components/FloatingTabBar"
import Header from "../components/Header"

const { width } = Dimensions.get("window")

// Activités limitées uniquement à piscine et salle de sport
const activities = [
  {
    id: "piscine",
    title: "Piscine Chauffée",
    description: "Nage libre et cours d'aquagym dans un environnement moderne",
    image: require("../../assets/images/piscine.jpg"),
    icon: "water",
    color: "#1b5b94",
    gradient: ["#1b5b94", "#0EA5E9"],
  },
  {
    id: "workout",
    title: "Salle de Sport",
    description: "Équipements modernes et cours guidés par des professionnels",
    image: require("../../assets/images/workout.jpg"),
    icon: "barbell",
    color: "#157d29",
    gradient: ["#157d29", "#22C55E"],
  },
]

const stats = [
  {
    id: 1,
    
    label: " 3 Réservations\nen attente",
    icon: "time",
    color: "#f5780b",
    gradient: ["#f5780b", "#FDE68A"],
    bgGradient: ["rgba(245, 159, 11, 0.48)", "rgba(217, 119, 6, 0.59)"],
  },
  {
    id: 2,
    
    label: "5 Réservations\nvalidées",
    icon: "checkmark-circle",
    color: "#1FA739",
    gradient: ["#D1FAE5", "#A7F3D0"],
    bgGradient: ["rgba(31, 167, 56, 0.4)", "rgba(34, 197, 94, 0.6)"],
  },
]

export default function Home() {
  const router = useRouter()

  const handleCardPress = (id) => {
    router.push(`/activity/${id}`)
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
        <Header title="Accueil" />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={true}>
          {/* Section de bienvenue améliorée */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Bienvenue</Text>
            <Text style={styles.welcomeSubtitle}>Réservez vos activités sportives en quelques clics</Text>
            <View style={styles.welcomeDecoration} />
          </View>

          {/* Statistiques redesignées */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={stat.id} style={[styles.statCard, { marginLeft: index > 0 ? 12 : 0 }]}>
                <LinearGradient colors={stat.bgGradient} style={styles.statGradient}>
                  <View style={[styles.statIconContainer, { backgroundColor: stat.color + "20" }]}>
                    <Ionicons name={stat.icon} size={28} color={stat.color} />
                  </View>
                  
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </LinearGradient>
              </View>
            ))}
          </View>

          {/* Section Activités avec meilleur espacement */}
          <View style={styles.activitiesSection}>
            <Text style={styles.sectionTitle}>Nos Activités</Text>
            <Text style={styles.sectionSubtitle}>Choisissez votre activité préférée</Text>
            <View style={styles.sectionDecoration} />
          </View>

          {/* Cartes Activités réorganisées correctement */}
          <View style={styles.activitiesContainer}>
            {activities.map((activity, index) => (
              <View key={activity.id} style={styles.cardWrapper}>
                <TouchableOpacity
                  onPress={() => handleCardPress(activity.id)}
                  activeOpacity={0.85}
                  style={styles.cardTouchable}
                >
                  <ImageBackground source={activity.image} style={styles.card} imageStyle={styles.cardImage}>
                    <LinearGradient
                      colors={["rgba(54, 53, 53, 0.05)", "rgba(43, 49, 49, 0.27)", "rgba(44, 50, 44, 0.69)"]}
                      style={styles.cardOverlay}
                    >
                      <View style={styles.cardIconContainer}>
                        <LinearGradient colors={activity.gradient} style={styles.cardIconGradient}>
                          <Ionicons name={activity.icon} size={28} color="white" />
                        </LinearGradient>
                      </View>

                      <View style={styles.cardContent}>
                        <Text style={styles.cardTitle}>{activity.title}</Text>
                        <Text style={styles.cardDescription}>{activity.description}</Text>

                        <View style={styles.cardAction}>
                          <Text style={styles.cardActionText}>Réserver</Text>
                          <Ionicons name="arrow-forward" size={18} color="white" />
                        </View>
                      </View>
                    </LinearGradient>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Section informative redesignée */}
          <View style={styles.infoSection}>
            <LinearGradient colors={["rgba(31, 167, 57, 0.15)", "rgba(34, 197, 94, 0.08)"]} style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="information-circle" size={28} color="#1FA739" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Information Importante</Text>
                <Text style={styles.infoText}>
                  Les réservations sont soumises à validation administrative. Vous recevrez une notification une fois
                  votre demande traitée.
                </Text>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>

        {/* Barre de navigation flottante */}
        <FloatingTabBar />
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
   
  },

  // Section de bienvenue améliorée
  welcomeSection: {
    marginBottom: 40,
    alignItems: "center",
    paddingVertical: 17,
  },
  welcomeTitle: {
    color: "white",
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 12,
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "System", // Poppins-like system font
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 26,
    textAlign: "center",
    paddingHorizontal: 20,
    fontFamily: "System",
  },
  welcomeDecoration: {
    width: 60,
    height: 4,
    backgroundColor: "#1FA739",
    borderRadius: 2,
    marginTop:  12,
  },

  // Statistiques redesignées
  statsContainer: {
    flexDirection: "row",
    marginBottom: 50,
    paddingHorizontal: 2,
  },
  statCard: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  statGradient: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 24,
    padding: 14,
    alignItems: "center",
    margin:4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    minHeight: 120,
    justifyContent: "center",
  },
  statIconContainer: {
    marginBottom: 8,
    padding: 10,
    borderRadius: 16,
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },
 
  statLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
    fontFamily: "System",
  },

  // Section activités
  activitiesSection: {
    marginBottom: 32,
    alignItems: "center",
  },
  sectionTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: "center",
    fontFamily: "System",
  },
  sectionSubtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    fontFamily: "System",
  },
  sectionDecoration: {
    width: 40,
    height: 3,
    backgroundColor: "#1FA739",
    borderRadius: 2,
    marginTop: 12,
  },

  // Cartes activités sans chevauchement
  activitiesContainer: {
    
    marginBottom: 22,
   
  },
  cardWrapper: {
    marginBottom: 20,
    borderRadius: 24,
    
  },
  cardTouchable: {
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  card: {
    height: 260,
    width: "100%",
    
  },

  cardImage: {
    borderRadius: 26,
  },
  cardOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  cardIconContainer: {
    alignSelf: "flex-start",
  },
  cardIconGradient: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  cardContent: {
    flex: 1,
    justifyContent: "flex-end",
  },
  cardTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  cardDescription: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 12,
  },
  cardAction: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignSelf: "flex-start",
  },
  cardActionText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    marginRight: 6,
    letterSpacing: 0.2,
    fontFamily: "System",
  },

  // Section informative redesignée
  infoSection: {
    marginBottom: 20,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    
    backgroundColor: "rgba(61, 134, 83, 0.34)",
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: "rgba(11, 121, 31, 0.3)",
  },
  infoIconContainer: {
    marginRight: 16,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(31, 167, 57, 0.2)",
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    color: "#1FA739",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 15,
    fontWeight: "350",
    lineHeight: 22,
  },
})
