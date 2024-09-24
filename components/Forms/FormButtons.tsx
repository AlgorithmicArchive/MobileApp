import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface FormButtonsProps {
  step: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoNext: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ step, onPrevious, onNext, canGoNext }) => {
    const {colors} =useTheme();
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: step === 0 ? 'gray' : colors.primary }]}
        onPress={onPrevious}
        disabled={step === 0}
      >
        <Text style={styles.buttonText}>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: !canGoNext ? 'gray' : colors.primary }]}
        onPress={onNext}
        disabled={!canGoNext}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
      {step==4 && <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={onNext}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FormButtons;
