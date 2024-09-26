import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomInput from '../FormComponents/CustomInput';
import CustomSelect from '../FormComponents/CustomSelect';
import CustomImageSelector from '../FormComponents/CustomImageSelector';
import CustomDatePicker from '../FormComponents/CustomDatePicker';
import CustomRadioButton from '../FormComponents/CustomRadioButton';
import { Field } from '../../types';
import { capitalizeAlphabets, validationMap } from '../../assets/functions/formvalidations';
import { fetchDistricts, fetchTehsils, fetchBlocks } from '../../assets/functions/fetch';

interface FormContainerProps {
  formElements: Field[];
  control: any;
  errors: any;
  step: number;
  handleInputChange: (name: string, value: string, field: Field) => void;
  setParentScrollEnabled: (enabled: boolean) => void;
}

const FormContainer: React.FC<FormContainerProps> = ({
  formElements,
  control,
  errors,
  step,
  handleInputChange,
}) => {
  const [districtOptions, setDistrictOptions] = useState<{ label: string; value: any }[]>([]);
  const [tehsilOptions, setTehsilOptions] = useState<{ label: string; value: any }[]>([]);
  const [blockOptions, setBlockOptions] = useState<{ label: string; value: any }[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<any>(null);

  // Fetch districts on component mount
  useEffect(() => {
    const fetchInitialData = async () => {
      const districts = await fetchDistricts();
      const mappedDistricts = districts.map((district: any) => ({
        label: district.districtName,
        value: district.districtId,
      }));
      setDistrictOptions(mappedDistricts);
    };
    fetchInitialData();
  }, []);

  // Fetch tehsils and blocks when district is selected
  useEffect(() => {
    if (selectedDistrict) {
      const fetchTehsilsAndBlocks = async () => {
        const tehsils = await fetchTehsils(selectedDistrict);
        const mappedTehsils = tehsils.map((tehsil: any) => ({
          label: tehsil.tehsilName,
          value: tehsil.tehsilId,
        }));
        setTehsilOptions(mappedTehsils);

        const blocks = await fetchBlocks(selectedDistrict);
        const mappedBlocks = blocks.map((block: any) => ({
          label: block.blockName,
          value: block.blockId,
        }));
        setBlockOptions(mappedBlocks);
      };

      fetchTehsilsAndBlocks();
    }
  }, [selectedDistrict]);

  const renderField = (field: Field) => {
    const errorMessage = errors[field.name]?.message;

    const runValidations = async (field: any, value: string): Promise<true | string> => {
      if (!Array.isArray(field.validationFunctions)) return true;
  
      // Apply the capitalization
      const capitalizedValue = capitalizeAlphabets(field, value);
      
      // Run any additional validation functions after capitalization
      for (const validationFn of field.validationFunctions) {
        const validate = validationMap[validationFn];
        if (validate) {
          const error = await validate(field, capitalizedValue || value);
          if (error) return error;
        }
      }
  
      return true;
    };
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <CustomInput
              name={field.name}
              placeholder={field.label}
              control={control}
              rules={{ validate: (value: any) => runValidations(field, value) }}
              errors={errors}
            />
          </View>
        );
      case 'select':
        let options = field.options?.map((opt) => ({ label: opt, value: opt })) || [];
        if (field.name.includes('District')) options = districtOptions;
        if (field.name.includes('Tehsil')) options = tehsilOptions;
        if (field.name.includes('Block')) options = blockOptions;

        return (
          <View key={field.name} style={styles.fieldContainer}>
            <CustomSelect
              onChange={(value) => {
                handleInputChange(field.name, value, field);
                if (field.name.includes('District')) {
                  setSelectedDistrict(value); // Trigger fetching tehsils and blocks when district changes
                }
              }}
              label={field.label}
              options={options}
              name={field.name}
              control={control}
              rules={{ validate: (value: any) => runValidations(field, value) }}
              errors={errors}
              placeholder={field.label}
            />
          </View>
        );
      case 'file':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <CustomImageSelector
              label={field.label}
              control={control}
              name={field.name}
              rules={{ validate: (value: any) => runValidations(field, value) }}
              errors={errors}
            />
          </View>
        );
      case 'date':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <CustomDatePicker
              label={field.label}
              control={control}
              name={field.name}
              rules={{ validate: (value: any) => runValidations(field, value) }}
              errors={errors}
            />
          </View>
        );
      case 'radio':
        return (
          <View key={field.name} style={styles.fieldContainer}>
            <CustomRadioButton
              options={field.options?.map((opt) => ({ label: opt, value: opt })) || []}
              selectedValue={'Father'}
              onValueChange={(value) => handleInputChange(field.name, value, field)}
            />
            {errorMessage && typeof errorMessage === 'string' && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.title}>
        {step === 0
          ? 'General Details'
          : step === 1
          ? 'Present Address'
          : step === 2
          ? 'Permanent Address'
          : step === 3
          ? 'Bank Details'
          : 'Documents'}
      </Text>
      {formElements.map(renderField)}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
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
