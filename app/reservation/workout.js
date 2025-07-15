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

const slotOptions = {
  Homme: ["Lundi 15h - Vendredi 10h", "Mardi 14h - Jeudi 08h", "Samedi 10h - Dimanche 10h"],
  Femme: ["Lundi 10h - Mercredi 16h", "Mardi 12h - Jeudi 09h", "Samedi 09h - Dimanche 09h"],
  Enfant: ["Samedi 10h - Dimanche 10h", "Samedi 11h - Dimanche 09h"],
  Employe_Actif: ["Tous les jours 06h", "Tous les jours 22h"],
};

export default function ReservationPiscine() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [mainPerson, setMainPerson] = useState({ reserveForSelf: false, gender: '', isEmployee: false, isActiveEmployee: false, name: '' });
  const [numSpouses, setNumSpouses] = useState(0);
  const [spouses, setSpouses] = useState([]);
  const [numChildren, setNumChildren] = useState(0);
  const [children, setChildren] = useState([]);
  const [groupSlots, setGroupSlots] = useState({});
  const [accessType, setAccessType] = useState('');
  const [activityCode, setActivityCode] = useState('');
  const [importedFile, setImportedFile] = useState(null);
  const [price, setPrice] = useState(0);

  const canContinue = () => {
    if (currentStep === 1) return mainPerson.reserveForSelf || numSpouses > 0 || numChildren > 0;
    return true;
  };

  const nextStep = () => {
    if (!accessType || !activityCode.trim()) {
      Alert.alert("Erreur", "Veuillez renseigner le type d’accès et le code de l’activité.");
      return;
    }
    if (mainPerson.reserveForSelf && !mainPerson.name.trim()) {
      Alert.alert("Erreur", "Veuillez entrer votre nom complet pour la réservation.");
      return;
    }
    for (let i = 0; i < numSpouses; i++) {
      if (!spouses[i] || !spouses[i].name.trim()) {
        Alert.alert("Erreur", `Veuillez entrer le nom complet du conjoint ${i + 1}.`);
        return;
      }
    }
    for (let i = 0; i < numChildren; i++) {
      if (!children[i] || !children[i].name.trim()) {
        Alert.alert("Erreur", `Veuillez entrer le nom complet de l'enfant ${i + 1}.`);
        return;
      }
    }
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };
  const handleSubmit = () => { Alert.alert("Succès", "Votre réservation a été envoyée."); router.push('/home'); };

  const pickDocument = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.All, allowsEditing: false, quality: 1 });
    if (!result.cancelled) setImportedFile(result);
  };

  const renderStepOne = () => (
    <View>
     
      <Text style={styles.label}>Genre :</Text>
      <View style={styles.row}>
        {['H', 'F'].map((g) => (
          <TouchableOpacity key={g} onPress={() => { setMainPerson({ ...mainPerson, gender: g }); setNumSpouses(0); setSpouses([]); }} style={[styles.option, mainPerson.gender === g && styles.selectedOption]}>
            <Text style={styles.optionText}>{g === 'H' ? 'Homme' : 'Femme'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {mainPerson.gender === 'F' && (
        <TouchableOpacity style={styles.checkbox} onPress={() => setMainPerson({ ...mainPerson, isEmployee: !mainPerson.isEmployee })}>
          <Ionicons name={mainPerson.isEmployee ? 'checkbox' : 'square-outline'} size={20} color="white" />
          <Text style={styles.optionText}>Employée OCP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.checkbox} onPress={() => setMainPerson({ ...mainPerson, reserveForSelf: !mainPerson.reserveForSelf })}>
        <Ionicons name={mainPerson.reserveForSelf ? 'checkbox' : 'square-outline'} size={20} color="white" />
        <Text style={styles.optionText}>Réserver pour moi-même</Text>
      </TouchableOpacity>

      {mainPerson.reserveForSelf && (
        <>
          <TouchableOpacity style={styles.checkbox} onPress={() => setMainPerson({ ...mainPerson, isActiveEmployee: !mainPerson.isActiveEmployee })}>
            <Ionicons name={mainPerson.isActiveEmployee ? 'checkbox' : 'square-outline'} size={20} color="white" />
            <Text style={styles.optionText}>Employé Actif (24/24)</Text>
          </TouchableOpacity>
          <TextInput placeholder="Nom complet" placeholderTextColor="#aaa" style={styles.input} value={mainPerson.name} onChangeText={(text) => setMainPerson({ ...mainPerson, name: text })} />
        </>
      )}

      {mainPerson.gender && (
        <>
          <Text style={styles.label}>Nombre de conjoints (max {mainPerson.gender === 'H' ? '2' : '1'})</Text>
          <TextInput keyboardType="numeric" style={styles.input} placeholder="0" placeholderTextColor="#aaa" value={String(numSpouses)} onChangeText={(val) => {
            let n = parseInt(val) || 0;
            n = mainPerson.gender === 'H' ? Math.min(n, 2) : Math.min(n, 1);
            setNumSpouses(n);
            setSpouses(Array.from({ length: n }, (_, i) => spouses[i] || { name: '' }));
          }} />
          {spouses.map((sp, idx) => (
            <TextInput key={idx} placeholder={`Nom complet conjoint ${idx + 1}`} placeholderTextColor="#aaa" style={styles.input} value={sp.name} onChangeText={(text) => {
              const updated = [...spouses];
              updated[idx] = { name: text };
              setSpouses(updated);
            }} />
          ))}
        </>
      )}

      <Text style={styles.label}>Nombre d'enfants :</Text>
      <TextInput keyboardType="numeric" style={styles.input} placeholder="0" placeholderTextColor="#aaa" value={String(numChildren)} onChangeText={(val) => {
        let n = parseInt(val) || 0;
        n = Math.min(n, 7);
        setNumChildren(n);
        setChildren(Array.from({ length: n }, (_, i) => children[i] || { name: '' }));
      }} />
      {children.map((child, idx) => (
        <TextInput key={idx} placeholder={`Nom complet enfant ${idx + 1}`} placeholderTextColor="#aaa" style={styles.input} value={child.name} onChangeText={(text) => {
          const updated = [...children];
          updated[idx] = { name: text };
          setChildren(updated);
        }} />
      ))}

      <Text style={styles.label}>Type d’accès :</Text>
      <View style={styles.row}>
        {['Homme', 'Femme', 'Mixte'].map((type) => (
          <TouchableOpacity key={type} style={[styles.option, accessType === type && styles.selectedOption]} onPress={() => setAccessType(type)}>
            <Text style={styles.optionText}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Code de l’activité :</Text>
      <TextInput placeholder="C00i-i" placeholderTextColor="#ccc" style={styles.input} value={activityCode} onChangeText={setActivityCode} />
    </View>
  );

  const renderStepTwo = () => {
    const groups = [];
    if (mainPerson.reserveForSelf) groups.push(mainPerson.isActiveEmployee ? 'Employe_Actif' : (mainPerson.gender === 'H' ? 'Homme' : 'Femme'));
    if (numSpouses > 0) groups.push('Femme');
    if (numChildren > 0) groups.push('Enfant');
    const calculatedPrice = groups.length * 50;
    if (price !== calculatedPrice) setPrice(calculatedPrice);

    return (
      <View>
        <Text style={styles.title}>Récapitulatif</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Code activité : {activityCode}</Text>
          <Text style={styles.cardText}>Type d’accès : {accessType}</Text>
          {mainPerson.reserveForSelf && <Text style={styles.cardText}>Moi : {mainPerson.name}</Text>}
          {spouses.map((sp, i) => <Text key={i} style={styles.cardText}>Conjoint {i + 1} : {sp.name}</Text>)}
          {children.map((ch, i) => <Text key={i} style={styles.cardText}>Enfant {i + 1} : {ch.name}</Text>)}
          {groups.map((g, i) => (
            <Text key={i} style={styles.cardText}>{g} : {groupSlots[g] || "Aucun créneau choisi"}</Text>
          ))}
        </View>

        <Text style={[styles.label, { marginTop: 10 }]}>Montant estimé : <Text style={{ color: '#1FA739', fontWeight: 'bold' }}>{price} DH</Text></Text>

        <TouchableOpacity style={styles.button} onPress={pickDocument}>
          <Text style={styles.buttonText}>Importer un fichier</Text>
        </TouchableOpacity>
        {importedFile && (
          <Text style={{ color: 'white', marginTop: 6, textAlign: 'center' }}>
            Fichier sélectionné : {importedFile.assets?.[0]?.uri?.split('/').pop()}
          </Text>
        )}
      </View>
    );
  };

  const renderStepThree = () => (
    <View>
      <Text style={styles.title}>Confirmation</Text>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirmer la réservation</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ImageBackground source={require('../../assets/images/background_app.jpg')} resizeMode="cover" style={styles.background}>
        <LinearGradient colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']} style={styles.gradient}>
        <View style={styles.header}>
  <TouchableOpacity onPress={router.back} style={styles.headerIcon}>
    <Ionicons name="arrow-back" size={26} color="white" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Réservation des salles</Text>
</View>


          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 40 }}>
            <View style={{ width: '100%' }}>
              {currentStep === 1 && renderStepOne()}
              {currentStep === 2 && renderStepTwo()}
              {currentStep === 3 && renderStepThree()}

              <View style={styles.buttonRow}>
                {currentStep > 1 && (
                  <TouchableOpacity style={[styles.secondaryButton, { flex: 1, marginRight: 6 }]} onPress={prevStep}>
                    <Text style={styles.buttonText}>Précédent</Text>
                  </TouchableOpacity>
                )}
                {currentStep < 3 && (
                  <TouchableOpacity style={[styles.button, { flex: 1, marginLeft: 6, opacity: canContinue() ? 1 : 0.5 }]} onPress={canContinue() ? nextStep : null}>
                    <Text style={styles.buttonText}>Suivant</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  background: { flex: 1 },
  gradient: { flex: 1, justifyContent: 'center', width: '100%', paddingHorizontal: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  label: { color: 'white', fontSize: 15, marginBottom: 6 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', padding: 10, marginBottom: 10 },
  option: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, marginVertical: 6 },
  selectedOption: { backgroundColor: '#1FA739' },
  optionText: { color: 'white', textAlign: 'center' },
  checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  icon: { marginTop: 30 },
  button: { backgroundColor: '#1FA739', padding: 12, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  secondaryButton: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#1FA739', marginVertical: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  card: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 12, marginVertical: 10 },
  cardText: { color: 'white', fontSize: 16, textAlign: 'center', marginVertical: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 20 },
  backButton: { position: 'absolute', top: 50, left: 20, zIndex: 10 },
  safeContainer: {
    flex: 1,
    backgroundColor: '#111827',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 80,
    paddingBottom: 12,
    zIndex: 10,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    marginLeft:30,
    fontWeight: 'bold',
  },
  
});
