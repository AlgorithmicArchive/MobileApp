import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  label: string; // New prop for the label
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  name,
  control,
  placeholder,
  options,
  rules,
  iconName,
  errors,
  label, // Destructure label prop
}) => {
  return (
    <View style={{ width: '100%' }}>
      <Text style={styles.label}>{label}</Text>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.selectContainer}>
            {iconName && <Ionicons name={iconName} size={20} color="#b0b0b0" style={styles.icon} />}
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue);
              }}
              onBlur={onBlur}
              style={styles.picker}
              prompt={placeholder} // Placeholder for iOS
            >
              <Picker.Item label={placeholder} value="" />
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
    marginBottom: 5,
  },
  selectContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
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
