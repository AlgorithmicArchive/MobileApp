import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the correct package

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  name: string;
  control: any;
  placeholder: string;
  options: Option[];
  rules?: object;
  iconName?: string;
  errors?: any;
  label: string;
  onChange: (value: any) => void; // Passed down onChange handler
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  placeholder,
  options,
  rules,
  errors,
  label,
  onChange,
}) => {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange: formOnChange, value ,onBlur} }) => (
          <View style={styles.selectContainer}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                formOnChange(itemValue); // Update react-hook-form's value
                onChange(itemValue); // Also trigger the passed onChange to update district
              }}
              onBlur={onBlur}
              style={styles.picker}
              prompt={placeholder}
            >
              <Picker.Item style={{ color: 'gray' }} label={'Select Option'} value="" />
              {options.map((option) => (
                <Picker.Item key={option.value} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        )}
      />
      {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
  },
  selectContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'stretch',
  },
});

export default CustomSelect;
