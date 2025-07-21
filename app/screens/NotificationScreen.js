"use client"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import FloatingTabBar from "../components/FloatingTabBar"
import Header from "../components/Header"

export default function NotificationScreen() {
  const router = useRouter()

  const notifications = [
    { id: 1, activity: "Piscine", date: "2025-07-10", status: "validé", duration: "Il y a 2 jours", isRead: false },
    {
      id: 2,
      activity: "Tennis",
      date: "2025-07-12",
      status: "en attente",
      duration: "Il y a 10 heures",
      isRead: false,
    },
    {
      id: 3,
      activity: "Salle Workout",
      date: "2025-07-14",
      status: "refusé",
      duration: "Il y a 3 heures",
      isRead: true,
    },
    { id: 4, activity: "Piscine", date: "2025-07-10", status: "validé", duration: "Il y a 2 jours", isRead: true },
    { id: 5, activity: "Basketball", date: "2025-07-12", status: "validé", duration: "Il y a 9 heures", isRead: false },
  ]

  // Regrouper par date
  const groupedNotifications = notifications.reduce((acc, notif) => {
    if (!acc[notif.date]) acc[notif.date] = []
    acc[notif.date].push(notif)
    return acc
  }, {})

  const unreadCount = notifications.filter((n) => !n.isRead).length

  const statusIcon = (status) => {
    if (status === "validé") return <Ionicons name="checkmark-circle" size={20} color="#1FA739" />
    if (status === "en attente") return <Ionicons name="time" size={20} color="#f5780b" />
    if (status === "refusé") return <Ionicons name="close-circle" size={20} color="#DC2626" />
    return null
  }

  const getStatusMessage = (activity, status) => {
    switch (status) {
      case "validé":
        return `Votre réservation ${activity} a été confirmée`
      case "en attente":
        return `Votre demande de réservation ${activity} est en cours d'examen`
      case "refusé":
        return `Votre réservation ${activity} a été refusée`
      default:
        return `Mise à jour de votre réservation ${activity}`
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
        <StatusBar barStyle="light-content" backgroundColor="#111827" />

        <Header title="Notifications" subtitle="Restez informé de vos réservations" showNotification={false} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={true}>
          {/* Statistiques */}
          <View style={styles.statsSection}>
            <View style={styles.statCard}>
              <LinearGradient colors={["rgba(31, 167, 57, 0.4)", "rgba(34, 197, 94, 0.6)"]} style={styles.statGradient}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="notifications" size={20} color="#1FA739" />
                </View>
                <Text style={styles.statLabel}>{notifications.length} notifications</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={["rgba(245, 159, 11, 0.48)", "rgba(217, 119, 6, 0.59)"]}
                style={styles.statGradient}
              >
                <View style={styles.statIconContainer}>
                  <Ionicons name="alert-circle" size={20} color="#f5780b" />
                </View>
                <Text style={styles.statLabel}>{unreadCount} non lues</Text>
              </LinearGradient>
            </View>
          </View>

          {/* Liste des notifications groupées */}
          <View style={styles.notificationsContainer}>
            {Object.entries(groupedNotifications).map(([date, items]) => (
              <View key={date} style={styles.dateGroup}>
                <Text style={styles.dateGroupTitle}>{date}</Text>
                {items.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={
                        !item.isRead
                          ? ["rgba(31, 167, 57, 0.15)", "rgba(31, 167, 57, 0.08)"]
                          : ["rgba(255, 255, 255, 0.12)", "rgba(255, 255, 255, 0.08)"]
                      }
                      style={styles.cardGradient}
                    >
                      <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                          <View style={styles.activityInfo}>
                            <View style={styles.statusIconContainer}>{statusIcon(item.status)}</View>
                            <View style={styles.notificationInfo}>
                              <Text style={styles.notificationTitle}>
                                {getStatusMessage(item.activity, item.status)}
                              </Text>
                              <Text style={styles.notificationTime}>{item.duration}</Text>
                            </View>
                          </View>
                          {!item.isRead && <View style={styles.unreadDot} />}
                        </View>
                        <View style={styles.cardFooter}>
                          <Text style={styles.viewDetailsText}>Appuyez pour plus de détails</Text>
                          <Ionicons name="arrow-forward" size={14} color="rgba(255, 255, 255, 0.4)" />
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          {notifications.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="notifications-off-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
              <Text style={styles.emptyTitle}>Aucune notification</Text>
              <Text style={styles.emptySubtitle}>Vous recevrez ici les mises à jour de vos réservations</Text>
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
    paddingTop: 60,
  },
  // Contenu scrollable
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  // Section statistiques
  statsSection: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
  
   
  },
  statGradient: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    minHeight: 80,
    justifyContent: "center",
  },
  statIconContainer: {
    marginBottom: 8,
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  statLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "System",
  },
  // Notifications
  notificationsContainer: {
    gap: 24,
  },
  dateGroup: {
    gap: 12,
  },
  dateGroupTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "rgba(255, 255, 255, 0.8)",
    marginBottom: 8,
    fontFamily: "System",
  },
  notificationCard: {
    borderRadius: 16,
    overflow: "hidden",
  
  },

  cardGradient: {
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 16,
  },
  cardContent: {
    gap: 12,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  activityInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    flex: 1,
  },
  statusIconContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    fontWeight: "500",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1FA739",
    marginTop: 6,
  
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  viewDetailsText: {
    color: "rgba(255, 255, 255, 0.4)",
    fontSize: 12,
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
