import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

type RadioButtonProps = {
  label: string;
  value: string;
  selected: boolean;
  onPress: (value: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={() => onPress(value)}
    >
      <View style={[styles.radioCircle, selected && styles.selected]}>
        {selected && <View style={styles.radioCircleFilled} />}
      </View>
      <Text style={styles.radioButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const RadioField: React.FC<{ options: string[]  }> = ({ options }) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0]);
  const [inputValue, setInputValue] = useState<string>('');

  const handlePress = (value: string) => {
    setSelectedValue(value);
    setInputValue(''); // Clear input value when selecting a new option
  };

  return (
    <View style={styles.container}>
      <View style={{flexDirection:"row", gap:5,width:'100%'}}>
        {options.map((option) => (
            <RadioButton
            key={option}
            label={option}
            value={option}
            selected={selectedValue === option}
            onPress={handlePress}
            />
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder={selectedValue}
        placeholderTextColor="gray"
        value={inputValue}
        onChangeText={setInputValue}
      />
    </View>
  );
};

export default RadioField;

const styles = StyleSheet.create({
  container: {
    width:'100%',
    marginBottom:10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2ecc71',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    borderColor: '#3498db',
  },
  radioCircleFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3498db',
  },
  radioButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color:'#fff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom:10,
    color:'#fff'
  },
});
