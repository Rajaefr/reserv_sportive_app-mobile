// ReservationPiscine.tsx

import { Ionicons } from '@expo/vector-icons';
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

const slotOptions = {
  Homme: ["Lundi 15h - Vendredi 10h", "Mardi 14h - Jeudi 08h", "Samedi 10h - Dimanche 10h"],
  Femme: ["Lundi 10h - Mercredi 16h", "Mardi 12h - Jeudi 09h", "Samedi 09h - Dimanche 09h"],
  Enfant: ["Samedi 10h - Dimanche 10h", "Samedi 11h - Dimanche 09h"],
  Employe_Actif: ["Tous les jours 06h", "Tous les jours 22h"],
};

export default function ReservationPiscine() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const [mainPerson, setMainPerson] = useState({
    reserveForSelf: false,
    gender: '',
    isActiveEmployee: false,
    name: '',
  });

  const [addSpouses, setAddSpouses] = useState(false);
  const [addChildren, setAddChildren] = useState(false);
  const [numSpouses, setNumSpouses] = useState(0);
  const [spouses, setSpouses] = useState([]);
  const [numChildren, setNumChildren] = useState(0);
  const [children, setChildren] = useState([]);
  const [groupSlots, setGroupSlots] = useState({});

  const canContinue = () => {
    if (currentStep === 0) return true;
    if (currentStep === 1) {
      if (mainPerson.reserveForSelf && (!mainPerson.gender || !mainPerson.name.trim())) return false;
      if (!mainPerson.reserveForSelf && addSpouses && !mainPerson.gender) return false;
      if (addSpouses && numSpouses > 0 && !spouses.every(s => s.name.trim())) return false;
      if (addChildren && numChildren > 0 && !children.every(c => c.name.trim())) return false;
      return true;
    }
    if (currentStep === 2) {
      const groups = [];
      if (mainPerson.reserveForSelf)
        groups.push(mainPerson.isActiveEmployee ? 'Employe_Actif' : (mainPerson.gender === 'H' ? 'Homme' : 'Femme'));
      if (addSpouses && numSpouses > 0) groups.push('Femme');
      if (addChildren && numChildren > 0) groups.push('Enfant');
      return groups.every(gr => groupSlots[gr]);
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

  const renderInitialChoice = () => (
    <View style={styles.card}>
      <Text style={styles.title}>Paramètres de réservation</Text>

      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setMainPerson({ ...mainPerson, reserveForSelf: !mainPerson.reserveForSelf })}
      >
        <Ionicons name={mainPerson.reserveForSelf ? 'checkbox' : 'square-outline'} size={22} color="white" />
        <Text style={styles.optionText}>Réserver pour moi</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkbox} onPress={() => setAddSpouses(!addSpouses)}>
        <Ionicons name={addSpouses ? 'checkbox' : 'square-outline'} size={22} color="white" />
        <Text style={styles.optionText}>Ajouter des conjoints</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.checkbox} onPress={() => setAddChildren(!addChildren)}>
        <Ionicons name={addChildren ? 'checkbox' : 'square-outline'} size={22} color="white" />
        <Text style={styles.optionText}>Ajouter des enfants</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.button,
          { alignSelf: 'center', width: '90%', opacity: (mainPerson.reserveForSelf || addSpouses || addChildren) ? 1 : 0.5 }
        ]}
        onPress={(mainPerson.reserveForSelf || addSpouses || addChildren) ? nextStep : null}
        disabled={!(mainPerson.reserveForSelf || addSpouses || addChildren)}
      >
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );

  const renderForm = () => (
    <View style={styles.card}>
      <Text style={styles.title}>Informations du/des réservant(s)</Text>
  
      {!mainPerson.reserveForSelf && addSpouses && !mainPerson.gender && (
        <>
          <Text style={styles.label}>Genre (pour déterminer le nombre de conjoints) :</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              onPress={() => setMainPerson({ ...mainPerson, gender: 'H' })}
              style={[
                styles.genderOption,
                mainPerson.gender === 'H' && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>Homme</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => setMainPerson({ ...mainPerson, gender: 'F' })}
              style={[
                styles.genderOption,
                mainPerson.gender === 'F' && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>Femme</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
  
      {mainPerson.reserveForSelf && (
        <>
          <Text style={styles.label}>Genre :</Text>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              onPress={() => setMainPerson({ ...mainPerson, gender: 'H' })}
              style={[
                styles.genderOption,
                mainPerson.gender === 'H' && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>Homme</Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => setMainPerson({ ...mainPerson, gender: 'F' })}
              style={[
                styles.genderOption,
                mainPerson.gender === 'F' && styles.selectedOption,
              ]}
            >
              <Text style={styles.optionText}>Femme</Text>
            </TouchableOpacity>
          </View>
  
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setMainPerson({ ...mainPerson, isActiveEmployee: !mainPerson.isActiveEmployee })}
          >
            <Ionicons name={mainPerson.isActiveEmployee ? 'checkbox' : 'square-outline'} size={22} color="white" />
            <Text style={styles.optionText}>Employé Actif</Text>
          </TouchableOpacity>
  
          <TextInput
            placeholder="Nom complet"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={mainPerson.name}
            onChangeText={(text) => setMainPerson({ ...mainPerson, name: text })}
          />
        </>
      )}
  
      {addSpouses && (
        <>
          <Text style={styles.label}>Nombre de conjoints :</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={String(numSpouses)}
            onChangeText={(val) => {
              const maxSpouses = mainPerson.gender === 'H' ? 2 : 1;
              const n = Math.min(parseInt(val) || 0, maxSpouses);
              setNumSpouses(n);
              setSpouses(Array.from({ length: n }, (_, i) => spouses[i] || { name: '', isEmployee: false }));
            }}
          />
          {spouses.map((sp, idx) => (
            <View key={idx} style={[styles.card, { backgroundColor: 'rgba(255,255,255,0.06)', marginTop: 10 }]}>
              <TextInput
                placeholder={`Nom complet conjoint ${idx + 1}`}
                placeholderTextColor="#aaa"
                style={styles.input}
                value={sp.name}
                onChangeText={(text) => {
                  const updated = [...spouses];
                  updated[idx] = { ...updated[idx], name: text };
                  setSpouses(updated);
                }}
              />
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => {
                  const updated = [...spouses];
                  updated[idx] = { ...updated[idx], isEmployee: !updated[idx].isEmployee };
                  setSpouses(updated);
                }}
              >
                <Ionicons name={sp.isEmployee ? 'checkbox' : 'square-outline'} size={22} color="white" />
                <Text style={styles.optionText}>Employé OCP</Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}
  
      {addChildren && (
        <>
          <Text style={styles.label}>Nombre d'enfants :</Text>
          <TextInput
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={String(numChildren)}
            onChangeText={(val) => {
              const n = Math.min(parseInt(val) || 0, 5);
              setNumChildren(n);
              setChildren(Array.from({ length: n }, (_, i) => children[i] || { name: '' }));
            }}
          />
          {children.map((ch, idx) => (
            <TextInput
              key={idx}
              placeholder={`Nom complet enfant ${idx + 1}`}
              placeholderTextColor="#aaa"
              style={styles.input}
              value={ch.name}
              onChangeText={(text) => {
                const updated = [...children];
                updated[idx] = { name: text };
                setChildren(updated);
              }}
            />
          ))}
        </>
      )}
  
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <TouchableOpacity style={[styles.secondaryButton, { flex: 0.48 }]} onPress={prevStep}>
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { flex: 0.48, opacity: canContinue() ? 1 : 0.5 }]}
          onPress={canContinue() ? nextStep : null}
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  

  const renderSlotSelection = () => {
    const groups = [];
    if (mainPerson.reserveForSelf)
      groups.push(mainPerson.isActiveEmployee ? 'Employe_Actif' : (mainPerson.gender === 'H' ? 'Homme' : 'Femme'));
    if (addSpouses && numSpouses > 0) groups.push('Femme');
    if (addChildren && numChildren > 0) groups.push('Enfant');

    return (
      <View style={styles.card}>
        <Text style={styles.title}>Choix des créneaux</Text>
        {groups.map((group, idx) => (
          <View key={idx} style={{ marginBottom: 12 }}>
            <Text style={styles.label}>{group}</Text>
            {slotOptions[group].map((slot, i) => (
              <TouchableOpacity
                key={i}
                style={[styles.option, groupSlots[group] === slot && styles.selectedOption]}
                onPress={() => setGroupSlots(prev => ({ ...prev, [group]: slot }))}
              >
                <Text style={styles.optionText}>{slot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
          <TouchableOpacity style={[styles.secondaryButton, { flex: 0.48 }]} onPress={prevStep}>
            <Text style={styles.buttonText}>Précédent</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { flex: 0.48 }]} onPress={nextStep}>
            <Text style={styles.buttonText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderRecap = () => (
    <View style={styles.card}>
      <Text style={styles.title}>Récapitulatif</Text>
      {mainPerson.reserveForSelf && (
        <Text style={styles.recapText}>
          Réservation pour moi-même : {mainPerson.name} ({mainPerson.gender === 'H' ? 'Homme' : 'Femme'}) - {mainPerson.isActiveEmployee ? 'Employé Actif' : 'Non Employé Actif'}
        </Text>
      )}
      {addSpouses && spouses.length > 0 && (
        <>
          <Text style={[styles.label, { marginTop: 8 }]}>Conjoints :</Text>
          {spouses.map((sp, idx) => (
            <Text key={idx} style={styles.recapText}>
              {sp.name} - {sp.isEmployee ? 'Employé OCP' : 'Non Employé OCP'}
            </Text>
          ))}
        </>
      )}
      {addChildren && children.length > 0 && (
        <>
          <Text style={[styles.label, { marginTop: 8 }]}>Enfants :</Text>
          {children.map((ch, idx) => (
            <Text key={idx} style={styles.recapText}>{ch.name}</Text>
          ))}
        </>
      )}
      <Text style={[styles.label, { marginTop: 10 }]}>Créneaux choisis :</Text>
      {Object.entries(groupSlots).map(([group, slot], idx) => (
        <Text key={idx} style={styles.recapText}>
          {group} : {slot}
        </Text>
      ))}

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <TouchableOpacity style={[styles.secondaryButton, { flex: 0.48 }]} onPress={prevStep}>
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { flex: 0.48 }]} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ImageBackground
      source={require('../../assets/images/background_app.jpg')}
      resizeMode="cover"
      style={{ flex: 1 }}
    >
      <LinearGradient colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
          <StatusBar barStyle="light-content" />
          <View style={styles.header}>
            <TouchableOpacity onPress={router.back} style={styles.headerIcon}>
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Réservation Piscine</Text>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
            {currentStep === 0 && renderInitialChoice()}
            {currentStep === 1 && renderForm()}
            {currentStep === 2 && renderSlotSelection()}
            {currentStep === 3 && renderRecap()}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: 16, padding: 20, marginVertical: 16 },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 12 },
  label: { color: 'white', fontSize: 15, marginBottom: 6 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', padding: 10, marginBottom: 10 },
  option: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, marginVertical: 4 },
  selectedOption: { backgroundColor: '#32CD32' },
  optionText: { color: 'white', fontSize: 16 },
  checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 8 },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#32CD32',
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    zIndex: 10,
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  recapText: { color: '#d1d5db', fontSize: 16, marginVertical: 2, textAlign: 'center' },
});
