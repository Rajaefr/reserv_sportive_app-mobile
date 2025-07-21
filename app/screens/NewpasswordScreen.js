"use client"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const PasswordStrengthIndicator = ({ password }) => {
  const getStrength = () => {
    if (password.length < 6) return { level: 1, color: "#DC2626", text: "Faible" }
    if (password.length < 10) return { level: 2, color: "#f5780b", text: "Moyen" }
    return { level: 3, color: "#1FA739", text: "Fort" }
  }

  const strength = getStrength()

  return (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthHeader}>
        <Text style={styles.strengthLabel}>Force du mot de passe :</Text>
        <Text style={[styles.strengthText, { color: strength.color }]}>{strength.text}</Text>
      </View>
      <View style={styles.strengthBar}>
        <View
          style={[
            styles.strengthFill,
            {
              width: `${(strength.level / 3) * 100}%`,
              backgroundColor: strength.color,
            },
          ]}
        />
      </View>
    </View>
  )
}

export default function NewPasswordScreen() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs")
      return
    }
    if (password.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères")
      return
    }
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      Alert.alert("Succès", "Mot de passe mis à jour avec succès", [
        { text: "OK", onPress: () => router.replace("../screens/LoginScreen") },
      ])
    }, 1500)
  }

  return (
    <ImageBackground source={require("../../assets/images/background_app.jpg")} style={{ flex: 1 }} resizeMode="cover">
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#111827" />
          <View style={styles.content}>
            {/* Card principale avec background uniforme */}
            <LinearGradient colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]} style={styles.card}>
              {/* Header */}
              <View style={styles.header}>
                <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.iconContainer}>
                  <Ionicons name="lock-closed" size={28} color="white" />
                </LinearGradient>
                <Text style={styles.title}>Nouveau mot de passe</Text>
                <Text style={styles.subtitle}>Créez un mot de passe sécurisé pour votre compte</Text>
              </View>

              {/* Formulaire */}
              <View style={styles.formContainer}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Nouveau mot de passe *</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="rgba(255, 255, 255, 0.6)"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Minimum 6 caractères"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      secureTextEntry={!showPassword}
                      value={password}
                      onChangeText={setPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="rgba(255, 255, 255, 0.6)"
                      />
                    </TouchableOpacity>
                  </View>
                  {password.length > 0 && <PasswordStrengthIndicator password={password} />}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Confirmer le mot de passe *</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="rgba(255, 255, 255, 0.6)"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Répétez votre mot de passe"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      secureTextEntry={!showConfirmPassword}
                      value={confirmPassword}
                      onChangeText={setConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={styles.eyeButton}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="rgba(255, 255, 255, 0.6)"
                      />
                    </TouchableOpacity>
                  </View>
                  {confirmPassword.length > 0 && password !== confirmPassword && (
                    <Text style={styles.errorText}>Les mots de passe ne correspondent pas</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.submitButtonGradient}>
                    {isSubmitting ? (
                      <Text style={styles.submitButtonText}>Mise à jour...</Text>
                    ) : (
                      <>
                        <Ionicons name="checkmark-circle" size={18} color="white" />
                        <Text style={styles.submitButtonText}>Confirmer</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Retour */}
              <TouchableOpacity onPress={() => router.back()} style={styles.backLink} activeOpacity={0.7}>
                <Ionicons name="arrow-back" size={16} color="rgba(255, 255, 255, 0.8)" />
                <Text style={styles.backText}>Retour</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  content: {
    alignItems: "center",
  },
  card: {
    borderRadius: 24,
    padding: 28,
    width: "100%",
    maxWidth: 400,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 4,
    shadowColor: "#1FA739",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "System",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  formContainer: {
    width: "100%",
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    fontFamily: "System",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 16,
    minHeight: 52,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  eyeButton: {
    padding: 4,
  },
  strengthContainer: {
    marginTop: 12,
  },
  strengthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  strengthLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 12,
    fontWeight: "500",
  },
  strengthText: {
    fontSize: 12,
    fontWeight: "600",
  },
  strengthBar: {
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  strengthFill: {
    height: "100%",
    borderRadius: 2,
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 6,
  },
  submitButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 8,
    elevation: 4,
    shadowColor: "#1FA739",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  submitButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  submitButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "System",
  },
  backLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
  },
  backText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
})
