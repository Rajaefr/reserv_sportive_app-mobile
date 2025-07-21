"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useRouter } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getUnreadNotificationCount } from "../utils/notifications"

const Header = ({ title, showNotification = true, router: propRouter, subtitle }) => {
  const router = useRouter()
  const unreadCount = getUnreadNotificationCount()
  const finalRouter = propRouter || router

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      {showNotification && (
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => finalRouter.push("/screens/NotificationScreen")}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={["rgba(255, 255, 255, 0.15)", "rgba(255, 255, 255, 0.08)"]}
            style={styles.notificationGradient}
          >
            <Ionicons name="notifications-outline" size={24} color="white" />
            {unreadCount > 0 && (
              <View style={styles.badgeContainer}>
                <View style={styles.badgeOuterShadow}>
                  <View style={styles.badgeOutline}>
                    <LinearGradient colors={["#FF1744", "#D50000"]} style={styles.badge}>
                      <Text style={styles.badgeText}>{unreadCount > 99 ? "99+" : unreadCount}</Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 32,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: 0.5,
    fontFamily: "System",
    marginBottom: 2,
  },
  subtitle: {
    color: "rgba(255, 255, 255, 0.6)",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.2,
  },
  notificationButton: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  notificationGradient: {
    width: 68,
    height: 58,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    position: "relative",
  },
  badgeContainer: {
    position: "absolute",
    top: 2,
    right: 4,
    zIndex: 10,
  },
  badgeOuterShadow: {
    elevation: 12,
    shadowColor: "#FF0000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    borderRadius: 16,
  },
  badgeOutline: {
    padding: 3,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
   
  },
  badge: {
    minWidth: 13,
    height: 13,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    elevation: 6,
    shadowColor: "#FF0000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.9)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    letterSpacing: 0.3,
  },
})

export default Header
