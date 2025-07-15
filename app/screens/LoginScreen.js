import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const LoginScreen = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    matricule: '',
    password: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onLoginPress = () => {
    console.log('Login with:', formData);
    
    router.push('/screens/HomeScreen');

  };
  

  const onForgotPasswordPress = () => {
    router.push('/reset-password');
  };
  

  const onCreateAccountPress = () => {
    router.push('/'); // Redirige vers le RegistrationStep1 (index = registration screen step1)
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
            <Text style={styles.title}>Connexion</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Matricule</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre matricule"
                placeholderTextColor="#9CA3AF"
                value={formData.matricule}
                onChangeText={(text) => handleInputChange('matricule', text)}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <TextInput
                style={styles.input}
                placeholder="Entrez votre mot de passe"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
              <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableWithoutFeedback onPress={onForgotPasswordPress}>
                <Text style={styles.linkText}>Mot de passe oublié ?</Text>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={onCreateAccountPress}>
                <Text style={[styles.linkText, styles.createAccount]}>Créer un compte</Text>
              </TouchableWithoutFeedback>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

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
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  inputGroup: { marginBottom: 16 },
  label: { color: 'white', fontSize: 14, marginBottom: 10 },
  input: {
    backgroundColor: 'rgba(39, 45, 53, 0.66)',
    color: 'white',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1FA739',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '400' },
  linksContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  linkText: {
    color: '#1FA739',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  createAccount: {
    fontWeight: '700',
  },
});
