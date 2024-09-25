import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useForm } from 'react-hook-form';
import CustomInput from './CustomInput'; // Adjust the import path as needed
import { fetchService } from '../../assets/functions/fetch';
import { useThemedStyles } from '../../styles/styles';

const StepForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const [formSections, setFormSections] = useState([]);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { containerStyles } = useThemedStyles();

  useEffect(() => {
    const loadFormSections = async () => {
      const sections = await fetchService();
      setFormSections(sections);
    };

    loadFormSections();
  }, []);

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // Handle form data submission
  };

  const handleNext = () => {
    setCurrentSectionIndex((prev) => Math.min(prev + 1, formSections.length - 1));
  };

  const handleBack = () => {
    setCurrentSectionIndex((prev) => Math.max(prev - 1, 0));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  if (!formSections.length) {
    return <Text>Loading...</Text>;
  }

  const currentSection = formSections[currentSectionIndex];

  return (
    <View style={{ width: '100%', flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{currentSection.section}</Text>
      <FlatList
        data={currentSection.fields}
        renderItem={({ item }) => (
          <CustomInput
            key={item.name}
            name={item.name}
            control={control}
            placeholder={item.label}
            rules={item.rules}  // Pass validation rules if available
            iconName={item.iconName}  // Optional: Pass icon name if specified
            secureTextEntry={item.secureTextEntry}  // Optional: For password fields
            showPasswordToggle={item.showPasswordToggle}  // Optional: For password fields
            passwordVisible={passwordVisible}  // Pass visibility state
            togglePasswordVisibility={togglePasswordVisibility}  // Pass toggle function
            errors={errors}  // Pass errors for validation
            keyboardType={item.keyboardType}  // Optional: Pass keyboard type if specified
          />
        )}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }} // Add padding to the bottom
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <Button title="Back" onPress={handleBack} disabled={currentSectionIndex === 0} />
        <Button title="Next" onPress={handleNext} disabled={currentSectionIndex === formSections.length - 1} />
        {currentSectionIndex === formSections.length - 1 && (
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        )}
      </View>
    </View>
  );
};

export default StepForm;
