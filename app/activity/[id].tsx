"use client"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

const { height, width } = Dimensions.get("window")

// 🔁 Uniquement Piscine & Workout
const activityDetails = {
  piscine: {
    title: "Piscine Chauffée",
    image: require("../../assets/images/piscine.jpg"),
    icon: "water",
    color: "#1FA739",
    gradient: ["rgba(31, 167, 57, 0.8)", "rgba(34, 197, 94, 0.6)"],
    description:
      "Profitez de notre piscine chauffée dans un environnement moderne et sécurisé. Accès réservé aux collaborateurs, retraités, conjoints et enfants de 5 à 12 ans. L'affectation à un groupe se fait sur place selon la disponibilité.",
    rules: [
      "Réservation préalable obligatoire via l'application",
      "Enfants admis de 5 à 12 ans (maximum 5 enfants par réservation)",
      "Jusqu'à 2 conjoints autorisés par réservation",
      "Affectation à un groupe effectuée par l'administration lors de votre présence",
      "Respect des horaires de réservation",
    ],
    canReserve: true,
  },
  workout: {
    title: "Salle de Sport",
    image: require("../../assets/images/workout.jpg"),
    icon: "barbell",
    color: "#f5780b",
    gradient: ["rgba(245, 120, 11, 0.8)", "rgba(217, 119, 6, 0.6)"],
    description:
      "Accédez à notre salle de sport moderne avec équipements professionnels. Réservation par code de discipline selon votre profil et vos préférences. Encadrement professionnel disponible.",
    rules: [
      "Réservation via code de discipline (ex: C001-1, C058-2)",
      "Chaque code correspond à une salle ou activité spécifique",
      "Montant à payer selon le code de discipline choisi",
      "Paiement validé par l'administration sur place",
      "Respect des créneaux horaires",
    ],
    canReserve: true,
  },
}

export default function ActivityDetail() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const activityId = Array.isArray(id) ? id[0] : id
  const activity = activityDetails[activityId as keyof typeof activityDetails]

  if (!activity) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
          <View style={styles.center}>
            <Ionicons name="alert-circle-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
            <Text style={styles.notFound}>Activité non trouvée</Text>
            <TouchableOpacity onPress={router.back} style={styles.backToHomeButton}>
              <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.backToHomeGradient}>
                <Text style={styles.backToHomeText}>Retour</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    )
  }

  const handleReservation = () => {
    if (activityId === "piscine") {
      router.push("/reservation/piscine")
    } else if (activityId === "workout") {
      router.push("/reservation/workout")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
        {/* Header avec image */}
        <View style={styles.headerContainer}>
          <ImageBackground source={activity.image} style={styles.headerImage} resizeMode="cover">
            <LinearGradient
              colors={["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.5)", "rgba(0, 0, 0, 0.8)"]}
              style={styles.headerOverlay}
            >
              <TouchableOpacity onPress={router.back} style={styles.backButton} activeOpacity={0.8}>
                <LinearGradient
                  colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]}
                  style={styles.backButtonGradient}
                >
                  <Ionicons name="arrow-back" size={24} color="white" />
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.headerContent}>
                <LinearGradient colors={activity.gradient as any} style={styles.headerIcon}>
                  <Ionicons name={activity.icon as any} size={32} color="white" />
                </LinearGradient>
                <Text style={styles.headerTitle}>{activity.title}</Text>
                <Text style={styles.headerSubtitle}>Découvrez tous les détails</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={true}>
          {/* Description */}
          <View style={styles.section}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]}
              style={styles.descriptionCard}
            >
              <View style={styles.descriptionHeader}>
                <Ionicons name="information-circle" size={24} color={activity.color} />
                <Text style={styles.sectionTitle}>Description</Text>
              </View>
              <Text style={styles.description}>{activity.description}</Text>
            </LinearGradient>
          </View>

          {/* Règles */}
          <View style={styles.section}>
            <View style={styles.rulesHeader}>
              <Ionicons name="shield-checkmark" size={24} color="#1FA739" />
              <Text style={styles.sectionTitle}>Règles à respecter</Text>
            </View>
            <View style={styles.rulesContainer}>
              {activity.rules.map((rule, index) => (
                <LinearGradient
                  key={index}
                  colors={["rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.06)"]}
                  style={styles.ruleItem}
                >
                  <View style={styles.ruleBullet}>
                    <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.ruleBulletGradient}>
                      <Ionicons name="checkmark" size={14} color="white" />
                    </LinearGradient>
                  </View>
                  <Text style={styles.ruleText}>{rule}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>

          {/* Informations supplémentaires */}
          <View style={styles.section}>
            <LinearGradient colors={["rgba(245, 120, 11, 0.15)", "rgba(245, 120, 11, 0.08)"]} style={styles.infoCard}>
              <View style={styles.infoHeader}>
                <Ionicons name="alert-circle" size={20} color="#f5780b" />
                <Text style={styles.infoTitle}>Information importante</Text>
              </View>
              <Text style={styles.infoText}>
                Toute réservation doit être confirmée au moins 2 heures avant le créneau souhaité. Les annulations sont
                possibles jusqu'à 1 heure avant le début de l'activité.
              </Text>
            </LinearGradient>
          </View>

          {/* Bouton de réservation */}
          {activity.canReserve && (
            <View style={styles.reservationSection}>
              <TouchableOpacity style={styles.reservationButton} onPress={handleReservation} activeOpacity={0.85}>
                <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.reservationGradient}>
                  <Ionicons name="calendar" size={24} color="white" />
                  <Text style={styles.reservationText}>Réserver maintenant</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  gradient: {
    flex: 1,
  },
  // Header
  headerContainer: {
    height: height * 0.4,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerImage: {
    flex: 1,
    width: "100%",
  },
  headerOverlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
    justifyContent: "space-between",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backButtonGradient: {
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  headerContent: {
    alignItems: "flex-start",
  },
  headerIcon: {
    width: 72,
    height: 72,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  headerTitle: {
    fontSize: 32,
    color: "white",
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  // Contenu
  content: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  // Description
  descriptionCard: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  descriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  description: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
  },
  // Règles
  rulesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  rulesContainer: {
    gap: 12,
  },
  ruleItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
  },
  ruleBullet: {
    marginRight: 12,
    marginTop: 2,
  },
  ruleBulletGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ruleText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
    flex: 1,
  },
  // Information card
  infoCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(245, 120, 11, 0.3)",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  infoTitle: {
    color: "#f5780b",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  infoText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
  },
  // Réservation
  reservationSection: {
    marginTop: 16,
  },
  reservationButton: {
    borderRadius: 20,
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#1FA739",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  reservationGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  reservationText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  // États d'erreur
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  notFound: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 24,
    textAlign: "center",
    fontFamily: "System",
  },
  backToHomeButton: {
    borderRadius: 16,
    overflow: "hidden",
  },
  backToHomeGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  backToHomeText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
})
