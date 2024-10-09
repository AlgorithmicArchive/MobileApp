import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface FormButtonsProps {
  step: number;
  onPrevious: () => void;
  onNext: (data: any) => void; // Ensure it gets the validated form data
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  canGoNext: boolean;
}

const FormButtons: React.FC<FormButtonsProps> = ({ step, onPrevious, onNext, canGoNext, handleSubmit }) => {
  const { colors } = useTheme();

  // Wrap the onNext function in handleSubmit to ensure validation occurs first
  const handleNextClick = (data: any) => {
    onNext(data); // Call the onNext function after successful validation
  };

  return (
    <View style={styles.buttonContainer}>
      {/* Previous Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: step === 0 ? 'gray' : colors.primary }]}
        onPress={onPrevious}
        disabled={step === 0}
      >
        <Text style={[styles.buttonText,{color:colors.background}]}>Previous</Text>
      </TouchableOpacity>

      {/* Next or Submit Button */}
      {step < 4 ? (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: !canGoNext ? 'gray' : colors.primary }]}
          onPress={handleSubmit(handleNextClick)} // Ensure validation and pass the callback
          disabled={!canGoNext}
        >
          <Text style={[styles.buttonText,{color:colors.background}]}>Next</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={handleSubmit(handleNextClick)} // Use handleSubmit for the final submit button as well
        >
          <Text style={[styles.buttonText,{color:colors.background}]}>Submit</Text>
        </TouchableOpacity>
      )}
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
  },
});

export default FormButtons;
