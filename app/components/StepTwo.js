"use client"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useState } from "react"
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const ProgressBar = ({ step, totalSteps = 2 }) => (
  <View style={styles.progressContainer}>
    {Array.from({ length: totalSteps }, (_, index) => (
      <View key={index} style={styles.progressStepContainer}>
        <LinearGradient
          colors={index + 1 <= step ? ["#1FA739", "#22C55E"] : ["rgba(255, 255, 255, 0.2)", "rgba(255, 255, 255, 0.1)"]}
          style={styles.progressStep}
        />
      </View>
    ))}
  </View>
)

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

const StepTwo = ({ formData, handleInputChange, handleSubmit, currentStep, prevStep }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateAndSubmit = async () => {
    if (!formData.password.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un mot de passe")
      return
    }
    if (formData.password.length < 6) {
      Alert.alert("Erreur", "Le mot de passe doit contenir au moins 6 caractères")
      return
    }
    if (!formData.confirmPassword.trim()) {
      Alert.alert("Erreur", "Veuillez confirmer votre mot de passe")
      return
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      handleSubmit()
    }, 1500)
  }

  return (
    <View style={styles.container}>
      {/* Card principale avec background uniforme */}
      <LinearGradient colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]} style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.iconContainer}>
            <Ionicons name="lock-closed" size={26} color="white" />
          </LinearGradient>
          <Text style={styles.title}>Sécurité</Text>
          <Text style={styles.subtitle}>Étape 2 sur 2 - Créez votre mot de passe</Text>
        </View>

        {/* Barre de progression */}
        <ProgressBar step={currentStep} />

        {/* Formulaire */}
        <View style={styles.formContainer}>
          {/* Mot de passe */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe *</Text>
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
                value={formData.password}
                onChangeText={(text) => handleInputChange("password", text)}
                secureTextEntry={!showPassword}
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
            {formData.password.length > 0 && <PasswordStrengthIndicator password={formData.password} />}
          </View>

          {/* Confirmation mot de passe */}
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
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange("confirmPassword", text)}
                secureTextEntry={!showConfirmPassword}
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
            {formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && (
              <Text style={styles.errorText}>Les mots de passe ne correspondent pas</Text>
            )}
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={prevStep} activeOpacity={0.8}>
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
              style={styles.backButtonGradient}
            >
              <Ionicons name="arrow-back" size={18} color="white" />
              <Text style={styles.backButtonText}>Retour</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={validateAndSubmit}
            disabled={isSubmitting}
            activeOpacity={0.8}
          >
            <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.submitButtonGradient}>
              {isSubmitting ? (
                <Text style={styles.submitButtonText}>Création...</Text>
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={18} color="white" />
                  <Text style={styles.submitButtonText}>Créer le compte</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  )
}

export default StepTwo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
 
   
  },
  header: {
    alignItems: "center",
    marginBottom: 28,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
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
    marginBottom: 6,
    fontFamily: "System",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  progressContainer: {
    flexDirection: "row",
    marginBottom: 32,
    gap: 8,
  },
  progressStepContainer: {
    flex: 1,
  },
  progressStep: {
    height: 6,
    borderRadius: 3,
  },
  formContainer: {
    marginBottom: 28,
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
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
  },
  backButton: {
    flex: 1,
    borderRadius: 14,
    overflow: "hidden",
  },
  backButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  backButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
   
  },
  submitButton: {
    flex: 2,
    borderRadius: 14,
    overflow: "hidden",
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
    fontSize: 16,
    fontWeight: "700",
    fontFamily: "System",
  },
})
