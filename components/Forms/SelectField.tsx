import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

interface SelectFieldProps {
  label?: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, selectedValue, onValueChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(selectedValue || '');

  const handleSelect = (value: string) => {
    setCurrentValue(value);
    setShowOptions(false);
    onValueChange?.(value);
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>{label}</Text>
      <TouchableOpacity
        style={styles.selectedValue}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={styles.selectedText}>{currentValue || 'Select an option'}</Text>
      </TouchableOpacity>
      {showOptions && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.option}
                onPress={() => handleSelect(item.value)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  selectedValue: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'gray',
  },
  selectedText: {
    fontSize: 16,
    color: '#fff',
  },
  optionsContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom:10,
    maxHeight: 200, // You can adjust this height as needed
  },
  option: {
    padding: 10,
    borderBottomWidth:1,
    borderBottomColor:'#fff'
  },
  optionText: {
    color:'#fff',
    fontSize: 16,
  },
});

export default SelectField;
