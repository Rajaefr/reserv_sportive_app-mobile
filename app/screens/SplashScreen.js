"use client"

import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { useEffect, useRef } from "react"
import { Animated, Easing, Image, ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native"

export default function SplashScreen() {
  const router = useRouter()

  // Animations pour le logo
  const logoScale = useRef(new Animated.Value(0.3)).current
  const logoOpacity = useRef(new Animated.Value(0)).current
  const logoRotate = useRef(new Animated.Value(0)).current

  // Animations pour les textes
  const textOpacity = useRef(new Animated.Value(0)).current
  const textTranslateY = useRef(new Animated.Value(50)).current

  // Animation pour la card du logo
  const cardScale = useRef(new Animated.Value(0.8)).current
  const cardOpacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Séquence d'animations
    Animated.sequence([
      // 1. Apparition de la card
      Animated.parallel([
        Animated.timing(cardOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(cardScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.back(1.2)),
          useNativeDriver: true,
        }),
      ]),

      // 2. Apparition du logo avec rotation
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.back(1.1)),
          useNativeDriver: true,
        }),
        Animated.timing(logoRotate, {
          toValue: 1,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),

      // 3. Apparition des textes
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(textTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Délai avant redirection
      setTimeout(() => {
        router.replace("/screens/LoginScreen")
      }, 1200)
    })
  }, [])

  const rotateInterpolate = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })

  return (
    <ImageBackground
      source={require("../../assets/images/background_app.jpg")}
      resizeMode="cover"
      style={styles.background}
    >
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={styles.gradient}>
        <StatusBar barStyle="light-content" backgroundColor="#111827" />

        {/* Container principal */}
        <View style={styles.container}>
          {/* Card du logo */}
          <Animated.View
            style={[
              styles.logoCard,
              {
                opacity: cardOpacity,
                transform: [{ scale: cardScale }],
              },
            ]}
          >
            <LinearGradient
              colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]}
              style={styles.cardGradient}
            >
              <Animated.View
                style={[
                  styles.logoContainer,
                  {
                    opacity: logoOpacity,
                    transform: [{ scale: logoScale }, { rotate: rotateInterpolate }],
                  },
                ]}
              >
                <Image source={require("../../assets/images/logo.png")} style={styles.logo} resizeMode="contain" />
              </Animated.View>
            </LinearGradient>
          </Animated.View>

          {/* Textes */}
          <Animated.View
            style={[
              styles.textContainer,
              {
                opacity: textOpacity,
                transform: [{ translateY: textTranslateY }],
              },
            ]}
          >
            <Text style={styles.mainTitle}>Office Chérifien des Phosphates</Text>
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <View style={styles.dividerDot} />
              <View style={styles.dividerLine} />
            </View>
            <Text style={styles.subtitle}>Khouribga</Text>
          </Animated.View>

          {/* Indicateur de chargement */}
          <Animated.View
            style={[
              styles.loadingContainer,
              {
                opacity: textOpacity,
              },
            ]}
          >
            <View style={styles.loadingBar}>
              <LinearGradient colors={["#1FA739", "#22C55E"]} style={styles.loadingFill} />
            </View>
            <Text style={styles.loadingText}>Chargement...</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  logoCard: {
    borderRadius: 24,
    padding: 4,
    marginBottom: 60,
   
  },
  cardGradient: {
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 80,
  },
  mainTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 0.5,
    fontFamily: "System",
    lineHeight: 28,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    width: 40,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
  },
  dividerDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1FA739",
    marginHorizontal: 12,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "System",
  },
  loadingContainer: {
    position: "absolute",
    bottom: 80,
    alignItems: "center",
    width: "100%",
  },
  loadingBar: {
    width: 200,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 12,
  },
  loadingFill: {
    height: "100%",
    width: "70%",
    borderRadius: 2,
  },
  loadingText: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
})
