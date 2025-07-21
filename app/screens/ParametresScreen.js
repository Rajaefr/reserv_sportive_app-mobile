"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import FloatingTabBar from "../components/FloatingTabBar"
import Header from "../components/Header"

export default function Parametres() {
  const router = useRouter()
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+212 612345678",
    matricule: "A789456",
  })
  const [editField, setEditField] = useState(null)
  const [tempValue, setTempValue] = useState("")

  const handleEdit = (field) => {
    setEditField(field)
    setTempValue(userInfo[field])
  }

  const handleSave = () => {
    setUserInfo({ ...userInfo, [editField]: tempValue })
    setEditField(null)
  }

  const handleResetPassword = () => {
    router.push("/screens/ResetPasswordScreen")
  }

  const handleLogout = () => {
    Alert.alert("Se déconnecter", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      { text: "Déconnecter", onPress: () => router.push("/login"), style: "destructive" },
    ])
  }

  const userFields = [
    { key: "name", label: "Nom complet", icon: "person", editable: true },
    { key: "email", label: "Email", icon: "mail", editable: true },
    { key: "phone", label: "Téléphone", icon: "call", editable: true },
    { key: "matricule", label: "Numéro de Matricule", icon: "card", editable: false },
  ]

  return (
    <View style={styles.container}>
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
        <SafeAreaView style={styles.safeContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#111827" />
          <Header title="Paramètres" />

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={true}>
            {/* Section Profil */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profil utilisateur</Text>
              <View style={styles.profileCard}>
                <View style={styles.profileHeader}>
                  <View style={styles.avatarContainer}>
                    <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.avatar}>
                      <Ionicons name="person" size={32} color="white" />
                    </LinearGradient>
                  </View>
                  <View style={styles.profileInfo}>
                    <Text style={styles.profileName}>{userInfo.name}</Text>
                    <Text style={styles.profileType}>Collaborateur OCP</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Section Informations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Informations personnelles</Text>
              <View style={styles.infoCard}>
                {userFields.map((field) => (
                  <View key={field.key} style={styles.infoRow}>
                    {editField === field.key ? (
                      <>
                        <View style={styles.fieldHeader}>
                          <Ionicons name={field.icon} size={20} color="#1FA739" />
                          <Text style={styles.fieldLabel}>{field.label}</Text>
                        </View>
                        <View style={styles.editContainer}>
                          <TextInput
                            style={styles.input}
                            value={tempValue}
                            onChangeText={setTempValue}
                            placeholderTextColor="rgba(255, 255, 255, 0.4)"
                            autoFocus
                          />
                          <TouchableOpacity onPress={handleSave} style={styles.saveButton} activeOpacity={0.8}>
                            <Ionicons name="checkmark" size={20} color="white" />
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.fieldHeader}>
                          <Ionicons name={field.icon} size={20} color="#1FA739" />
                          <View style={styles.fieldInfo}>
                            <Text style={styles.fieldLabel}>{field.label}</Text>
                            <Text style={styles.fieldValue}>{userInfo[field.key]}</Text>
                          </View>
                        </View>
                        {field.editable && (
                          <TouchableOpacity
                            onPress={() => handleEdit(field.key)}
                            style={styles.editButton}
                            activeOpacity={0.8}
                          >
                            <Ionicons name="create-outline" size={20} color="rgba(255, 255, 255, 0.6)" />
                          </TouchableOpacity>
                        )}
                      </>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Section Actions */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Actions</Text>
              <View style={styles.actionsContainer}>
                <TouchableOpacity style={styles.actionButton} onPress={handleResetPassword} activeOpacity={0.8}>
                  <View style={styles.actionContent}>
                    <View style={styles.actionIcon}>
                      <Ionicons name="lock-closed" size={20} color="#f5780b" />
                    </View>
                    <View style={styles.actionInfo}>
                      <Text style={styles.actionTitle}>Modifier le mot de passe</Text>
                      <Text style={styles.actionSubtitle}>Changer votre mot de passe de connexion</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.4)" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.logoutButton]}
                  onPress={handleLogout}
                  activeOpacity={0.8}
                >
                  <View style={styles.actionContent}>
                    <View style={[styles.actionIcon, styles.logoutIcon]}>
                      <Ionicons name="log-out" size={20} color="#DC2626" />
                    </View>
                    <View style={styles.actionInfo}>
                      <Text style={[styles.actionTitle, styles.logoutText]}>Se déconnecter</Text>
                      <Text style={styles.actionSubtitle}>Quitter votre session actuelle</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
  },
  safeContainer: {
    flex: 1,
 
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 140,
    paddingTop: 20,
  },

  // Sections
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    letterSpacing: 0.3,
    fontFamily: "System",
  },

  // Carte de profil
  profileCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
    fontFamily: "System",
  },
  profileType: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "500",
  },

  // Carte d'informations
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  fieldHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  fieldInfo: {
    marginLeft: 12,
    flex: 1,
  },
  fieldLabel: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  fieldValue: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
  editButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },

  // Édition
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 32,
  },
  input: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    padding: 12,
    borderRadius: 12,
    fontSize: 16,
    fontWeight: "500",
    marginRight: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  saveButton: {
    backgroundColor: "#1FA739",
    padding: 8,
    borderRadius: 8,
  },

  // Actions
  actionsContainer: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  logoutButton: {
    borderColor: "rgba(220, 38, 38, 0.3)",
    backgroundColor: "rgba(220, 38, 38, 0.1)",
  },
  actionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(245, 120, 11, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  logoutIcon: {
    backgroundColor: "rgba(220, 38, 38, 0.2)",
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
    fontFamily: "System",
  },
  logoutText: {
    color: "#DC2626",
  },
  actionSubtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 13,
    fontWeight: "500",
  },
})
