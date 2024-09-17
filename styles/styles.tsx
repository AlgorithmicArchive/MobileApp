// useThemedStyles.ts
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

export const useThemedStyles = () => {
  const { colors } = useTheme();

  const containerStyles = StyleSheet.create({
    fullScreen: {
      padding: 10,
      paddingTop: 50,
      backgroundColor: 'white',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

  const buttonStyles = StyleSheet.create({
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      paddingHorizontal: 40,
      borderRadius: 3,
    },
    buttonText: {
      color: colors.text,
      fontWeight: 'bold',
    }
  });

  return {
    containerStyles,
    buttonStyles,
  };
};
