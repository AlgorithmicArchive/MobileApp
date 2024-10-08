import { useTheme } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

interface ButtonProps {
  name: string; // The label for the button
  onPress?: (event: GestureResponderEvent) => void; // Optional function to handle onPress event
}

const CutomButton: React.FC<ButtonProps> = ({ name, onPress }) => {
    const {colors} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button,{backgroundColor:colors.primary}]}
      onPress={onPress ? onPress : () => {}} // Do nothing if no onPress is provided
    >
      <Text style={[styles.buttonText,{color:colors.background}]}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width:'100%',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CutomButton;
