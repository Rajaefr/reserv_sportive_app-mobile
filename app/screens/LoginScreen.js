"use client"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import { Alert, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"

const LoginScreen = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    matricule: "",
    password: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const onLoginPress = async () => {
    if (!formData.matricule || !formData.password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      console.log("Login with:", formData)
      router.push("/screens/HomeScreen")
    }, 1500)
  }

  const onForgotPasswordPress = () => {
    router.push("/reset-password")
  }

  const onCreateAccountPress = () => {
    router.push("../screens/RegistrationScreen")
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
              {/* Header avec icône et titre */}
              <View style={styles.header}>
                <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.iconContainer}>
                  <Ionicons name="person" size={28} color="white" />
                </LinearGradient>
                <Text style={styles.title}>Connexion</Text>
                <Text style={styles.subtitle}>Accédez à votre espace personnel</Text>
              </View>

              {/* Formulaire */}
              <View style={styles.formContainer}>
                {/* Matricule */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Matricule</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons name="card-outline" size={20} color="rgba(255, 255, 255, 0.6)" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Entrez votre matricule"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      value={formData.matricule}
                      onChangeText={(text) => handleInputChange("matricule", text)}
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                {/* Mot de passe */}
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Mot de passe</Text>
                  <View style={styles.inputWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="rgba(255, 255, 255, 0.6)"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Entrez votre mot de passe"
                      placeholderTextColor="rgba(255, 255, 255, 0.5)"
                      secureTextEntry={!showPassword}
                      value={formData.password}
                      onChangeText={(text) => handleInputChange("password", text)}
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
                </View>

                {/* Bouton de connexion */}
                <TouchableOpacity
                  style={styles.loginButton}
                  onPress={onLoginPress}
                  disabled={isLoading}
                  activeOpacity={0.8}
                >
                  <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.loginButtonGradient}>
                    {isLoading ? (
                      <Text style={styles.loginButtonText}>Connexion...</Text>
                    ) : (
                      <>
                        <Ionicons name="log-in-outline" size={20} color="white" />
                        <Text style={styles.loginButtonText}>Se connecter</Text>
                      </>
                    )}
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              {/* Liens */}
              <View style={styles.linksContainer}>
                <TouchableOpacity onPress={onForgotPasswordPress} activeOpacity={0.7} style={styles.linkButton}>
                  <Text style={styles.linkText}>Mot de passe oublié ?</Text>
                </TouchableOpacity>

                <View style={styles.divider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>ou</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity onPress={onCreateAccountPress} activeOpacity={0.7} style={styles.createAccountButton}>
                  <LinearGradient
                    colors={["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.05)"]}
                    style={styles.createAccountGradient}
                  >
                    <Ionicons name="person-add-outline" size={18} color="#1FA739" />
                    <Text style={styles.createAccountText}>Créer un compte</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default LoginScreen

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
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 6,
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 15,
    fontWeight: "500",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
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
  loginButton: {
    borderRadius: 14,
    overflow: "hidden",
    marginTop: 8,
    elevation: 4,
    shadowColor: "#1FA739",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  loginButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    gap: 8,
  },
  loginButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    fontFamily: "System",
  },
  linksContainer: {
    width: "100%",
    gap: 16,
  },
  linkButton: {
    alignItems: "center",
    paddingVertical: 8,
  },
  linkText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dividerText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 12,
    fontWeight: "500",
    marginHorizontal: 16,
  },
  createAccountButton: {
    borderRadius: 14,
    overflow: "hidden",
  },
  createAccountGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    gap: 8,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  createAccountText: {
    color: "#1FA739",
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "System",
  },
})
