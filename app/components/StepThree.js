import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const ProgressBar = ({ step }) => (
  <View className="flex-row justify-between mb-6">
    {[1, 2, 3].map((stepNum) => (
      <View key={stepNum} className="flex-1 mx-1">
        <View 
          className={`h-2 rounded-full ${
            stepNum <= step ? 'bg-green-500' : 'bg-gray-600'
          }`}
        />
      </View>
    ))}
  </View>
);

const StepThree = ({ formData, handleInputChange, handleSubmit, currentStep }) => {
  return (
    <View className="flex-1 justify-center px-6">
      <View className="bg-gray-800 rounded-2xl p-6 mx-4">
        <Text className="text-white text-2xl font-bold mb-6">
          Étape 3 de 3
        </Text>
        <ProgressBar step={currentStep} />
        
        <Text className="text-white text-2xl font-bold mb-6">
          Définir le Mot de Passe
        </Text>

        <View className="mb-4">
          <Text className="text-white text-sm mb-2">Mot de passe</Text>
          <TextInput
            className="bg-gray-700 text-white p-4 rounded-2xl"
            placeholder="Entrez votre mot de passe"
            placeholderTextColor="#9CA3AF"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            secureTextEntry
          />
        </View>

        <View className="mb-6">
          <Text className="text-white text-sm mb-2">Confirmer le mot de passe</Text>
          <TextInput
            className="bg-gray-700 text-white p-4 rounded-2xl"
            placeholder="Confirmer votre mot de passe"
            placeholderTextColor="#9CA3AF"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="bg-green-500 p-4 rounded-2xl"
          onPress={handleSubmit}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Créer le Compte
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepThree;