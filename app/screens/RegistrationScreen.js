"use client"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useState } from "react"
import { ImageBackground, StatusBar, StyleSheet, View } from "react-native"
import StepOne from "../components/StepOne"
import StepTwo from "../components/StepTwo"

const RegistrationScreen = () => {
  const router = useRouter()

  const onLoginPress = () => {
    router.push("/login")
  }

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    userType: "",
    fullName: "",
    email: "",
    phone: "",
    matricule: "",
    rcar: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < 2) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Form data:", formData)
    // Ici tu peux ajouter la logique d'inscription
    router.push("/screens/HomeScreen")
  }

  const renderCurrentStep = () => {
    const commonProps = {
      formData,
      handleInputChange,
      nextStep,
      prevStep,
      currentStep,
    }

    switch (currentStep) {
      case 1:
        return <StepOne {...commonProps} onLoginPress={onLoginPress} />
      case 2:
        return <StepTwo {...commonProps} handleSubmit={handleSubmit} />
      default:
        return <StepOne {...commonProps} onLoginPress={onLoginPress} />
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
          {renderCurrentStep()}
        </LinearGradient>
      </ImageBackground>
    </View>
  )
}

export default RegistrationScreen

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  background: { flex: 1, justifyContent: "center", alignItems: "center" },
  gradient: { flex: 1, justifyContent: "center", width: "100%", paddingHorizontal: 20 },
})
