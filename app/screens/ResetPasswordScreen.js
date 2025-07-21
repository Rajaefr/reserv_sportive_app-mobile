"use client"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const ResetPasswordScreen = () => {
  const router = useRouter()
  const [contact, setContact] = useState("")
  const [isSending, setIsSending] = useState(false)
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState("")

  const handleSendCode = () => {
    if (!contact.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre email ou numéro de téléphone.")
      return
    }

    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      setCodeSent(true)
      Alert.alert("Succès", "Code envoyé avec succès.")
    }, 1500)
  }

  const handleConfirmCode = () => {
    if (!code.trim()) {
      Alert.alert("Erreur", "Veuillez entrer le code reçu.")
      return
    }
    Alert.alert("Succès", "Code confirmé, vous pouvez réinitialiser votre mot de passe.")
    router.push("/../screens/NewpasswordScreen")
  }

  const handleResendCode = () => {
    setIsSending(true)
    setTimeout(() => {
      setIsSending(false)
      Alert.alert("Succès", "Nouveau code envoyé.")
    }, 1500)
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
          <View style={styles.content}>
            {/* Card principale avec background uniforme */}
            <LinearGradient colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]} style={styles.card}>
              {/* Header */}
              <View style={styles.header}>
                <LinearGradient colors={["#f5780b", "#D97706"]} style={styles.iconContainer}>
                  <Ionicons name="key" size={28} color="white" />
                </LinearGradient>
                <Text style={styles.title}>Mot de passe oublié</Text>
                <Text style={styles.subtitle}>
                  {!codeSent
                    ? "Entrez votre email ou téléphone pour recevoir un code de récupération"
                    : "Entrez le code de vérification reçu"}
                </Text>
              </View>

              {/* Formulaire */}
              <View style={styles.formContainer}>
                {!codeSent ? (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email ou Téléphone</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color="rgba(255, 255, 255, 0.6)"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="votre.email@exemple.com ou +212..."
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        value={contact}
                        onChangeText={setContact}
                        keyboardType="email-address"
                        autoCapitalize="none"
                      />
                    </View>
                  </View>
                ) : (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Code de vérification</Text>
                    <View style={styles.inputWrapper}>
                      <Ionicons
                        name="shield-checkmark-outline"
                        size={20}
                        color="rgba(255, 255, 255, 0.6)"
                        style={styles.inputIcon}
                      />
                      <TextInput
                        style={styles.input}
                        placeholder="Entrez le code à 6 chiffres"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        value={code}
                        onChangeText={setCode}
                        keyboardType="number-pad"
                        maxLength={6}
                      />
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={!codeSent ? handleSendCode : handleConfirmCode}
                  disabled={isSending}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={["#f5780b", "#D97706"]} style={styles.actionButtonGradient}>
                    {isSending ? (
                      <Text style={styles.actionButtonText}>Envoi en cours...</Text>
                    ) : (
                      <>
                        <Ionicons name={!codeSent ? "send" : "checkmark-circle"} size={18} color="white" />
                        <Text style={styles.actionButtonText}>
                          {!codeSent ? "Envoyer le code" : "Confirmer le code"}
                        </Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                {/* Bouton renvoyer le code */}
                {codeSent && (
                  <TouchableOpacity
                    style={styles.resendButton}
                    onPress={handleResendCode}
                    disabled={isSending}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.resendText}>Renvoyer le code</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Retour à la connexion */}
              <TouchableOpacity onPress={() => router.back()} style={styles.backLink} activeOpacity={0.7}>
                <Ionicons name="arrow-back" size={16} color="rgba(255, 255, 255, 0.8)" />
                <Text style={styles.backText}>Retour à la connexion</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111827",
  },
  background: {
    flex: 1,
  },
  gradient: {
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
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
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
    shadowColor: "#f5780b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "System",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 8,
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
  actionButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 8,
    elevation: 4,
    shadowColor: "#f5780b",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  actionButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  actionButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "System",
  },
  resendButton: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 16,
  },
  resendText: {
    color: "#f5780b",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
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
