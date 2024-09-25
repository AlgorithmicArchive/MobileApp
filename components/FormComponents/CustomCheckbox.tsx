import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';

interface CustomCheckboxProps {
  name: string;
  control: any;
  label: string;
  rules?: object;
  errors?: any;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  name,
  control,
  label,
  rules,
  errors,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => onChange(!value)} // Toggle checkbox state
        >
          <View style={[styles.checkbox, value ? styles.checked : styles.unchecked]}>
            {value && <Text style={styles.checkmark}>✔</Text>} {/* Checkmark */}
          </View>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#b0b0b0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#007AFF', // Background color when checked
  },
  unchecked: {
    backgroundColor: '#FFF', // Background color when unchecked
  },
  checkmark: {
    color: '#FFF', // Checkmark color
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
});

export default CustomCheckbox;
