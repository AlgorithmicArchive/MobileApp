import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomCheckboxProps {
  name: string;
  control: any;
  label: string;
  rules?: object;
  errors?: any;
  onChangeCallback?: (isChecked: boolean) => void; // New prop for change callback
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  control,
  label,
  rules,
  errors,
  onChangeCallback,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { value, onChange } }) => (
        <View style={styles.container}>
        <TouchableOpacity
            style={styles.checkbox}
            onPress={() => {
              const newValue = !value;
              onChange(newValue);
              onChangeCallback?.(newValue); // Call the callback if provided
            }}
          >
            <Ionicons
              name={value ? 'checkbox-outline' : 'square-outline'}
              size={24}
              color={value ? '#6200ea' : '#b0b0b0'} // Color changes based on the value
            />
          </TouchableOpacity>
          <Text style={styles.label}>{label}</Text>
          {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
});

export default CustomCheckbox;
