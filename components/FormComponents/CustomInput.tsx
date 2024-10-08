import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, KeyboardTypeOptions } from 'react-native'; // Import KeyboardTypeOptions
import { Controller } from 'react-hook-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

interface CustomInputProps {
  name: string;
  control: any;
  placeholder: string;
  rules?: object;
  iconName?: string;
  secureTextEntry?: boolean;
  showPasswordToggle?: boolean;  // New prop for toggling password visibility
  passwordVisible?: boolean;
  togglePasswordVisibility?: () => void;
  errors?: any;
  keyboardType?: KeyboardTypeOptions;  // Use KeyboardTypeOptions for keyboardType
}

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  placeholder,
  rules,
  iconName,
  secureTextEntry = false,
  showPasswordToggle = false,
  passwordVisible = false,
  togglePasswordVisibility,
  errors,
  keyboardType = 'default',  // Set a default value for keyboardType
}) => {

  const {colors} = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={{ width: '100%' }}>
          {placeholder && <Text style={{padding:3,fontSize:14,fontWeight:'bold',color:colors.primary}}>{placeholder}</Text>}
          <View style={[styles.inputContainer,{borderColor:colors.primary,borderWidth:1}]}>
            {iconName && <Ionicons name={iconName} size={20} color="#b0b0b0" style={styles.icon} />}
            <TextInput
              style={[styles.input,{color:colors.text}]}
              placeholder={placeholder}
              placeholderTextColor={colors.text}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry && !passwordVisible}  // Secure text based on visibility toggle
              keyboardType={keyboardType}  // Apply keyboardType from KeyboardTypeOptions
            />
            {showPasswordToggle && (
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Ionicons
                  name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#b0b0b0"
                />
              </TouchableOpacity>
            )}
          </View>
          {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    alignSelf: 'stretch',
  },
});

export default CustomInput;
