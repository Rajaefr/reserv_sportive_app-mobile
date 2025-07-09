import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { StatusBar, Text, View } from 'react-native';
import StepOne from '../components/StepOne';
import StepThree from '../components/StepThree';
import StepTwo from '../components/StepTwo';


const RegistrationScreen = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numSpouses: 0,
    dateOfBirth: '',
    spouses: [],
    numChildren: 0,
    children: [],
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpouseChange = (index, field, value) => {
    const newSpouses = [...formData.spouses];
    if (!newSpouses[index]) {
      newSpouses[index] = {};
    }
    newSpouses[index][field] = value;
    setFormData(prev => ({
      ...prev,
      spouses: newSpouses
    }));
  };

  const handleChildChange = (index, field, value) => {
    const newChildren = [...formData.children];
    if (!newChildren[index]) {
      newChildren[index] = {};
    }
    newChildren[index][field] = value;
    setFormData(prev => ({
      ...prev,
      children: newChildren
    }));
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Logique de soumission du formulaire
    console.log('Formulaire soumis:', formData);
    // Ici vous pouvez ajouter l'appel API
  };

  const renderCurrentStep = () => {
    const commonProps = {
      formData,
      handleInputChange,
      nextStep,
      prevStep,
      currentStep
    };

    switch (currentStep) {
      case 1:
        return <StepOne {...commonProps} />;
      case 2:
        return (
          <StepTwo 
            {...commonProps}
            handleSpouseChange={handleSpouseChange}
            handleChildChange={handleChildChange}
          />
        );
      case 3:
        return <StepThree {...commonProps} handleSubmit={handleSubmit} />;
      default:
        return <StepOne {...commonProps} />;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#111827' }}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      
      {/* Test avec styles inline */}
      <Text style={{ color: 'yellow', fontSize: 16, padding: 10, backgroundColor: 'blue' }}>
        DEBUG: RegistrationScreen chargé - Styles inline fonctionnent
      </Text>
      
      {/* Test avec classes Tailwind */}
      <Text className="text-yellow-400 text-base p-2 bg-blue-600">
        DEBUG: RegistrationScreen chargé - Classes Tailwind
      </Text>
      
      <LinearGradient
        colors={['#111827', '#374151']}
        style={{ flex: 1 }}
      >
        {renderCurrentStep()}
      </LinearGradient>
    </View>
  );
};

export default RegistrationScreen;
