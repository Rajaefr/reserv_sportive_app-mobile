import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

const StepTwo = ({
  formData,
  handleSpouseChange,
  handleChildChange,
  nextStep,
  prevStep,
  currentStep,
}) => {
  return (
    <View className="flex-1 justify-center px-6">
      <View className="bg-gray-800 rounded-2xl p-6 mx-4">
        <Text className="text-white text-2xl font-bold mb-6">
          Étape 2 de 3
        </Text>
        {/* Add spouse fields */}
        <Text className="text-white mb-2">Nombre d'épouses</Text>
        <TextInput
          className="bg-gray-700 text-white p-4 rounded-2xl mb-4"
          placeholder="0"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={formData.numSpouses.toString()}
          onChangeText={(text) =>
            handleInputChange('numSpouses', parseInt(text) || 0)
          }
        />
        {/* Optionally add children fields similarly */}

        <View className="flex-row justify-between">
          <TouchableOpacity
            className="bg-gray-500 p-4 rounded-2xl flex-1 mr-2"
            onPress={prevStep}
          >
            <Text className="text-white text-center">Retour</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 p-4 rounded-2xl flex-1 ml-2"
            onPress={nextStep}
          >
            <Text className="text-white text-center">Suivant</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StepTwo;
