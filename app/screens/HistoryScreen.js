"use client"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FloatingTabBar from "../components/FloatingTabBar"
import Header from "../components/Header"

export default function HistoryScreen() {
  const router = useRouter()
  const [filter, setFilter] = useState("all")

  const historyData = [
    {
      id: 1,
      activity: "Piscine Chauffée",
      date: "2025-07-10",
      status: "validé",
      duration: "Il y a 2 jours",
      members: ["Ali", "Sara"],
      montant: "40 DH",
      analyse: "acceptée",
      commentaire: "",
    },
    {
      id: 2,
      activity: "Salle C001-1",
      date: "2025-07-14",
      status: "refusé",
      duration: "Il y a 3 heures",
      members: ["Zahra", "Youssef"],
      montant: "80 DH",
      analyse: "refusée",
      commentaire: "Le nom ne correspond pas aux archives.",
    },
    {
      id: 3,
      activity: "Salle C058-3",
      date: "2025-07-16",
      status: "en attente",
      duration: "Il y a 1 heure",
      members: ["Karim"],
      analyse: "en cours",
      commentaire: "",
    },
  ]

  const filteredData = filter === "all" ? historyData : historyData.filter((item) => item.status === filter)

  const statusIcon = (status) => {
    if (status === "validé") return <Ionicons name="checkmark-circle" size={24} color="#1FA739" />
    if (status === "en attente") return <Ionicons name="time" size={24} color="#f5780b" />
    if (status === "refusé") return <Ionicons name="close-circle" size={24} color="#DC2626" />
    return null
  }

  const getFilterButtonStyle = (filterType) => {
    return filter === filterType ? styles.activeFilterButton : styles.filterButton
  }

  const getFilterTextStyle = (filterType) => {
    return filter === filterType ? styles.activeFilterText : styles.filterText
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
        <Header title="Historique" subtitle="Consultez vos réservations passées" />

        {/* Section Filtres */}
        <View style={styles.filtersSection}>
          <Text style={styles.sectionTitle}>Filtrer par statut</Text>
          <View style={styles.filterContainer}>
            {[
              { key: "all", label: "Tous" },
              { key: "validé", label: "Validé" },
              { key: "en attente", label: "En attente" },
              { key: "refusé", label: "Refusé" },
            ].map((item) => (
              <TouchableOpacity
                key={item.key}
                onPress={() => setFilter(item.key)}
                style={getFilterButtonStyle(item.key)}
                activeOpacity={0.8}
              >
                <Text style={getFilterTextStyle(item.key)}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Liste des réservations */}
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={true}>
          <View style={styles.historyContainer}>
            {filteredData.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.historyCard}
                onPress={() =>
                  router.push({
                    pathname: "/screens/ReservationDetails",
                    params: { id: item.id.toString() },
                  })
                }
                activeOpacity={0.85}
              >
                <LinearGradient
                  colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]}
                  style={styles.cardGradient}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.activityInfo}>
                      <Text style={styles.activityTitle}>{item.activity}</Text>
                      <Text style={styles.activityDate}>
                        {item.date} • {item.duration}
                      </Text>
                    </View>
                    <View style={styles.statusContainer}>{statusIcon(item.status)}</View>
                  </View>

                  <View style={styles.cardContent}>
                    <View style={styles.membersSection}>
                      <Ionicons name="people" size={16} color="#1FA739" />
                      <Text style={styles.membersText}>Participants: {item.members.join(", ")}</Text>
                    </View>
                    {item.montant && (
                      <View style={styles.amountSection}>
                        <Ionicons name="card" size={16} color="#f5780b" />
                        <Text style={styles.amountText}>Montant: {item.montant}</Text>
                      </View>
                    )}
                    {item.commentaire && (
                      <View style={styles.commentSection}>
                        <Ionicons name="alert-circle" size={16} color="#DC2626" />
                        <Text style={styles.commentText}>{item.commentaire}</Text>
                      </View>
                    )}
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.viewDetailsText}>Voir les détails</Text>
                    <Ionicons name="arrow-forward" size={16} color="rgba(255, 255, 255, 0.6)" />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>

          {filteredData.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="document-text-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
              <Text style={styles.emptyTitle}>Aucun historique</Text>
              <Text style={styles.emptySubtitle}>
                {filter === "all"
                  ? "Vous n'avez pas encore effectué de réservations"
                  : `Aucune réservation avec le statut "${filter}"`}
              </Text>
            </View>
          )}
        </ScrollView>

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
  // Section des filtres
  filtersSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  activeFilterButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: "#1FA739",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#1FA739",
    elevation: 3,
    shadowColor: "#1FA739",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  filterText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "System",
  },
  activeFilterText: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "System",
  },
  // Contenu scrollable
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  historyContainer: {
    gap: 16,
  },
  // Cartes d'historique
  historyCard: {
    borderRadius: 20,
    overflow: "hidden",
    
  },
  cardGradient: {
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  activityDate: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
    fontWeight: "500",
  },
  statusContainer: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  // Contenu de la carte
  cardContent: {
    gap: 12,
    marginBottom: 16,
  },
  membersSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  membersText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
    flex: 1,
  },
  amountSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  amountText: {
    color: "#f5780b",
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "System",
  },
  commentSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(220, 38, 38, 0.3)",
  },
  commentText: {
    color: "#DC2626",
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
    lineHeight: 18,
  },
  // Pied de carte
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  viewDetailsText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "500",
  },
  // État vide
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "System",
  },
  emptySubtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 40,
  },
})
