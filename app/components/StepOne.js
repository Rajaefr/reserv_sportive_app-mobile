import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

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

const StepOne = ({ formData, handleInputChange, nextStep, currentStep }) => {
  return (
    <View className="flex-1 justify-center px-6">
      <View className="bg-gray-800 rounded-2xl p-6 mx-4">
        <Text className="text-white text-2xl font-bold mb-6">
          Étape 1 de 3
        </Text>
        <ProgressBar step={currentStep} />
        
        <Text className="text-white text-2xl font-bold mb-6">
          Créer un Compte
        </Text>

        <View className="mb-4">
          <Text className="text-white text-sm mb-2">Nom Complet</Text>
          <TextInput
            className="bg-gray-700 text-white p-4 rounded-2xl"
            placeholder="Mohamed Ali"
            placeholderTextColor="#9CA3AF"
            value={formData.fullName}
            onChangeText={(text) => handleInputChange('fullName', text)}
          />
        </View>

        <View className="mb-4">
          <Text className="text-white text-sm mb-2">Email</Text>
          <TextInput
            className="bg-gray-700 text-white p-4 rounded-2xl"
            placeholder="Email Address"
            placeholderTextColor="#9CA3AF"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
            keyboardType="email-address"
          />
        </View>

        <View className="mb-6">
          <Text className="text-white text-sm mb-2">Numéro de Téléphone</Text>
          <TextInput
            className="bg-gray-700 text-white p-4 rounded-2xl"
            placeholder="+212"
            placeholderTextColor="#9CA3AF"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity
          className="bg-green-500 p-4 rounded-2xl"
          onPress={nextStep}
        >
          <Text className="text-white text-center text-lg font-semibold">
            Continuer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StepOne;