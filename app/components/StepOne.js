"use client"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import { LinearGradient } from "expo-linear-gradient"
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

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

const StepOne = ({ formData, handleInputChange, nextStep, currentStep, onLoginPress }) => {
  const validateStep = () => {
    if (!formData.userType) {
      Alert.alert("Erreur", "Veuillez sélectionner votre type d'utilisateur")
      return
    }
    if (!formData.fullName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre nom complet")
      return
    }
    if (!formData.email.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre email")
      return
    }
    if (formData.userType === "collaborateur" && !formData.matricule.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre matricule")
      return
    }
    if (formData.userType === "retraite" && !formData.rcar.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre numéro RCAR")
      return
    }
    nextStep()
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      {/* Card principale avec background uniforme */}
      <LinearGradient colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]} style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.iconContainer}>
            <Ionicons name="person-add" size={26} color="white" />
          </LinearGradient>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Étape 1 sur 2 - Informations personnelles</Text>
        </View>

        {/* Barre de progression */}
        <ProgressBar step={currentStep} />

        {/* Formulaire */}
        <View style={styles.formContainer}>
          {/* Type d'utilisateur */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type d'utilisateur *</Text>
            <View style={styles.pickerWrapper}>
              <Ionicons name="people-outline" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
              <Picker
                selectedValue={formData.userType}
                onValueChange={(value) => handleInputChange("userType", value)}
                dropdownIconColor="white"
                style={styles.picker}
              >
                <Picker.Item label="Sélectionner votre statut..." value="" />
                <Picker.Item label="Collaborateur actif" value="collaborateur" />
                <Picker.Item label="Retraité(e)" value="retraite" />
              </Picker>
            </View>
          </View>

          {/* Nom complet */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom complet *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Prénom et nom de famille"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.fullName}
                onChangeText={(text) => handleInputChange("fullName", text)}
              />
            </View>
          </View>

          {/* Matricule ou RCAR selon le type */}
          {formData.userType === "collaborateur" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numéro de matricule *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="card-outline" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 1234A5"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={formData.matricule}
                  onChangeText={(text) => handleInputChange("matricule", text)}
                  autoCapitalize="characters"
                />
              </View>
            </View>
          )}

          {formData.userType === "retraite" && (
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Numéro RCAR *</Text>
              <View style={styles.inputWrapper}>
                <Ionicons name="card-outline" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Ex: 123456789012"
                  placeholderTextColor="rgba(255, 255, 255, 0.5)"
                  value={formData.rcar}
                  onChangeText={(text) => handleInputChange("rcar", text)}
                  keyboardType="numeric"
                  maxLength={12}
                />
              </View>
            </View>
          )}

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse email *</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="votre.email@exemple.com"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.email}
                onChangeText={(text) => handleInputChange("email", text)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Téléphone */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de téléphone</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="+212 6XX XXX XXX"
                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                value={formData.phone}
                onChangeText={(text) => handleInputChange("phone", text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.continueButton} onPress={validateStep} activeOpacity={0.8}>
            <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.continueButtonGradient}>
              <Text style={styles.continueButtonText}>Continuer</Text>
              <Ionicons name="arrow-forward" size={18} color="white" />
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkLabel}>Déjà inscrit ?</Text>
            <TouchableOpacity onPress={onLoginPress} activeOpacity={0.7}>
              <Text style={styles.loginLinkText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  )
}

export default StepOne

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: 40,
  },
  card: {
    borderRadius: 24,
    padding:25,
    marginTop:40,
    marginHorizontal: 5,
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
  pickerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 16,
    minHeight: 52,
    overflow: "hidden",
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
  picker: {
    flex: 1,
    color: "white",
  },
  buttonContainer: {
    gap: 20,
  },
  continueButton: {
    borderRadius: 14,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#1FA739",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  continueButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  continueButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "System",
  },
  loginLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  loginLinkLabel: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontWeight: "500",
  },
  loginLinkText: {
    color: "#1FA739",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
})
