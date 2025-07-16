import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function ReservationQRCode() {
  const router = useRouter();
  const { id, status } = useLocalSearchParams();

  const isApproved = status === 'validé';

  if (!isApproved) {
    return (
      <View style={styles.blockedContainer}>
        <Text style={styles.blockedText}>
          🚫 Accès refusé : réservation non approuvée.
        </Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/screens/HistoryScreen')}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text style={styles.backText}>Retour à l'historique</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const qrData = `reservation_id_${id}_secure`;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background_app.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']}
          style={styles.gradient}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('/screens/HistoryScreen')}>
              <Ionicons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>QR Code Réservation</Text>
            <View style={{ width: 28 }} /> {/* placeholder pour alignement */}
          </View>

          {/* Contenu QR */}
          <View style={styles.content}>
            <QRCode value={qrData} size={240} />
            <Text style={styles.info}>
              Montrez ce code à l'entrée pour valider votre accès.
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  gradient: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
   // alignItems: 'center',
  },
  header: {
    width: '100%',
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    padding: 30,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#999',
    marginVertical:100
  },
  info: {
    color: '#ccc',
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
  },
  blockedContainer: {
    flex: 1,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  blockedText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#32CD32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  backText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});
