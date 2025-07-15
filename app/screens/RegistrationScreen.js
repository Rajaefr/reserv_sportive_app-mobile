import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, View } from 'react-native';

import StepOne from '../components/StepOne';
import StepThree from '../components/StepThree';


const RegistrationScreen = () => {
  const router = useRouter();

  // ✅ Utilisation unique et correcte de onLoginPress
  const onLoginPress = () => {
    router.push('/login'); // Navigue vers login.js
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    numSpouses: 0,
    spouses: [],
    numChildren: 0,
    children: [],
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSpouseChange = (index, field, value) => {
    const newSpouses = [...formData.spouses];
    if (!newSpouses[index]) newSpouses[index] = {};
    newSpouses[index][field] = value;
    setFormData((prev) => ({ ...prev, spouses: newSpouses }));
  };

  const handleChildChange = (index, field, value) => {
    const newChildren = [...formData.children];
    if (!newChildren[index]) newChildren[index] = {};
    newChildren[index][field] = value;
    setFormData((prev) => ({ ...prev, children: newChildren }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
  };

  const renderCurrentStep = () => {
    const commonProps = {
      formData,
      handleInputChange,
      nextStep,
      prevStep,
      currentStep,
    };

    switch (currentStep) {
      case 1:
        return <StepOne {...commonProps} onLoginPress={onLoginPress} />;
     
      case 2:
        return <StepThree {...commonProps} handleSubmit={handleSubmit} />;
      default:
        return <StepOne {...commonProps} onLoginPress={onLoginPress} />;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#111827" />
      <ImageBackground
        source={require('../../assets/images/background_app.jpg')}
        resizeMode="cover"
        style={styles.background}
      >
        <LinearGradient
          colors={['rgba(34,34,39,0.45)', 'rgba(147,148,150,0.49)']}
          style={styles.gradient}
        >
          {renderCurrentStep()}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111827' },
  background: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  gradient: { flex: 1, justifyContent: 'center', width: '100%', paddingHorizontal: 16 },
});
