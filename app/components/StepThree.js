import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ProgressBar = ({ step }) => (
  <View style={styles.progressContainer}>
    {[1, 2].map((stepNum) => (
      <View key={stepNum} style={styles.progressStepContainer}>
        <View
          style={[
            styles.progressStep,
            { backgroundColor: stepNum <= step ? '#32CD32' : 'rgba(39, 45, 53, 0.76)' },
          ]}
        />
      </View>
    ))}
  </View>
);

const StepThree = ({ formData, handleInputChange, handleSubmit, currentStep, prevStep }) => {
  return (
    <View style={styles.flexOne}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Étape 2 de 2</Text>
          <ProgressBar step={currentStep} />

          <Text style={styles.title}>Définir le Mot de Passe</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Entrez votre mot de passe"
              placeholderTextColor="#9CA3AF"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirmer le mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirmer votre mot de passe"
              placeholderTextColor="#9CA3AF"
              value={formData.confirmPassword}
              onChangeText={(text) => handleInputChange('confirmPassword', text)}
              secureTextEntry
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
              <Text style={styles.buttonText}>Retour</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Créer le Compte</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default StepThree;

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  container: { justifyContent: 'center', paddingHorizontal: 14, paddingVertical: 72, marginTop: 130 },
  card: { backgroundColor: 'rgba(39, 45, 53, 0.5)', borderRadius: 16, padding: 34, marginHorizontal: 16 },
  title: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 24 },
  inputGroup: { marginBottom: 16 },
  label: { color: 'white', fontSize: 14, marginBottom: 8 },
  input: {
    backgroundColor: 'rgba(39, 45, 53, 0.66)',
    color: 'white',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: '#32CD32',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    flex: 0.58,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
    flex: 0.28,
    borderWidth: 1,
    borderColor: '#32CD32',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '400' },
  progressContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 44 },
  progressStepContainer: { flex: 1, marginHorizontal: 5 },
  progressStep: { height: 2, borderRadius: 9999 },
});
