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

const ResetPasswordScreen = () => {
  const router = useRouter();

  const [contact, setContact] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');

  const handleSendCode = () => {
    if (!contact) {
      Alert.alert('Erreur', 'Veuillez entrer votre email ou numéro de téléphone.');
      return;
    }

    setIsSending(true);
    // Simule l'envoi d'un code
    setTimeout(() => {
      setIsSending(false);
      setCodeSent(true);
      Alert.alert('Succès', 'Code envoyé avec succès.');
    }, 1500);
  };

  const handleConfirmCode = () => {
    if (!code) {
      Alert.alert('Erreur', 'Veuillez entrer le code reçu.');
      return;
    }

    // Simule la confirmation
    Alert.alert('Succès', 'Code confirmé, vous pouvez réinitialiser votre mot de passe.');

    // Redirige vers une page de définition du nouveau mot de passe ou retour à login
    router.push('/login'); // ou router.push('/reset-password/new') si tu crées cette étape
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ImageBackground
        source={require('../../assets/images/background_app.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(34, 39, 34, 0.31)', 'rgba(147, 148, 150, 0.32)']}
          style={styles.gradient}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Réinitialisation du mot de passe</Text>

            {!codeSent ? (
              <>
                <Text style={styles.label}>
                 E-mail/numéro de téléphone :
                </Text>
                <TextInput
                  style={styles.input}
                  placeholder="Email ou téléphone"
                  placeholderTextColor="#9CA3AF"
                  value={contact}
                  onChangeText={setContact}
                  keyboardType="email-address"
                />

                <TouchableOpacity style={styles.button} onPress={handleSendCode} disabled={isSending}>
                  <Text style={styles.buttonText}>
                    {isSending ? 'Envoi...' : 'Envoyer le code'}
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.label}>Entrez le code reçu :</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Code de vérification"
                  placeholderTextColor="#9CA3AF"
                  value={code}
                  onChangeText={setCode}
                  keyboardType="number-pad"
                />

                <TouchableOpacity style={styles.button} onPress={handleConfirmCode}>
                  <Text style={styles.buttonText}>Confirmer le code</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  gradient: { flex: 1, justifyContent: 'center', width: '100%', paddingHorizontal: 16 },
  card: {
    backgroundColor: 'rgba(39, 45, 53, 0.5)',
    borderRadius: 16,
    padding: 34,
    marginHorizontal: 16,
  },
  title: { color: 'white', fontSize: 18, fontWeight: '500', marginBottom: 34, textAlign: 'center' },
  label: { color: 'white', fontSize: 14, marginBottom: 10 },
  input: {
    backgroundColor: 'rgba(39, 45, 53, 0.66)',
    color: 'white',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '400' },
});
