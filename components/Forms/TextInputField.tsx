import * as React from 'react';
import { Text } from 'react-native';
import { TextInput, StyleSheet, View } from 'react-native';

interface TextInputFieldProps {
  label?:string,
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'ascii-capable' | 'numbers-and-punctuation' | 'url' | 'number-pad' | 'name-phone-pad' | 'decimal-pad' | 'twitter' | 'web-search' | 'visible-password';
  placeholder?: string;
  secureTextEntry?: boolean;
  onChangeText?: (text: string) => void;
  value?: string;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  label = '',
  keyboardType = 'default',
  placeholder = '',
  secureTextEntry = false,
  onChangeText,
  value
}) => {
  return (
    <View style={{width:'100%'}}>
      <Text style={{color:'#fff',fontSize: 16}}>{label}</Text>
      <TextInput 
        style={styles.input} 
        keyboardType={keyboardType}  
        placeholder={placeholder}
        placeholderTextColor='gray' 
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

export default TextInputField;

const styles = StyleSheet.create({
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:5,
    paddingHorizontal: 8,
    marginBottom: 10,
    color:'#fff',
    padding:3,
  },
});
