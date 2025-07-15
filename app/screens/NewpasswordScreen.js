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

export default function NewPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = () => {
    if (!password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    // Tu peux ici appeler Firebase ou ton API pour changer le mot de passe
    Alert.alert('Succès', 'Mot de passe mis à jour', [
      { text: 'OK', onPress: () => router.replace('/login') },
    ]);

    router.push('/LoginScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background_app.jpg')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <LinearGradient colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']} style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#111827" />
          <View style={styles.card}>
            <Text style={styles.title}>Nouveau mot de passe</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez un nouveau mot de passe"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Confirmez votre mot de passe"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.31)',
    borderRadius: 16,
    padding: 24,
  },
  title: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(66, 67, 66, 0.52)',
    color: 'white',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
