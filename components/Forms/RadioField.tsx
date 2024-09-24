import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

type RadioFieldProps = {
  options: string[];
  selectedValue: string;
  onButtonPress: (value: string) => void;
  onChangeText: (value: string) => void;
  textValue: string;
};

const RadioField: React.FC<RadioFieldProps> = ({
  options,
  selectedValue,
  onButtonPress,
  onChangeText,
  textValue,
}) => {
  // Initialize local state with the selected value
  const [selectedRadio, setSelectedRadio] = useState(selectedValue);

  // Update the selected radio button when props.selectedValue changes
  useEffect(() => {
    setSelectedRadio(selectedValue);
    onButtonPress(selectedValue);
  }, [selectedValue]);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioButtonContainer}
            onPress={() => {
              setSelectedRadio(option);
              onButtonPress(option); // Trigger the parent update when a button is pressed
            }}
          >
            <View
              style={[
                styles.radioCircle,
                selectedRadio.toLowerCase() === option.toLowerCase() ? styles.selected : null,
              ]}
            >
              {selectedRadio.toLowerCase() === option.toLowerCase() && (
                <View style={styles.radioCircleFilled} />
              )}
            </View>
            <Text style={styles.radioButtonText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder={selectedValue} // Use a static or descriptive placeholder
        placeholderTextColor="gray"
        onChangeText={onChangeText} // Trigger parent update when text is changed
        value={textValue}
      />
    </View>
  );
};

export default RadioField;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    borderColor: '#3498db', // Make sure this color is visible and distinct
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
    color: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    color: '#fff',
  },
});
