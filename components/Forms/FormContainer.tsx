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
import { useTheme } from '@react-navigation/native';
import CustomInput from '../FormComponents/CustomInput';
import { useForm } from 'react-hook-form';
import CustomSelect from '../FormComponents/CustomSelect';
import CustomImageSelector from '../FormComponents/CustomImageSelector';
import CustomDatePicker from '../FormComponents/CustomDatePicker';
import CustomRadioButton from '../FormComponents/CustomRadioButton';

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
  const { control, handleSubmit, formState: { errors } } = useForm<any>();
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: string }[]>([]);
  const [tehsilOptions, setTehsilOptions] = useState<{ label: string; value: string }[]>([]);
  const [blockOptions, setBlockOptions] = useState<{ label: string; value: string }[]>([]);
  const {colors} = useTheme();
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
          color: colors.text,
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
        const options = isDistrictField
        ? districtOptions
        : isTehsilField
        ? tehsilOptions
        : isBlockField
        ? blockOptions
        : field.options?.map(option => ({ label: option, value: option })) ?? []; // Provide an empty array as a default

        switch (field.type) {
          case 'text':
          case 'email':
            return (
             <CustomInput key={field.name} name={field.name} control={control} placeholder={field.label} />
            );
          case 'select':
            return (
             <CustomSelect name={field.name} label={field.label} control={control} placeholder={field.label} options={options}/>
            );
          case 'file':
            return (
              <CustomImageSelector label={field.label}/>
            );
          case 'date':
            return (
              <CustomDatePicker label={field.label}/>
            );
          case 'radio':
            return (
              <CustomRadioButton options={options} selectedValue={'Father'} onValueChange={function (value: string): void {
                throw new Error('Function not implemented.');
              } }/>
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
    width: '100%',
    alignSelf: 'center',
    gap:5
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
