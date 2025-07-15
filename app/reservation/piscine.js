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
  const [currentStep, setCurrentStep] = useState(1);
  const [mainPerson, setMainPerson] = useState({
    reserveForSelf: false,
    gender: '',
    isEmployee: false,
    isActiveEmployee: false,
    name: '',
  });
  const [numSpouses, setNumSpouses] = useState(0);
  const [spouses, setSpouses] = useState([]);
  const [numChildren, setNumChildren] = useState(0);
  const [children, setChildren] = useState([]);
  const [groupSlots, setGroupSlots] = useState({});

  const canContinue = () => {
    if (currentStep === 1) {
      return mainPerson.reserveForSelf || numSpouses > 0 || numChildren > 0;
    }
    if (currentStep === 2) {
      const expectedGroups = [];
      if (mainPerson.reserveForSelf)
        expectedGroups.push(mainPerson.isActiveEmployee ? 'Employe_Actif' : (mainPerson.gender === 'H' ? 'Homme' : 'Femme'));
      if (numSpouses > 0) expectedGroups.push('Femme');
      if (numChildren > 0) expectedGroups.push('Enfant');
      return expectedGroups.every(gr => groupSlots[gr]);
    }
    return true;
  };

  const nextStep = () => {
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

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    Alert.alert("Succès", "Votre réservation a été envoyée.");
    router.push('/home');
  };

  const renderStepOne = () => (
    <View style={{ marginTop: 52 }}>
      <Text style={styles.label}>Genre :</Text>
      <View style={styles.row}>
        {['H', 'F'].map((g) => (
          <TouchableOpacity
            key={g}
            onPress={() => {
              setMainPerson({ ...mainPerson, gender: g });
              setNumSpouses(0);
              setSpouses([]);
            }}
            style={[styles.option, mainPerson.gender === g && styles.selectedOption]}
          >
            <Text style={styles.optionText}>{g === 'H' ? 'Homme' : 'Femme'}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {mainPerson.gender === 'F' && (
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setMainPerson({ ...mainPerson, isEmployee: !mainPerson.isEmployee })}
        >
          <Ionicons
            name={mainPerson.isEmployee ? 'checkbox' : 'square-outline'}
            size={20}
            color="white"
          />
          <Text style={styles.optionText}>Employée OCP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setMainPerson({ ...mainPerson, reserveForSelf: !mainPerson.reserveForSelf })}
      >
        <Ionicons
          name={mainPerson.reserveForSelf ? 'checkbox' : 'square-outline'}
          size={20}
          color="white"
        />
        <Text style={styles.optionText}>Réserver pour moi-même</Text>
      </TouchableOpacity>

      {mainPerson.reserveForSelf && (
        <>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setMainPerson({ ...mainPerson, isActiveEmployee: !mainPerson.isActiveEmployee })}
          >
            <Ionicons
              name={mainPerson.isActiveEmployee ? 'checkbox' : 'square-outline'}
              size={20}
              color="white"
            />
            <Text style={styles.optionText}>Employé Actif (24/24)</Text>
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

      {mainPerson.gender && (
        <>
          <Text style={styles.label}>Nombre de conjoints (max {mainPerson.gender === 'H' ? '2' : '1'})</Text>
          <TextInput
            keyboardType="numeric"
            style={styles.input}
            placeholder="0"
            placeholderTextColor="#aaa"
            value={String(numSpouses)}
            onChangeText={(val) => {
              let n = parseInt(val) || 0;
              n = mainPerson.gender === 'H' ? Math.min(n, 2) : Math.min(n, 1);
              if (n !== numSpouses) {
                setNumSpouses(n);
                setSpouses(Array.from({ length: n }, (_, i) => spouses[i] || { name: '' }));
              }
            }}
          />
          {spouses.map((sp, idx) => (
            <TextInput
              key={idx}
              placeholder={`Nom complet conjoint ${idx + 1}`}
              placeholderTextColor="#aaa"
              style={styles.input}
              value={sp.name}
              onChangeText={(text) => {
                const updated = [...spouses];
                updated[idx] = { name: text };
                setSpouses(updated);
              }}
            />
          ))}
        </>
      )}

      <Text style={styles.label}>Nombre d'enfants :</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        placeholder="0"
        placeholderTextColor="#aaa"
        value={String(numChildren)}
        onChangeText={(val) => {
          let n = parseInt(val) || 0;
          n = Math.min(n, 7);
          if (n !== numChildren) {
            setNumChildren(n);
            setChildren(Array.from({ length: n }, (_, i) => children[i] || { name: '' }));
          }
        }}
      />
      {children.map((child, idx) => (
        <TextInput
          key={idx}
          placeholder={`Nom complet enfant ${idx + 1}`}
          placeholderTextColor="#aaa"
          style={styles.input}
          value={child.name}
          onChangeText={(text) => {
            const updated = [...children];
            updated[idx] = { name: text };
            setChildren(updated);
          }}
        />
      ))}
    </View>
  );

  const renderStepTwo = () => {
    const groups = [];
    if (mainPerson.reserveForSelf)
      groups.push(mainPerson.isActiveEmployee ? 'Employe_Actif' : (mainPerson.gender === 'H' ? 'Homme' : 'Femme'));
    if (numSpouses > 0) groups.push('Femme');
    if (numChildren > 0) groups.push('Enfant');

    return (
      <View>
        <Text style={styles.title}>Choix des créneaux</Text>
        {groups.map((group, idx) => (
          <View key={idx} style={{ marginBottom: 12 }}>
            <Text style={styles.label}>{group}</Text>
            {slotOptions[group]?.map((slot, i) => (
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
      </View>
    );
  };

  const renderStepThree = () => (
    <View>
      <Text style={styles.title}>Récapitulatif</Text>
      <View style={styles.card}>
        {Object.entries(groupSlots).map(([group, slot], idx) => (
          <Text key={idx} style={styles.cardText}> {group} : {slot}</Text>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Confirmer la réservation</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ImageBackground
        source={require('../../assets/images/background_app.jpg')}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.safeContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={router.back} style={styles.headerIcon}>
                <Ionicons name="arrow-back" size={26} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Réservation Piscine</Text>
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
                    <TouchableOpacity
                      style={[styles.button, { flex: 1, marginLeft: 6, opacity: canContinue() ? 1 : 0.5 }]}
                      onPress={canContinue() ? nextStep : null}
                    >
                      <Text style={styles.buttonText}>Suivant</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  safeContainer: { flex: 1, backgroundColor: '#111827' },
  title: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  label: { color: 'white', fontSize: 15, marginBottom: 6 },
  input: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', padding: 10, marginBottom: 10 },
  option: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, marginVertical: 6 },
  selectedOption: { backgroundColor: '#32CD32' },
  optionText: { color: 'white', textAlign: 'center' },
  checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  button: { backgroundColor: '#32CD32', padding: 12, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
  secondaryButton: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#32CD32', marginVertical: 5 },
  buttonText: { color: 'white', fontWeight: 'bold' },
  card: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 16, borderRadius: 12, marginVertical: 10 },
  cardText: { color: 'white', fontSize: 16, textAlign: 'center', marginVertical: 4 },
  buttonRow: { flexDirection: 'row', marginTop: 20 },
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
});
