import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker'; // Import Picker from the correct package
import { useTheme } from '@react-navigation/native';

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
  const {colors} = useTheme();
  return (
    <View style={{ width: '100%' }}>
      <Text style={[styles.label,{color:colors.primary}]}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange: formOnChange, value ,onBlur} }) => (
          <View style={[styles.selectContainer,{borderColor:colors.primary,borderWidth:1}]}>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                formOnChange(itemValue); // Update react-hook-form's value
                onChange(itemValue); // Also trigger the passed onChange to update district
              }}
              onBlur={onBlur}
              style={[styles.picker,{color:colors.text}]}
              prompt={placeholder}
            >
              <Picker.Item style={{ color: colors.text }} label={'Select Option'} value="" />
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
    fontWeight:'bold'
  },
  selectContainer: {
    borderRadius: 10,
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
