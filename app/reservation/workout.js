import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ImageBackground,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function ReservationWorkout() {
  const router = useRouter();

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedType, setSelectedType] = useState(null); // homme, femme, mixte
  const [activityCode, setActivityCode] = useState('');
  const [step, setStep] = useState(1);
  const [receipt, setReceipt] = useState(null);

  const slots = ['Mardi 18:00 - 19:30', 'Jeudi 18:00 - 19:30', 'Samedi 10:00 - 11:30'];
  const tauxPaiement = '50 MAD';
  const rib = 'RIB : 123 456 789 000 001 (Banque OCP)';

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setReceipt(result.assets[0]);
  };

  const handleStepOne = () => {
    if (!selectedSlot || !selectedType || !activityCode) {
      Alert.alert('Erreur', 'Veuillez remplir toutes les informations.');
      return;
    }
    setStep(2);
  };

  const handleSubmitFinal = () => {
    if (!receipt) {
      Alert.alert('Erreur', 'Veuillez importer un reçu de paiement.');
      return;
    }
    Alert.alert('Succès', 'Votre réservation a été enregistrée et est en attente de validation.');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ImageBackground
        source={require('../../assets/images/background_app.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient colors={['rgba(34, 39, 34, 0.31)', 'rgba(147, 148, 150, 0.32)']} style={styles.gradient}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={26} color="white" />
          </TouchableOpacity>

          <Text style={styles.title}>Réserver Salle Workout</Text>
          <ScrollView contentContainerStyle={styles.content}>

            {step === 1 && (
              <>
                <Text style={styles.label}>Sélectionnez un créneau :</Text>
                {slots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.slot, selectedSlot === index && styles.selectedSlot]}
                    onPress={() => setSelectedSlot(index)}
                  >
                    <Text style={styles.slotText}>{slot}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={styles.label}>Type d’accès :</Text>
                <View style={styles.row}>
                  {['Homme', 'Femme', 'Mixte'].map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.option,
                        selectedType === type && styles.optionSelected
                      ]}
                      onPress={() => setSelectedType(type)}
                    >
                      <Text style={styles.optionText}>{type}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.label}>Code de l’activité (ex : C01-1) :</Text>
                <TextInput
                  placeholder="C00i-i"
                  placeholderTextColor="#ccc"
                  style={styles.input}
                  value={activityCode}
                  onChangeText={setActivityCode}
                />

                <TouchableOpacity style={styles.button} onPress={handleStepOne}>
                  <Text style={styles.buttonText}>Continuer</Text>
                </TouchableOpacity>
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.label}> Montant à payer :</Text>
                <Text style={styles.infoBox}>{tauxPaiement}</Text>

                <Text style={styles.label}> Informations de paiement :</Text>
                <Text style={styles.infoBox}>{rib}</Text>

                <Text style={styles.label}> Importer le reçu de paiement :</Text>
                <TouchableOpacity style={styles.buttonSmall} onPress={pickImage}>
                  <Text style={styles.buttonText}>{receipt ? 'Changer le reçu' : 'Choisir un fichier'}</Text>
                </TouchableOpacity>
                {receipt && <Text style={styles.receiptName}>{receipt.fileName || 'Reçu sélectionné'}</Text>}

                <TouchableOpacity style={styles.button} onPress={handleSubmitFinal}>
                  <Text style={styles.buttonText}>Soumettre la demande</Text>
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { flex: 1 },
  gradient: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  backButton: { position: 'absolute', top: 50, left: 20 },
  title: {
    color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center'
  },
  content: { paddingBottom: 100 },
  label: { color: '#d1d5db', marginBottom: 8, marginTop: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  option: {
    flex: 1, marginHorizontal: 5, backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 10, borderRadius: 10, alignItems: 'center'
  },
  optionSelected: { backgroundColor: '#32CD32' },
  optionText: { color: 'white' },
  slot: {
    backgroundColor: 'rgba(255,255,255,0.1)', padding: 15,
    borderRadius: 10, marginBottom: 10
  },
  selectedSlot: { backgroundColor: '#32CD32' },
  slotText: { color: 'white', textAlign: 'center' },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10,
    padding: 10, color: 'white', marginBottom: 10
  },
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12, borderRadius: 8, color: 'white', marginBottom: 10
  },
  button: {
    backgroundColor: '#32CD32', padding: 15,
    borderRadius: 10, alignItems: 'center', marginTop: 20
  },
  buttonSmall: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 10, borderRadius: 10, alignItems: 'center'
  },
  buttonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  receiptName: { color: '#ccc', marginTop: 6, fontStyle: 'italic' },
});
