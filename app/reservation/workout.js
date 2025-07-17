// ReservationSalle.tsx complet et prêt à coller

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
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReservationSalle() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [mainPerson, setMainPerson] = useState({ reserveForSelf: false, gender: '', isActiveEmployee: false, name: '' });
  const [addSpouses, setAddSpouses] = useState(false);
  const [numSpouses, setNumSpouses] = useState(0);
  const [spouses, setSpouses] = useState([]);
  const [accessType, setAccessType] = useState('');
  const [spouseAccessType, setSpouseAccessType] = useState('');
  const [activityCode, setActivityCode] = useState('');
  const [importedFile, setImportedFile] = useState(null);

  const canContinue = () => {
    if (currentStep === 0) return mainPerson.reserveForSelf || addSpouses;
    if (currentStep === 1) {
      if (mainPerson.reserveForSelf && (!mainPerson.gender || !mainPerson.name.trim())) return false;
      if (!mainPerson.reserveForSelf && addSpouses && !mainPerson.gender) return false;
      if (!accessType || !activityCode.trim()) return false;
      if (addSpouses && !spouseAccessType) return false;
      if (addSpouses && numSpouses > 0 && !spouses.every(s => s.name.trim())) return false;
      return true;
    }
    return true;
  };

  const nextStep = () => {
    if (!canContinue()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs requis.');
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    Alert.alert('Succès', 'Votre réservation a été confirmée.');
    router.push('/home');
  };

  const pickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: false, quality: 1 });
    if (!result.canceled) setImportedFile(result);
  };

  const getAccessOptions = (gender, forSpouse = false) => {
    return forSpouse
      ? (gender === 'H' ? ['Femme', 'Mixte'] : ['Homme', 'Mixte'])
      : (gender === 'H' ? ['Homme', 'Mixte'] : ['Femme', 'Mixte']);
  };

  const renderStep0 = () => (
    <View style={styles.card}>
      <Text style={styles.title}>Paramètres de réservation</Text>
      <TouchableOpacity style={styles.checkbox} onPress={() => setMainPerson({ ...mainPerson, reserveForSelf: !mainPerson.reserveForSelf })}>
        <Ionicons name={mainPerson.reserveForSelf ? 'checkbox' : 'square-outline'} size={22} color="white" />
        <Text style={styles.optionText}>Réserver pour moi</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.checkbox} onPress={() => setAddSpouses(!addSpouses)}>
        <Ionicons name={addSpouses ? 'checkbox' : 'square-outline'} size={22} color="white" />
        <Text style={styles.optionText}>Ajouter des conjoints</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { width: '90%', alignSelf: 'center', opacity: canContinue() ? 1 : 0.5 }]} onPress={canContinue() ? nextStep : null}>
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.card}>
      {(mainPerson.reserveForSelf || addSpouses) && (
        <>
          <Text style={styles.label}>Genre :</Text>
          <View style={styles.row}>
            {['H', 'F'].map((g) => (
              <TouchableOpacity key={g} style={[styles.option, mainPerson.gender === g && styles.selectedOption]} onPress={() => setMainPerson({ ...mainPerson, gender: g })}>
                <Text style={styles.optionText}>{g === 'H' ? 'Homme' : 'Femme'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {mainPerson.reserveForSelf && (
        <>
          <TouchableOpacity style={styles.checkbox} onPress={() => setMainPerson({ ...mainPerson, isActiveEmployee: !mainPerson.isActiveEmployee })}>
            <Ionicons name={mainPerson.isActiveEmployee ? 'checkbox' : 'square-outline'} size={22} color="white" />
            <Text style={styles.optionText}>Employé Actif</Text>
          </TouchableOpacity>
          <TextInput placeholder="Nom complet" placeholderTextColor="#ccc" style={styles.input} value={mainPerson.name} onChangeText={(text) => setMainPerson({ ...mainPerson, name: text })} />
        </>
      )}
      {mainPerson.gender && (
        <>
          <Text style={styles.label}>Type d’accès :</Text>
          <View style={styles.row}>
            {getAccessOptions(mainPerson.gender).map((type) => (
              <TouchableOpacity key={type} style={[styles.option, accessType === type && styles.selectedOption]} onPress={() => setAccessType(type)}>
                <Text style={styles.optionText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {addSpouses && (
        <>
          <Text style={styles.label}>Nombre de conjoints :</Text>
          <TextInput placeholder="0" placeholderTextColor="#ccc" keyboardType="numeric" style={styles.input} value={String(numSpouses)} onChangeText={(val) => {
            const maxSpouses = mainPerson.gender === 'H' ? 2 : 1;
            const n = Math.min(parseInt(val) || 0, maxSpouses);
            setNumSpouses(n);
            setSpouses(Array.from({ length: n }, (_, i) => spouses[i] || { name: '' }));
          }} />
          {spouses.map((sp, idx) => (
            <TextInput key={idx} placeholder={`Nom complet conjoint ${idx + 1}`} placeholderTextColor="#ccc" style={styles.input} value={sp.name} onChangeText={(text) => {
              const updated = [...spouses];
              updated[idx] = { name: text };
              setSpouses(updated);
            }} />
          ))}
          {mainPerson.gender && (
            <>
              <Text style={styles.label}>Type d’accès (Conjoints) :</Text>
              <View style={styles.row}>
                {getAccessOptions(mainPerson.gender, true).map((type) => (
                  <TouchableOpacity key={type} style={[styles.option, spouseAccessType === type && styles.selectedOption]} onPress={() => setSpouseAccessType(type)}>
                    <Text style={styles.optionText}>{type}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </>
      )}
      <Text style={styles.label}>Code de l’activité :</Text>
      <TextInput placeholder="Code activité" placeholderTextColor="#ccc" style={styles.input} value={activityCode} onChangeText={setActivityCode} />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.secondaryButton, { flex: 1, marginRight: 6 }]} onPress={prevStep}>
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 6, opacity: canContinue() ? 1 : 0.5 }]} onPress={canContinue() ? nextStep : null}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStep2 = () => {
    const totalPersons = (mainPerson.reserveForSelf ? 1 : 0) + numSpouses;
    const totalAmount = totalPersons * 50;
    return (
      <View style={styles.card}>
        <Text style={styles.title}>Récapitulatif</Text>
        <Text style={styles.label}>RIB : 123 456 789 000</Text>
        <Text style={styles.label}>Montant à payer : {totalAmount} DH</Text>
        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText}>Importer le reçu</Text>
        </TouchableOpacity>
        {importedFile && (
          <Text style={{ color: 'white', textAlign: 'center', marginTop: 6 }}>
            Reçu : {importedFile.assets?.[0]?.uri?.split('/').pop()}
          </Text>
        )}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.secondaryButton, { flex: 1, marginRight: 6 }]} onPress={prevStep}>
            <Text style={styles.buttonText}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 6 }]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={require('../../assets/images/background_app.jpg')} style={{ flex: 1 }}>
      <LinearGradient colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <TouchableOpacity onPress={router.back} style={styles.headerIcon}>
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Réservation Salle</Text>
          </View>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            {currentStep === 0 && renderStep0()}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 16, padding: 20, marginVertical: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  label: { color: 'white', fontSize: 15, marginBottom: 6 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', padding: 10, marginBottom: 10 },
  option: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, flex: 0.48, alignItems: 'center', justifyContent: 'center' },
  selectedOption: { backgroundColor: '#32CD32' },
  optionText: { color: 'white', fontSize: 16 },
  checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  button: { backgroundColor: '#32CD32', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  secondaryButton: { backgroundColor: 'rgba(255,255,255,0.1)', paddingVertical: 12, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#32CD32', marginVertical: 10 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  buttonRow: { flexDirection: 'row', marginTop: 20 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 20, paddingBottom: 12 },
  headerIcon: { marginRight: 12 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 12 },
});
