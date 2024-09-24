// FormContainer.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import TextInputField from './TextInputField';
import SelectField from './SelectField';
import FileInputField from './FileInputField';
import DatePickerField from './DatePickerField';
import RadioField from './RadioField';
import { Field } from '../../types';
import { fetchBlocks, fetchDistricts, fetchTehsils } from '../../assets/functions/fetch';

interface FormContainerProps {
  formElements: Field[];
  formValues: Record<string, any>;
  formErrors: Record<string, string>;
  step: number;
  handleInputChange: (name: string, value: string, field: Field) => void;
  setParentScrollEnabled: (enabled: boolean) => void; // New prop to control parent scroll
}

const FormContainer: React.FC<FormContainerProps> = ({
  formElements,
  formValues,
  formErrors,
  step,
  handleInputChange,
  setParentScrollEnabled,
}) => {
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: string }[]>([]);
  const [tehsilOptions, setTehsilOptions] = useState<{ label: string; value: string }[]>([]);
  const [blockOptions, setBlockOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const districtField = formElements.find((field) => field.name.includes('District'));
    if (districtField) {
      fetchDistricts().then((districts) => {
        const options = districts.map((district: any) => ({
          label: district.districtName,
          value: district.districtId.toString(),
        }));
        setDistrictOptions(options); // Fix: set district options correctly
      });
    }
  }, [formElements]);
  
  // Fetch tehsils and blocks when district changes
  useEffect(() => {
    const fetchTehsilsAndBlocks = async (districtId: number) => {
      try {
        const tehsils = await fetchTehsils(districtId);
        const tehsilOptions = tehsils.map((tehsil: any) => ({
          label: tehsil.tehsilName, // Fix: Use tehsilName instead of districtName
          value: tehsil.tehsilId.toString(), // Fix: Use tehsilId instead of districtId
        }));
        setTehsilOptions(tehsilOptions);
        
        // Assuming there is a fetchBlocks function to get block options
        const blocks = await fetchBlocks(districtId); 
        const blockOptions = blocks.map((block: any) => ({
          label: block.blockName,
          value: block.blockId.toString(),
        }));
        setBlockOptions(blockOptions);
        
      } catch (error) {
        console.error(`Failed to fetch tehsils and blocks for district ${districtId}:`, error);
      }
    };
  
    if (formValues.PresentDistrict) {
      fetchTehsilsAndBlocks(formValues.PresentDistrict);
    }
  
    if (formValues.PermanentDistrict) {
      fetchTehsilsAndBlocks(formValues.PermanentDistrict);
    }
  }, [formValues.PresentDistrict, formValues.PermanentDistrict]);
  
  


  const Title =
    step === 0
      ? 'General Details'
      : step === 1
      ? 'Present Address'
      : step === 2
      ? 'Permanent Address'
      : step === 3
      ? 'Bank Details'
      : 'Documents';

  return (
    <View style={styles.formContainer}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          color: '#fff',
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        {Title}
      </Text>
      {formElements.map((field: Field, index: number) => {
        const keyboardType =
          field.type === 'text'
            ? 'default'
            : field.type === 'email'
            ? 'email-address'
            : 'default';
        const secureTextEntry = field.type === 'password';
        const isDistrictField = field.name.includes('District');
        const isTehsilField = field.name.includes('Tehsil');
        const isBlockField = field.name.includes('Block');
        const options = isDistrictField ? districtOptions :isTehsilField?tehsilOptions:isBlockField?blockOptions: field.options?.map(option => ({ label: option, value: option }));

        switch (field.type) {
          case 'text':
          case 'email':
            return (
              <View key={field.name || index} style={styles.fieldContainer}>
                <TextInputField
                  label={field.label}
                  keyboardType={keyboardType}
                  placeholder={field.label}
                  secureTextEntry={secureTextEntry}
                  onChangeText={(value) => handleInputChange(field.name, value, field)}
                  value={formValues[field.name] || ''}
                />
                {formErrors[field.name] ? (
                  <Text style={styles.errorText}>{formErrors[field.name]}</Text>
                ) : null}
              </View>
            );
          case 'select':
            return (
              <View key={field.name || index} style={styles.fieldContainer}>
                <SelectField
                  label={field.label}
                  options={options || []}
                  selectedValue={formValues[field.name] || ''}
                  onValueChange={(value) => handleInputChange(field.name, value, field)}
                  setParentScrollEnabled={setParentScrollEnabled} // Pass the prop to SelectField
                />
                {formErrors[field.name] ? (
                  <Text style={styles.errorText}>{formErrors[field.name]}</Text>
                ) : null}
              </View>
            );
          case 'file':
            return (
              <View key={field.name || index} style={styles.fieldContainer}>
                <FileInputField
                  label={field.label}
                  onImageSelected={(uri) => handleInputChange(field.name, uri, field)}
                  fileValue={formValues[field.name]||''}
                />
                {formErrors[field.name] ? (
                  <Text style={styles.errorText}>{formErrors[field.name]}</Text>
                ) : null}
              </View>
            );
          case 'date':
            return (
              <View key={field.name || index} style={styles.fieldContainer}>
                <DatePickerField
                  label={field.label}
                  onChange={(value) => handleInputChange(field.name, value, field)}
                  value={formValues[field.name] || ''}
                />
                {formErrors[field.name] ? (
                  <Text style={styles.errorText}>{formErrors[field.name]}</Text>
                ) : null}
              </View>
            );
          case 'radio':
            return (
              <View key={field.name || index} style={styles.fieldContainer}>
                <RadioField
                  options={field.options || []}
                  selectedValue={formValues[field.name] || 'Father'} // Set the default radio button value
                  textValue={formValues[`${field.label}`] || ''} // Handle text input value if any
                  onButtonPress={(value: string) => handleInputChange(field.name, value, field)} // Update radio button value
                  onChangeText={(value: string) => handleInputChange(`${field.label}`, value, field)} // Update text input value
                />
                {formErrors[field.name] ? (
                  <Text style={styles.errorText}>{formErrors[field.name]}</Text>
                ) : null}
              </View>
            );
          default:
            return null;
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    borderWidth: 2,
    borderColor: '#fff',
    borderStyle: 'solid',
    borderRadius: 5,
    width: '90%',
    alignSelf: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginBottom: 8,
    fontSize: 12,
  },
  fieldContainer: {
    marginBottom: 16,
  },
});

export default FormContainer;
