import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ProgressBar = ({ step }) => (
  <View style={styles.progressContainer}>
    {[1, 2].map((stepNum) => (
      <View key={stepNum} style={styles.progressStepContainer}>
        <View
          style={[
            styles.progressStep,
            { backgroundColor: stepNum <= step ? '#32CD32' : 'rgba(66, 67, 66, 0.52)' },
          ]}
        />
      </View>
    ))}
  </View>
);

const StepOne = ({ formData, handleInputChange, nextStep, currentStep, onLoginPress }) => {
  return (
    <View style={styles.flexOne}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Étape 1 de 2</Text>
          <ProgressBar step={currentStep} />

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nom Complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom complet"
              placeholderTextColor="#9CA3AF"
              value={formData.fullName}
              onChangeText={(text) => handleInputChange('fullName', text)}
            />
          </View>
          <View style={styles.inputGroup}>
  <Text style={styles.label}>Numéro de Matricule</Text>
  <TextInput
    style={styles.input}
    placeholder="Ex: 123456"
    placeholderTextColor="#9CA3AF"
    value={formData.matricule}
    onChangeText={(text) => handleInputChange('matricule', text)}
    keyboardType="numeric"
  />
</View>


          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Email Address"
              placeholderTextColor="#9CA3AF"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Numéro de Téléphone</Text>
            <TextInput
              style={styles.input}
              placeholder="+212"
              placeholderTextColor="#9CA3AF"
              value={formData.phone}
              onChangeText={(text) => handleInputChange('phone', text)}
              keyboardType="phone-pad"
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={nextStep}>
            <Text style={styles.buttonText}>Continuer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={onLoginPress}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  container: { justifyContent: 'center', paddingVertical: 72, marginTop: 130 },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.31)',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: '#999',
  },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { color: 'white', fontSize: 14, marginBottom: 10 },
  input: {
    backgroundColor: 'rgba(66, 67, 66, 0.52)',
    color: 'white',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: '#32CD32',
    backgroundColor: 'rgba(66, 67, 66, 0.52)',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '400' },
  progressContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 44 },
  progressStepContainer: { flex: 1, marginHorizontal: 5 },
  progressStep: { height: 4, borderRadius: 9999 },
});
