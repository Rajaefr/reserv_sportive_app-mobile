"use client"

import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useLocalSearchParams, useRouter } from "expo-router"
import { useState } from "react"
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
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import DateTimePicker from "@react-native-community/datetimepicker"

export default function ReservationSalle() {
  const router = useRouter()
  const { role } = useLocalSearchParams()
  const isRetraite = role === "retraite"

  const [step, setStep] = useState(0)
  const [reserveForSelf, setReserveForSelf] = useState(false)
  const [addSpouses, setAddSpouses] = useState(false)
  const [addChildren, setAddChildren] = useState(false)
  const [addAdultChildren, setAddAdultChildren] = useState(false)

  // Informations personnelles (séparées nom/prénom)
  const [selfInfo, setSelfInfo] = useState({
    nom: "",
    prenom: "",
    cne: "",
    disciplineCode: "",
  })

  // Conjoints (maximum 2)
  const [spouses, setSpouses] = useState([
    {
      nom: "",
      prenom: "",
      cne: "",
      disciplineCode: "",
    },
  ])

  // Enfants (maximum 5, âge > 4 ans et < 18 ans) - SEULEMENT pour collaborateurs
  const [children, setChildren] = useState([
    {
      nom: "",
      prenom: "",
      dateNaissance: new Date(),
      sexe: "",
      disciplineCode: "",
      showDatePicker: false,
    },
  ])

  // Enfants adultes (18-25 ans) - SEULEMENT pour collaborateurs
  const [adultChildren, setAdultChildren] = useState([
    {
      nom: "",
      prenom: "",
      dateNaissance: new Date(),
      sexe: "",
      cne: "",
      disciplineCode: "",
      showDatePicker: false,
    },
  ])

  // Codes de discipline avec tarifs selon le cahier des charges
  const disciplineCodes = [
    { code: "C001-1", name: "Adultes - Salle A" },
    { code: "C001-2", name: "Enfants - Salle A" },
    { code: "C058-1", name: "Adultes Gym" },
    { code: "C058-2", name: "Enfants Gym" },
    { code: "C058-3", name: "Adultes Gym & Swim" },
    { code: "C058-4", name: "Enfants Gym & Swim" },
  ]

  const handleSubmit = () => {
    const totalPersonnes =
      (reserveForSelf ? 1 : 0) +
      (addSpouses ? spouses.filter((sp) => sp.nom.trim() && sp.prenom.trim()).length : 0) +
      (addChildren && !isRetraite ? children.filter((ch) => ch.nom.trim() && ch.prenom.trim()).length : 0) +
      (addAdultChildren && !isRetraite ? adultChildren.filter((ac) => ac.nom.trim() && ac.prenom.trim()).length : 0)

    Alert.alert(
      "Demande soumise",
      `Votre demande de réservation salle de sport pour ${totalPersonnes} personne(s) a été soumise.\n\nElle sera traitée par l'administration.`,
      [{ text: "OK", onPress: () => router.push("/home") }],
    )
  }

  const validateStep = () => {
    if (step === 1) {
      if (
        reserveForSelf &&
        (!selfInfo.nom.trim() || !selfInfo.prenom.trim() || !selfInfo.cne.trim() || !selfInfo.disciplineCode)
      ) {
        return false
      }
      if (
        addSpouses &&
        !spouses.every(
          (sp) => !sp.nom.trim() || (sp.nom.trim() && sp.prenom.trim() && sp.cne.trim() && sp.disciplineCode),
        )
      ) {
        return false
      }
      if (
        addChildren &&
        !isRetraite &&
        children.some(
          (ch) =>
            ch.nom.trim() &&
            (!ch.prenom.trim() || !ch.sexe || !ch.disciplineCode || !isAgeBetween4And18(ch.dateNaissance)),
        )
      ) {
        return false
      }
      if (
        addAdultChildren &&
        !isRetraite &&
        adultChildren.some(
          (ac) =>
            ac.nom.trim() &&
            (!ac.prenom.trim() ||
              !ac.sexe ||
              !ac.cne.trim() ||
              !ac.disciplineCode ||
              !isAgeBetween18And25(ac.dateNaissance)),
        )
      ) {
        return false
      }
    }
    return true
  }

  const isAgeBetween4And18 = (date) => {
    const today = new Date()
    const birthDate = new Date(date)
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    let actualAge = age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      actualAge--
    }

    return actualAge > 4 && actualAge < 18
  }

  const isAgeBetween18And25 = (date) => {
    const today = new Date()
    const birthDate = new Date(date)
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    let actualAge = age
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      actualAge--
    }

    return actualAge >= 18 && actualAge <= 25
  }

  const addSpouse = () => {
    if (spouses.length < 2) {
      setSpouses([...spouses, { nom: "", prenom: "", cne: "", disciplineCode: "" }])
    }
  }

  const removeSpouse = (index) => {
    setSpouses(spouses.filter((_, i) => i !== index))
  }

  const addChild = () => {
    if (children.length < 5 && !isRetraite) {
      setChildren([
        ...children,
        {
          nom: "",
          prenom: "",
          dateNaissance: new Date(),
          sexe: "",
          disciplineCode: "",
          showDatePicker: false,
        },
      ])
    }
  }

  const removeChild = (index) => {
    setChildren(children.filter((_, i) => i !== index))
  }

  const updateChild = (index, field, value) => {
    const updated = [...children]
    updated[index][field] = value
    setChildren(updated)
  }

  const addAdultChild = () => {
    if (adultChildren.length < 5 && !isRetraite) {
      setAdultChildren([
        ...adultChildren,
        {
          nom: "",
          prenom: "",
          dateNaissance: new Date(),
          sexe: "",
          cne: "",
          disciplineCode: "",
          showDatePicker: false,
        },
      ])
    }
  }

  const removeAdultChild = (index) => {
    setAdultChildren(adultChildren.filter((_, i) => i !== index))
  }

  const updateAdultChild = (index, field, value) => {
    const updated = [...adultChildren]
    updated[index][field] = value
    setAdultChildren(updated)
  }

  const renderDisciplineInput = (value, onChangeText, placeholder = "Ex: C001-1") => {
    return (
      <View style={styles.disciplineContainer}>
        <Text style={styles.label}>Code de discipline *</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          value={value}
          onChangeText={onChangeText}
          autoCapitalize="characters"
        />
        <Text style={styles.disciplineHint}>Codes disponibles: C001-1, C001-2, C058-1, C058-2, C058-3, C058-4</Text>
      </View>
    )
  }

  const renderStep0 = () => (
    <View style={styles.card}>
      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>Étape 1/3</Text>
      </View>

      <Text style={styles.title}>Sélection des participants</Text>
      <Text style={styles.subtitle}>Qui souhaitez-vous inclure dans cette réservation ?</Text>

      {/* Affichage du rôle utilisateur */}
      <View style={styles.roleIndicator}>
        <Ionicons name={isRetraite ? "person-circle" : "briefcase"} size={20} color="#1FA739" />
        <Text style={styles.roleText}>
          {isRetraite ? "Compte Retraité (RCAR)" : "Compte Collaborateur (Matricule)"}
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.optionCard, reserveForSelf && styles.selectedCard]}
          onPress={() => setReserveForSelf(!reserveForSelf)}
        >
          <Ionicons
            name={reserveForSelf ? "person" : "person-outline"}
            size={24}
            color={reserveForSelf ? "#1FA739" : "white"}
          />
          <Text style={[styles.optionText, reserveForSelf && styles.selectedText]}>Moi-même</Text>
          <Ionicons
            name={reserveForSelf ? "checkmark-circle" : "ellipse-outline"}
            size={20}
            color={reserveForSelf ? "#1FA739" : "#ccc"}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.optionCard, addSpouses && styles.selectedCard]}
          onPress={() => setAddSpouses(!addSpouses)}
        >
          <Ionicons
            name={addSpouses ? "people" : "people-outline"}
            size={24}
            color={addSpouses ? "#1FA739" : "white"}
          />
          <Text style={[styles.optionText, addSpouses && styles.selectedText]}>Conjoints (max. 2)</Text>
          <Ionicons
            name={addSpouses ? "checkmark-circle" : "ellipse-outline"}
            size={20}
            color={addSpouses ? "#1FA739" : "#ccc"}
          />
        </TouchableOpacity>

        {/* Les enfants ne sont disponibles QUE pour les collaborateurs */}
        {!isRetraite && (
          <>
            <TouchableOpacity
              style={[styles.optionCard, addChildren && styles.selectedCard]}
              onPress={() => setAddChildren(!addChildren)}
            >
              <Ionicons
                name={addChildren ? "school" : "school-outline"}
                size={24}
                color={addChildren ? "#1FA739" : "white"}
              />
              <Text style={[styles.optionText, addChildren && styles.selectedText]}>Enfants 4-18 ans (max. 5)</Text>
              <Ionicons
                name={addChildren ? "checkmark-circle" : "ellipse-outline"}
                size={20}
                color={addChildren ? "#1FA739" : "#ccc"}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.optionCard, addAdultChildren && styles.selectedCard]}
              onPress={() => setAddAdultChildren(!addAdultChildren)}
            >
              <Ionicons
                name={addAdultChildren ? "person-add" : "person-add-outline"}
                size={24}
                color={addAdultChildren ? "#1FA739" : "white"}
              />
              <Text style={[styles.optionText, addAdultChildren && styles.selectedText]}>
                Enfants adultes 18-25 ans (max. 5)
              </Text>
              <Ionicons
                name={addAdultChildren ? "checkmark-circle" : "ellipse-outline"}
                size={20}
                color={addAdultChildren ? "#1FA739" : "#ccc"}
              />
            </TouchableOpacity>
          </>
        )}

        {/* Message informatif pour les retraités */}
        {isRetraite && (
          <View style={styles.infoCard}>
            <Ionicons name="information-circle" size={20} color="#f5780b" />
            <Text style={styles.infoText}>
              En tant que retraité, vous pouvez réserver pour vous-même et vos conjoints uniquement.
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.primaryButton,
          { opacity: reserveForSelf || addSpouses || addChildren || addAdultChildren ? 1 : 0.5 },
        ]}
        onPress={() => setStep(1)}
        disabled={!(reserveForSelf || addSpouses || addChildren || addAdultChildren)}
      >
        <Text style={styles.buttonText}>Continuer</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  )

  const renderStep1 = () => (
    <ScrollView style={styles.card}>
      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>Étape 2/3</Text>
      </View>

      <Text style={styles.title}>Informations des participants</Text>
      <Text style={styles.subtitle}>Veuillez remplir les informations et choisir les disciplines</Text>

      {/* Informations personnelles */}
      {reserveForSelf && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person" size={20} color="#1FA739" />
            <Text style={styles.sectionTitle}>Mes informations</Text>
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Nom *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                placeholderTextColor="#aaa"
                value={selfInfo.nom}
                onChangeText={(text) => setSelfInfo({ ...selfInfo, nom: text })}
              />
            </View>
            <View style={styles.inputHalf}>
              <Text style={styles.label}>Prénom *</Text>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                placeholderTextColor="#aaa"
                value={selfInfo.prenom}
                onChangeText={(text) => setSelfInfo({ ...selfInfo, prenom: text })}
              />
            </View>
          </View>

          <Text style={styles.label}>CNE *</Text>
          <TextInput
            style={styles.input}
            placeholder="Carte Nationale d'Identité"
            placeholderTextColor="#aaa"
            value={selfInfo.cne}
            onChangeText={(text) => setSelfInfo({ ...selfInfo, cne: text })}
          />

          {renderDisciplineInput(selfInfo.disciplineCode, (text) => setSelfInfo({ ...selfInfo, disciplineCode: text }))}
        </View>
      )}

      {/* Conjoints */}
      {addSpouses && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="people" size={20} color="#1FA739" />
            <Text style={styles.sectionTitle}>Conjoints</Text>
            {spouses.length < 2 && (
              <TouchableOpacity onPress={addSpouse} style={styles.addButton}>
                <Ionicons name="add-circle" size={24} color="#1FA739" />
              </TouchableOpacity>
            )}
          </View>

          {spouses.map((spouse, index) => (
            <View key={index} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <Text style={styles.memberTitle}>Conjoint {index + 1}</Text>
                {spouses.length > 1 && (
                  <TouchableOpacity onPress={() => removeSpouse(index)}>
                    <Ionicons name="trash" size={20} color="#ff4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Nom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    placeholderTextColor="#aaa"
                    value={spouse.nom}
                    onChangeText={(text) => {
                      const updated = [...spouses]
                      updated[index].nom = text
                      setSpouses(updated)
                    }}
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Prénom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    placeholderTextColor="#aaa"
                    value={spouse.prenom}
                    onChangeText={(text) => {
                      const updated = [...spouses]
                      updated[index].prenom = text
                      setSpouses(updated)
                    }}
                  />
                </View>
              </View>

              <Text style={styles.label}>CNE *</Text>
              <TextInput
                style={styles.input}
                placeholder="Carte Nationale d'Identité"
                placeholderTextColor="#aaa"
                value={spouse.cne}
                onChangeText={(text) => {
                  const updated = [...spouses]
                  updated[index].cne = text
                  setSpouses(updated)
                }}
              />

              {renderDisciplineInput(spouse.disciplineCode, (text) => {
                const updated = [...spouses]
                updated[index].disciplineCode = text
                setSpouses(updated)
              })}
            </View>
          ))}
        </View>
      )}

      {/* Enfants (4-18 ans) - SEULEMENT pour les collaborateurs */}
      {addChildren && !isRetraite && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="school" size={20} color="#1FA739" />
            <Text style={styles.sectionTitle}>Enfants (4-18 ans)</Text>
            {children.length < 5 && (
              <TouchableOpacity onPress={addChild} style={styles.addButton}>
                <Ionicons name="add-circle" size={24} color="#1FA739" />
              </TouchableOpacity>
            )}
          </View>

          {children.map((child, index) => (
            <View key={index} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <Text style={styles.memberTitle}>Enfant {index + 1}</Text>
                {children.length > 1 && (
                  <TouchableOpacity onPress={() => removeChild(index)}>
                    <Ionicons name="trash" size={20} color="#ff4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Nom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    placeholderTextColor="#aaa"
                    value={child.nom}
                    onChangeText={(text) => updateChild(index, "nom", text)}
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Prénom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    placeholderTextColor="#aaa"
                    value={child.prenom}
                    onChangeText={(text) => updateChild(index, "prenom", text)}
                  />
                </View>
              </View>

              <Text style={styles.label}>Sexe *</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[styles.genderOption, child.sexe === "M" && styles.selectedGender]}
                  onPress={() => updateChild(index, "sexe", "M")}
                >
                  <Ionicons name="male" size={20} color={child.sexe === "M" ? "white" : "#ccc"} />
                  <Text style={[styles.genderText, child.sexe === "M" && styles.selectedGenderText]}>Masculin</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderOption, child.sexe === "F" && styles.selectedGender]}
                  onPress={() => updateChild(index, "sexe", "F")}
                >
                  <Ionicons name="female" size={20} color={child.sexe === "F" ? "white" : "#ccc"} />
                  <Text style={[styles.genderText, child.sexe === "F" && styles.selectedGenderText]}>Féminin</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Date de naissance *</Text>
              <TouchableOpacity style={styles.dateButton} onPress={() => updateChild(index, "showDatePicker", true)}>
                <Ionicons name="calendar" size={20} color="#1FA739" />
                <Text style={styles.dateText}>{child.dateNaissance.toLocaleDateString("fr-FR")}</Text>
              </TouchableOpacity>

              {child.showDatePicker && (
                <DateTimePicker
                  value={child.dateNaissance}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    updateChild(index, "showDatePicker", false)
                    if (selectedDate) {
                      updateChild(index, "dateNaissance", selectedDate)
                    }
                  }}
                />
              )}

              {child.nom.trim() && child.prenom.trim() && !isAgeBetween4And18(child.dateNaissance) && (
                <View style={styles.warningContainer}>
                  <Ionicons name="warning" size={16} color="#f5780b" />
                  <Text style={styles.warningText}>L'enfant doit avoir entre 4 et 18 ans pour les salles de sport</Text>
                </View>
              )}

              {renderDisciplineInput(
                child.disciplineCode,
                (text) => updateChild(index, "disciplineCode", text),
                "Ex: C001-2 (Enfants)",
              )}
            </View>
          ))}
        </View>
      )}

      {/* Enfants adultes (18-25 ans) - SEULEMENT pour les collaborateurs */}
      {addAdultChildren && !isRetraite && (
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Ionicons name="person-add" size={20} color="#1FA739" />
            <Text style={styles.sectionTitle}>Enfants adultes (18-25 ans)</Text>
            {adultChildren.length < 5 && (
              <TouchableOpacity onPress={addAdultChild} style={styles.addButton}>
                <Ionicons name="add-circle" size={24} color="#1FA739" />
              </TouchableOpacity>
            )}
          </View>

          {adultChildren.map((adultChild, index) => (
            <View key={index} style={styles.memberCard}>
              <View style={styles.memberHeader}>
                <Text style={styles.memberTitle}>Enfant adulte {index + 1}</Text>
                {adultChildren.length > 1 && (
                  <TouchableOpacity onPress={() => removeAdultChild(index)}>
                    <Ionicons name="trash" size={20} color="#ff4444" />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.inputRow}>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Nom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nom"
                    placeholderTextColor="#aaa"
                    value={adultChild.nom}
                    onChangeText={(text) => updateAdultChild(index, "nom", text)}
                  />
                </View>
                <View style={styles.inputHalf}>
                  <Text style={styles.label}>Prénom *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Prénom"
                    placeholderTextColor="#aaa"
                    value={adultChild.prenom}
                    onChangeText={(text) => updateAdultChild(index, "prenom", text)}
                  />
                </View>
              </View>

              <Text style={styles.label}>CNE *</Text>
              <TextInput
                style={styles.input}
                placeholder="Carte Nationale d'Identité"
                placeholderTextColor="#aaa"
                value={adultChild.cne}
                onChangeText={(text) => updateAdultChild(index, "cne", text)}
              />

              <Text style={styles.label}>Sexe *</Text>
              <View style={styles.genderContainer}>
                <TouchableOpacity
                  style={[styles.genderOption, adultChild.sexe === "M" && styles.selectedGender]}
                  onPress={() => updateAdultChild(index, "sexe", "M")}
                >
                  <Ionicons name="male" size={20} color={adultChild.sexe === "M" ? "white" : "#ccc"} />
                  <Text style={[styles.genderText, adultChild.sexe === "M" && styles.selectedGenderText]}>
                    Masculin
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.genderOption, adultChild.sexe === "F" && styles.selectedGender]}
                  onPress={() => updateAdultChild(index, "sexe", "F")}
                >
                  <Ionicons name="female" size={20} color={adultChild.sexe === "F" ? "white" : "#ccc"} />
                  <Text style={[styles.genderText, adultChild.sexe === "F" && styles.selectedGenderText]}>Féminin</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>Date de naissance *</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => updateAdultChild(index, "showDatePicker", true)}
              >
                <Ionicons name="calendar" size={20} color="#1FA739" />
                <Text style={styles.dateText}>{adultChild.dateNaissance.toLocaleDateString("fr-FR")}</Text>
              </TouchableOpacity>

              {adultChild.showDatePicker && (
                <DateTimePicker
                  value={adultChild.dateNaissance}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    updateAdultChild(index, "showDatePicker", false)
                    if (selectedDate) {
                      updateAdultChild(index, "dateNaissance", selectedDate)
                    }
                  }}
                />
              )}

              {adultChild.nom.trim() && adultChild.prenom.trim() && !isAgeBetween18And25(adultChild.dateNaissance) && (
                <View style={styles.warningContainer}>
                  <Ionicons name="warning" size={16} color="#f5780b" />
                  <Text style={styles.warningText}>L'enfant adulte doit avoir entre 18 et 25 ans</Text>
                </View>
              )}

              {renderDisciplineInput(
                adultChild.disciplineCode,
                (text) => updateAdultChild(index, "disciplineCode", text),
                "Ex: C001-1 (Adultes)",
              )}
            </View>
          ))}
        </View>
      )}

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(0)}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryButton, { opacity: validateStep() ? 1 : 0.5 }]}
          onPress={() => validateStep() && setStep(2)}
          disabled={!validateStep()}
        >
          <Text style={styles.buttonText}>Continuer</Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )

  const renderStep2 = () => (
    <ScrollView style={styles.card}>
      <View style={styles.stepIndicator}>
        <Text style={styles.stepText}>Étape 3/3</Text>
      </View>

      <Text style={styles.title}>Récapitulatif de la réservation</Text>
      <Text style={styles.subtitle}>Vérifiez les informations avant de soumettre</Text>

      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Ionicons name="barbell" size={24} color="#1FA739" />
          <Text style={styles.summaryTitle}>Réservation Salle de Sport</Text>
        </View>

        {reserveForSelf && (
          <View style={styles.participantItem}>
            <Ionicons name="person" size={16} color="#1FA739" />
            <View style={styles.participantInfo}>
              <Text style={styles.participantText}>
                {selfInfo.prenom} {selfInfo.nom} (CNE: {selfInfo.cne})
              </Text>
              <Text style={styles.disciplineText}>Discipline: {selfInfo.disciplineCode}</Text>
            </View>
          </View>
        )}

        {addSpouses &&
          spouses
            .filter((sp) => sp.nom.trim() && sp.prenom.trim())
            .map((spouse, index) => (
              <View key={index} style={styles.participantItem}>
                <Ionicons name="people" size={16} color="#1FA739" />
                <View style={styles.participantInfo}>
                  <Text style={styles.participantText}>
                    {spouse.prenom} {spouse.nom} (CNE: {spouse.cne})
                  </Text>
                  <Text style={styles.disciplineText}>Discipline: {spouse.disciplineCode}</Text>
                </View>
              </View>
            ))}

        {addChildren &&
          !isRetraite &&
          children
            .filter((ch) => ch.nom.trim() && ch.prenom.trim())
            .map((child, index) => (
              <View key={index} style={styles.participantItem}>
                <Ionicons name="school" size={16} color="#1FA739" />
                <View style={styles.participantInfo}>
                  <Text style={styles.participantText}>
                    {child.prenom} {child.nom} ({child.sexe === "M" ? "Garçon" : "Fille"},{" "}
                    {child.dateNaissance.toLocaleDateString("fr-FR")})
                  </Text>
                  <Text style={styles.disciplineText}>Discipline: {child.disciplineCode}</Text>
                </View>
              </View>
            ))}

        {addAdultChildren &&
          !isRetraite &&
          adultChildren
            .filter((ac) => ac.nom.trim() && ac.prenom.trim())
            .map((adultChild, index) => (
              <View key={index} style={styles.participantItem}>
                <Ionicons name="person-add" size={16} color="#1FA739" />
                <View style={styles.participantInfo}>
                  <Text style={styles.participantText}>
                    {adultChild.prenom} {adultChild.nom} ({adultChild.sexe === "M" ? "Homme" : "Femme"},{" "}
                    {adultChild.dateNaissance.toLocaleDateString("fr-FR")}) - CNE: {adultChild.cne}
                  </Text>
                  <Text style={styles.disciplineText}>Discipline: {adultChild.disciplineCode}</Text>
                </View>
              </View>
            ))}
      </View>

      <View style={styles.noteContainer}>
        <Ionicons name="information-circle" size={20} color="#1FA739" />
        <Text style={styles.noteText}>
          Cette demande sera soumise à validation administrative. Les détails de paiement seront communiqués après
          acceptation.
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(1)}>
          <Ionicons name="arrow-back" size={20} color="white" />
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Soumettre</Text>
          <Ionicons name="checkmark" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )

  return (
    <ImageBackground source={require("../../assets/images/background_app.jpg")} style={{ flex: 1 }}>
      <LinearGradient colors={["rgba(21, 20, 20, 0.94)", "rgba(43, 41, 41, 0.86)"]} style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />

          <View style={styles.header}>
            <TouchableOpacity onPress={router.back} style={styles.headerIcon}>
              <Ionicons name="arrow-back" size={26} color="white" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Réservation Salle de Sport</Text>
            <View style={styles.headerRight}>
              <Ionicons name="barbell" size={24} color="#1FA739" />
            </View>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 16 }}>
            {step === 0 && renderStep0()}
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
          </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  headerIcon: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  headerRight: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "rgba(50, 205, 50, 0.2)",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 24,
    padding: 28,
    marginVertical: 12,
    
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  stepIndicator: {
    alignItems: "center",
    marginBottom: 20,
  },
  stepText: {
    color: "#1FA739",
    fontSize: 15,
    fontWeight: "700",
    backgroundColor: "rgba(50, 205, 50, 0.15)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(50, 205, 50, 0.3)",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 12,
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  subtitle: {
    color: "#e5e7eb",
    fontSize: 17,
    textAlign: "center",
    marginBottom: 28,
    lineHeight: 24,
    opacity: 0.9,
    fontFamily: "System",
  },
  roleIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(50, 205, 50, 0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(50, 205, 50, 0.25)",
   
  },
  roleText: {
    color: "#1FA739",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  optionsContainer: {
    marginBottom: 28,
    gap: 16,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.1)",
  
  },
  selectedCard: {
    borderColor: "#1FA739",
    backgroundColor: "rgba(50, 205, 50, 0.08)",
  
  },
  optionText: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
    flex: 1,
    marginLeft: 16,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  selectedText: {
    color: "#1FA739",
    fontWeight: "700",
    fontFamily: "System",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(255, 149, 0, 0.08)",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 149, 0, 0.25)",
   
  },
  infoText: {
    color: "#f5780b",
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
    fontWeight: "500",
    fontFamily: "System",
  },
  sectionCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
   
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
    flex: 1,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  addButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(50, 205, 50, 0.1)",
  },
  memberCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  memberHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  memberTitle: {
    color: "#1FA739",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  inputHalf: {
    flex: 1,
  },
  label: {
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 14,
    color: "white",
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  
    fontFamily: "System",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 12,
  },
  genderOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  selectedGender: {
    backgroundColor: "#1FA739",
    borderColor: "#1FA739",
    shadowColor: "#32CD32",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  genderText: {
    color: "#ccc",
    marginLeft: 10,
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "System",
  },
  selectedGenderText: {
    color: "white",
    fontWeight: "700",
    fontFamily: "System",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    marginBottom: 16,
  
  },
  dateText: {
    color: "white",
    marginLeft: 12,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "System",
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 149, 0, 0.15)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 149, 0, 0.3)",
  },
  warningText: {
    color: "#f5780b",
    fontSize: 13,
    marginLeft: 8,
    fontWeight: "500",
    fontFamily: "System",
  },
  disciplineContainer: {
    marginBottom: 20,
  },
  disciplineHint: {
    color: "#1FA739",
    fontSize: 13,
    marginTop: 8,
    fontStyle: "italic",
    opacity: 0.8,
    lineHeight: 18,
    fontFamily: "System",
  },
  summaryCard: {
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
   
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(50, 205, 50, 0.3)",
  },
  summaryTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 12,
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  participantItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.08)",
  },
  participantInfo: {
    flex: 1,
    marginLeft: 12,
  },
  participantText: {
    color: "#e5e7eb",
    fontSize: 15,
    marginBottom: 4,
    fontWeight: "500",
    fontFamily: "System",
  },
  disciplineText: {
    color: "#1FA739",
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.9,
    fontFamily: "System",
  },
  priceText: {
    color: "#1FA739",
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "System",
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: "#32CD32",
    backgroundColor: "rgba(50, 205, 50, 0.05)",
    borderRadius: 12,
    padding: 16,
  },
  totalLabel: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.3,
    fontFamily: "System",
  },
  totalAmount: {
    color: "#1FA739",
    fontSize: 28,
    fontWeight: "800",
    letterSpacing: 0.5,
    fontFamily: "System",
  },
  noteContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "rgba(50, 205, 50, 0.08)",
    borderRadius: 16,
    padding: 16,
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(50, 205, 50, 0.2)",
  },
  noteText: {
    color: "#e5e7eb",
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
    lineHeight: 22,
    fontWeight: "500",
    fontFamily: "System",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: "#1FA739",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 16,
    flex: 1,
    shadowColor: "#32CD32",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(50, 205, 50, 0.5)",
    flex: 1,
  
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    marginHorizontal: 10,
    letterSpacing: 0.5,
    fontFamily: "System",
  },
})
