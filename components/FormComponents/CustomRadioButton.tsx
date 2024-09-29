import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface RadioButtonOption {
  label: string;
  value: string 
}

interface CustomRadioButtonProps {
  name: string;
  control: any;
  options: RadioButtonOption[];
  rules?: object;
  errors?: any;
  defaultValue?: string  // Optional prop for default value
}

const CustomRadioButton: React.FC<CustomRadioButtonProps> = ({
  name,
  control,
  options,
  rules,
  errors,
  defaultValue,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue || options[0]?.value} // Set default value to the first option's value if not provided
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.radioButtonContainer}
              onPress={() => onChange(option.value)}
            >
              <Ionicons
                name={value.toLowerCase() === option.value.toLowerCase() ? 'radio-button-on-outline' : 'radio-button-off-outline'}
                size={24}
                color={value.toLowerCase() === option.value.toLowerCase() ? '#007bff' : '#b0b0b0'}
                style={styles.icon}
              />
              <Text style={styles.label}>{option.label}</Text>
            </TouchableOpacity>
          ))}
          {errors && errors[name] && (
            <Text style={styles.errorText}>{errors[name]?.message}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'stretch',
  },
});

export default CustomRadioButton;
