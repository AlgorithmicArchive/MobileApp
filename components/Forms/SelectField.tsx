import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

interface SelectFieldProps {
  label?: string;
  options: { label: string; value: string }[];
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  setParentScrollEnabled?: (enabled: boolean) => void; // Prop to control parent scroll
}

const SelectField: React.FC<SelectFieldProps> = ({ label, options, selectedValue, onValueChange, setParentScrollEnabled }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(selectedValue || '');
  const [currentText, setCurrentText] = useState('');

  // Update the display text when the selected value changes (e.g., when navigating back and forth between steps)
  useEffect(() => {
    const selectedOption = options.find(option => option.value === selectedValue);
    if (selectedOption) {
      setCurrentValue(selectedOption.value);
      setCurrentText(selectedOption.label); // Display the selected label
    } else {
      setCurrentText('Select an option'); // Default display when no option is selected
    }
  }, [selectedValue, options]);  // This ensures the component reacts when selectedValue changes

  const handleSelect = (item: any) => {
    setCurrentValue(item.value);
    setCurrentText(item.label);
    setShowOptions(false);
    setParentScrollEnabled?.(true); // Re-enable parent scrolling when dropdown is closed
    onValueChange?.(item.value); // Pass the selected value to the parent component
  };

  useEffect(() => {
    if (showOptions) {
      setParentScrollEnabled?.(false); // Disable parent scrolling when dropdown is open
    } else {
      setParentScrollEnabled?.(true); // Enable parent scrolling when dropdown is closed
    }
  }, [showOptions, setParentScrollEnabled]);  

  return (
    <View style={styles.container}>
      <Text style={{ color: '#fff' }}>{label}</Text>
      <TouchableOpacity
        style={styles.selectedValue}
        onPress={() => setShowOptions(!showOptions)}
      >
        <Text style={styles.selectedText}>{currentText || 'Select an option'}</Text>
      </TouchableOpacity>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
            {options.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.option}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.optionText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    marginBottom: 10,
    maxHeight: 200, // Limit the height to make it scrollable if options exceed the height
  },
  scrollView: {
    maxHeight: 200, // Limit the height to make it scrollable
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SelectField;
