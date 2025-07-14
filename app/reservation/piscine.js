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
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const slotOptions = {
    Homme: ["Lundi 15h - Vendredi 10h", "Mardi 14h - Jeudi 08h", "Samedi 10h - Dimanche 10h"],
    Femme: ["Lundi 10h - Mercredi 16h", "Mardi 12h - Jeudi 09h", "Samedi 09h - Dimanche 09h"],
    Enfant: ["Samedi 10h - Dimanche 10h", "Samedi 11h - Dimanche 09h"],
    Employe_Actif: ["Tous les jours 06h", "Tous les jours 22h"]
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

    const nextStep = () => {
        if (currentStep === 1) {
            if (!mainPerson.gender) return Alert.alert("Erreur", "Veuillez sélectionner votre genre.");
            if (mainPerson.reserveForSelf && !mainPerson.name.trim()) return Alert.alert("Erreur", "Veuillez entrer votre nom complet.");
            for (let i = 0; i < numSpouses; i++) {
                if (!spouses[i] || !spouses[i].name.trim()) return Alert.alert("Erreur", `Veuillez entrer le nom du conjoint ${i + 1}.`);
            }
            for (let i = 0; i < numChildren; i++) {
                if (!children[i] || !children[i].name.trim()) return Alert.alert("Erreur", `Veuillez entrer le nom de l'enfant ${i + 1}.`);
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            const expectedGroups = [];
            if (mainPerson.reserveForSelf) expectedGroups.push(mainPerson.isActiveEmployee ? 'Employe_Actif' : (mainPerson.gender === 'H' ? 'Homme' : 'Femme'));
            if (numSpouses > 0) expectedGroups.push('Femme');
            if (numChildren > 0) expectedGroups.push('Enfant');
            const missing = expectedGroups.find(gr => !groupSlots[gr]);
            if (missing) return Alert.alert("Erreur", `Veuillez choisir un créneau pour le groupe ${missing}.`);
            setCurrentStep(3);
        }
    };

    const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

    const handleSubmit = () => {
        Alert.alert("Succès", "Votre réservation a été envoyée.");
        router.push('/home');
    };

    const renderStepIndicator = () => (
        <View style={styles.stepIndicator}>
            {[1, 2, 3].map(step => (
                <View
                    key={step}
                    style={[styles.stepDot, currentStep === step && styles.activeStepDot]}
                />
            ))}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" backgroundColor="#111827" />
            <ImageBackground
                source={require('../../assets/images/background_app.jpg')}
                resizeMode="cover"
                style={styles.background}
            >
                <LinearGradient colors={['rgba(34,34,39,0.6)', 'rgba(17,24,39,0.9)']} style={styles.gradient}>
                    <TouchableOpacity onPress={router.back} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color="white" />
                    </TouchableOpacity>

                    <ScrollView contentContainerStyle={styles.scroll}>
                        {currentStep === 1 && renderStepOne({
                            mainPerson, setMainPerson,
                            numSpouses, setNumSpouses, spouses, setSpouses,
                            numChildren, setNumChildren, children, setChildren
                        })}
                        {currentStep === 2 && renderStepTwo({
                            mainPerson, numSpouses, numChildren, groupSlots, setGroupSlots
                        })}
                        {currentStep === 3 && renderStepThree({ groupSlots, handleSubmit })}

                        {renderStepIndicator()}

                        {currentStep < 3 && (
                            <TouchableOpacity style={styles.button} onPress={nextStep}>
                                <Text style={styles.buttonText}>Continuer</Text>
                            </TouchableOpacity>
                        )}
                        {currentStep > 1 && (
                            <TouchableOpacity style={styles.secondaryButton} onPress={prevStep}>
                                <Text style={styles.buttonText}>Retour</Text>
                            </TouchableOpacity>
                        )}
                    </ScrollView>
                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    );
}

// ❗️ Appelle tes fonctions renderStepOne, renderStepTwo, renderStepThree existantes en les adaptant à ce wrapper pour éviter le doublon

const styles = StyleSheet.create({
    background: { flex: 1 },
    gradient: { flex: 1, padding: 20 },
    scroll: { flexGrow: 1, justifyContent: 'center', paddingBottom: 40 },
    backButton: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
    title: { color: 'white', fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    label: { color: 'white', fontSize: 15, marginBottom: 6 },
    input: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 10, color: 'white', padding: 10, marginBottom: 10 },
    option: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, marginVertical: 6 },
    selectedOption: { backgroundColor: '#1FA739' },
    optionText: { color: 'white', textAlign: 'center' },
    checkbox: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, gap: 8 },
    button: { backgroundColor: '#1FA739', padding: 12, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
    secondaryButton: { backgroundColor: 'rgba(255,255,255,0.1)', padding: 12, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: '#1FA739', marginVertical: 5 },
    buttonText: { color: 'white', fontWeight: 'bold' },
    card: { backgroundColor: 'rgba(255, 255, 255, 0.15)', padding: 16, borderRadius: 12, marginVertical: 10 },
    cardText: { color: 'white', fontSize: 16, textAlign: 'center', marginVertical: 4 },
    stepIndicator: { flexDirection: 'row', justifyContent: 'center', marginTop: 15 },
    stepDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#555', marginHorizontal: 5 },
    activeStepDot: { backgroundColor: '#1FA739', width: 12, height: 12 },
});
