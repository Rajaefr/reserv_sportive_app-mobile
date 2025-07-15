import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ImageBackground,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FloatingTabBar from '../components/FloatingTabBar';

export default function Parametres() {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+212 612345678',
    matricule: 'A789456', // Champ ajouté ici
  });

  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');

  const handleEdit = (field) => {
    setEditField(field);
    setTempValue(userInfo[field]);
  };

  const handleSave = () => {
    setUserInfo({ ...userInfo, [editField]: tempValue });
    setEditField(null);
  };

  const handleResetPassword = () => {
    router.push('/screens/ResetPasswordScreen');
  };

  const handleLogout = () => {
    Alert.alert(
      "Se déconnecter",
      "Êtes-vous sûr de vouloir vous déconnecter ?",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Déconnecter", onPress: () => router.push('/login'), style: "destructive" }
      ]
    );
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background_app.jpg')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <LinearGradient colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']} style={{ flex: 1 }}>
        <SafeAreaView style={styles.safeContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#111827" />

          <View style={styles.header}>
            <Text style={styles.title}>Paramètres</Text>
            <View style={styles.notificationIcon}>
              <Ionicons name="notifications-outline" size={26} color="white" />
              <View style={styles.badge} />
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Informations de l'utilisateur</Text>

              {['name', 'email', 'phone'].map((field) => (
                <View key={field} style={styles.infoRow}>
                  {editField === field ? (
                    <>
                      <TextInput
                        style={styles.input}
                        value={tempValue}
                        onChangeText={setTempValue}
                        placeholderTextColor="#aaa"
                      />
                      <TouchableOpacity onPress={handleSave}>
                        <Ionicons name="checkmark" size={24} color="#1FA739" />
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.infoLabel}>
                          {field === 'name' ? 'Nom' : field === 'email' ? 'Email' : 'Téléphone'}
                        </Text>
                        <Text style={styles.infoText}>{userInfo[field]}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleEdit(field)}>
                        <Ionicons name="create-outline" size={22} color="white" />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              ))}

              {/* Champ matricule non modifiable */}
              <View style={styles.infoRow}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Numéro de Matricule</Text>
                  <Text style={styles.infoText}>{userInfo.matricule}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.actionButton} onPress={handleResetPassword}>
              <Text style={styles.buttonText}>Modifier le mot de passe</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.buttonText}>Se déconnecter</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
      <FloatingTabBar />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1 },
  header: {
    marginTop: 30,
    marginBottom: 40,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notificationIcon: { position: 'relative' },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 10,
    height: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  body: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderRadius: 16,
    padding: 20,
    marginTop: 50,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#999',

  },
  cardTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#999',
    paddingVertical: 12,
  },
  infoLabel: {
    color: '#aaa',
    fontSize: 13,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.08)',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
    marginRight: 10,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#999',
  },
  logoutButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.19)',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    borderWidth: 2,
    borderColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
