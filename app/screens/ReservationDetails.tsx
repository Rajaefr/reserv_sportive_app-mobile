"use client"

import { Ionicons } from "@expo/vector-icons"
import * as FileSystem from "expo-file-system"
import { LinearGradient } from "expo-linear-gradient"
import * as Print from "expo-print"
import { useLocalSearchParams, useRouter } from "expo-router"
import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const mockHistory = [
  {
    id: "1",
    activity: "Piscine Chauffée",
    date: "2025-07-10",
    status: "validé",
    members: ["Ali", "Sara"],
    analyse: "acceptée",
    commentaire: "",
    submittedDate: "2025-07-08",
    duration: "Il y a 2 jours",
  },
  {
    id: "2",
    activity: "Salle C001-1",
    date: "2025-07-14",
    status: "refusé",
    members: ["Zahra", "Youssef"],
    analyse: "refusée",
    commentaire: "Le nom du membre ne correspond pas aux archives.",
    submittedDate: "2025-07-12",
    duration: "Il y a 3 heures",
  },
  {
    id: "3",
    activity: "Salle C058-3",
    date: "2025-07-16",
    status: "en attente",
    members: ["Karim"],
    analyse: "en cours",
    commentaire: "",
    submittedDate: "2025-07-15",
    duration: "Il y a 1 heure",
  },
]

export default function ReservationDetails() {
  const { id } = useLocalSearchParams()
  const router = useRouter()
  const item = mockHistory.find((el) => el.id === id)

  if (!item) {
    return (
      <View style={styles.container}>
        <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
          <View style={styles.center}>
            <Ionicons name="alert-circle-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
            <Text style={styles.notFound}>Réservation introuvable</Text>
            <TouchableOpacity style={styles.backButton} onPress={router.back}>
              <Text style={styles.backButtonText}>Retour</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validé":
        return <Ionicons name="checkmark-circle" size={28} color="#1FA739" />
      case "en attente":
        return <Ionicons name="time" size={28} color="#f5780b" />
      case "refusé":
        return <Ionicons name="close-circle" size={28} color="#DC2626" />
      default:
        return <Ionicons name="help-circle" size={28} color="#9CA3AF" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validé":
        return "#1FA739"
      case "en attente":
        return "#f5780b"
      case "refusé":
        return "#DC2626"
      default:
        return "#9CA3AF"
    }
  }

  const getActivityIcon = (activity: string) => {
    if (activity.toLowerCase().includes("piscine")) {
      return <Ionicons name="water" size={24} color="#1FA739" />
    } else {
      return <Ionicons name="barbell" size={24} color="#1FA739" />
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ImageBackground
        source={require("../../assets/images/background_app.jpg")}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backBtn} onPress={router.back}>
              <LinearGradient
                colors={["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]}
                style={styles.backBtnGradient}
              >
                <Ionicons name="arrow-back" size={24} color="white" />
              </LinearGradient>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Détails de la Réservation</Text>
            <View style={styles.headerRight} />
          </View>

          <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false} bounces={true}>
            {/* Status Card */}
            <View style={styles.statusCard}>
              <View style={styles.statusHeader}>
                {getStatusIcon(item.status)}
                <View style={styles.statusInfo}>
                  <Text style={styles.statusTitle}>Statut de la demande</Text>
                  <Text style={[styles.statusValue, { color: getStatusColor(item.status) }]}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Text>
                </View>
              </View>
              <Text style={styles.statusTime}>{item.duration}</Text>
            </View>

            {/* Activity Card */}
            <View style={styles.detailCard}>
              <View style={styles.cardHeader}>
                {getActivityIcon(item.activity)}
                <Text style={styles.cardTitle}>Informations de l'activité</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Activité :</Text>
                  <Text style={styles.value}>{item.activity}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Date prévue :</Text>
                  <Text style={styles.value}>{item.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Date de soumission :</Text>
                  <Text style={styles.value}>{item.submittedDate}</Text>
                </View>
              </View>
            </View>

            {/* Members Card */}
            <View style={styles.detailCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="people" size={24} color="#1FA739" />
                <Text style={styles.cardTitle}>Participants</Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.membersCount}>{item.members.length} participant(s)</Text>
                <View style={styles.membersList}>
                  {item.members.map((member, index) => (
                    <View key={index} style={styles.memberItem}>
                      <Ionicons name="person" size={16} color="#1FA739" />
                      <Text style={styles.memberName}>{member}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>

            {/* Analysis Card */}
            <View style={styles.detailCard}>
              <View style={styles.cardHeader}>
                <Ionicons name="document-text" size={24} color="#1FA739" />
                <Text style={styles.cardTitle}>Analyse administrative</Text>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.detailRow}>
                  <Text style={styles.label}>Résultat :</Text>
                  <Text style={[styles.value, { color: getStatusColor(item.status) }]}>
                    {item.analyse.charAt(0).toUpperCase() + item.analyse.slice(1)}
                  </Text>
                </View>
                {item.commentaire ? (
                  <View style={styles.commentSection}>
                    <Text style={styles.commentLabel}>Commentaire :</Text>
                    <View style={styles.commentBox}>
                      <Ionicons name="alert-circle" size={16} color="#DC2626" />
                      <Text style={styles.commentText}>{item.commentaire}</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.noCommentSection}>
                    <Ionicons name="checkmark-circle" size={16} color="#1FA739" />
                    <Text style={styles.noCommentText}>Aucun commentaire particulier</Text>
                  </View>
                )}
              </View>
            </View>

            {item.status === "validé" && (
  <View style={styles.actionCard}>
    <View style={styles.actionHeader}>
      <Ionicons name="calendar" size={24} color="#1FA739" />
      <Text style={styles.actionTitle}>Prochaines étapes</Text>
    </View>
    <Text style={styles.actionText}>
      Votre réservation est confirmée ! Présentez-vous à l'accueil le jour prévu avec une pièce d'identité.
    </Text>

    <TouchableOpacity
  style={styles.actionButton}
  onPress={async () => {
    const logoBase64 = await FileSystem.readAsStringAsync(
      require("../../assets/images/logo.png"),
      { encoding: FileSystem.EncodingType.Base64 }
    );
    
    const html = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 40px;
              background-color: #fff;
              color: #000;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo {
              width: 100px;
              margin-bottom: 10px;
            }
            h1 {
              font-size: 20px;
              text-transform: uppercase;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .section {
              border: 1px solid #000;
              padding: 20px;
              margin-top: 20px;
            }
            .row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
            }
            .label {
              font-weight: bold;
            }
            .footer {
              margin-top: 40px;
              font-size: 12px;
              text-align: center;
              color: #444;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="data:image/png;base64,${logoBase64}" class="logo" />
            <h1>Reçu de réservation</h1>
          </div>

          <div class="section">
            <div class="row"><span class="label">Activité :</span> <span>${item.activity}</span></div>
            <div class="row"><span class="label">Date prévue :</span> <span>${item.date}</span></div>
            <div class="row"><span class="label">Soumise le :</span> <span>${item.submittedDate}</span></div>
            <div class="row"><span class="label">Statut :</span> <span>${item.status.toUpperCase()}</span></div>
            <div class="row"><span class="label">Participants :</span> <span>${item.members.join(", ")}</span></div>
          </div>

          <div class="footer">
            Merci pour votre confiance. Présentez ce reçu le jour de l'activité avec une pièce d'identité.
          </div>
        </body>
      </html>
    `;

    await Print.printAsync({ html });
  }}
>
  <Ionicons name="document-text" size={20} color="white" />
  <Text style={styles.actionButtonText}>Générer Reçu PDF</Text>
</TouchableOpacity>

  </View>
)}


            {item.status === "en attente" && (
              <View style={styles.actionCard}>
                <View style={styles.actionHeader}>
                  <Ionicons name="hourglass" size={24} color="#f5780b" />
                  <Text style={styles.actionTitle}>En cours de traitement</Text>
                </View>
                <Text style={styles.actionText}>
                  Votre demande est en cours d'examen par l'administration. Vous recevrez une notification dès qu'une
                  décision sera prise.
                </Text>
              </View>
            )}

            {item.status === "refusé" && (
              <View style={styles.actionCard}>
                <View style={styles.actionHeader}>
                  <Ionicons name="close-circle" size={24} color="#DC2626" />
                  <Text style={styles.actionTitle}>Demande refusée</Text>
                </View>
                <Text style={styles.actionText}>
                  Votre demande n'a pas pu être acceptée. Vous pouvez soumettre une nouvelle demande en corrigeant les
                  informations mentionnées dans le commentaire.
                </Text>
                <TouchableOpacity style={[styles.actionButton, styles.retryButton]}>
                  <Ionicons name="refresh" size={20} color="white" />
                  <Text style={styles.actionButtonText}>Nouvelle demande</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    paddingTop: 60,
  },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  backBtn: {
    borderRadius: 12,
    overflow: "hidden",
  },
  backBtnGradient: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  headerRight: {
    width: 44,
  },

  // Content
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  // Status Card
  statusCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
   
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusInfo: {
    marginLeft: 16,
    flex: 1,
  },
  statusTitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  statusTime: {
    color: "rgba(255, 255, 255, 0.5)",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "right",
  },

  // Detail Cards
  detailCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
   
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  cardContent: {
    gap: 12,
  },

  // Detail Rows
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  label: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    fontWeight: "500",
    flex: 1,
  },
  value: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    flex: 2,
    textAlign: "right",
    fontFamily: "System",
  },

  // Members
  membersCount: {
    color: "#1FA739",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    fontFamily: "System",
  },
  membersList: {
    gap: 8,
  },
  memberItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  memberName: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginLeft: 8,
    fontFamily: "System",
  },

  // Comments
  commentSection: {
    marginTop: 8,
  },
  commentLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 8,
  },
  commentBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(220, 38, 38, 0.1)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(220, 38, 38, 0.3)",
  },
  commentText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  noCommentSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(31, 167, 57, 0.1)",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(31, 167, 57, 0.3)",
    marginTop: 8,
  },
  noCommentText: {
    color: "#1FA739",
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    fontFamily: "System",
  },

  // Action Card
  actionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
   
  },
  actionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  actionText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: "500",
  },
  actionButton: {
    backgroundColor: "#1FA739",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#32CD32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  retryButton: {
    backgroundColor: "#DC2626",
    shadowColor: "#DC2626",
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.3,
    fontFamily: "System",
  },

  // Error State
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
  backButton: {
    backgroundColor: "#1FA739",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
})
