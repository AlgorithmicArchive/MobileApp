// useThemedStyles.ts
import { useTheme } from '@react-navigation/native';
import { StyleSheet } from 'react-native';


export const useThemedStyles = () => {
  const { colors } = useTheme();

  const containerStyles = StyleSheet.create({
    fullScreen: {
      padding: 10,
      paddingTop: 50,
      backgroundColor: colors.background,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text:{
      color:colors.text
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

  const tableStyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      width: '100%',
      borderRadius:5,
    },
    header: {
      flexDirection: 'row',
      backgroundColor: colors.primary,
      borderRadius:5,
    },
    headerText: {
      width: '25%', // Adjust width as needed
      fontWeight: 'bold',
      color: colors.background,
      borderWidth: 0.5,
      borderColor: '#000',
      borderStyle: 'solid',
      textAlign: 'center',
      paddingVertical: 10,
      paddingHorizontal: 5, // Add padding to improve spacing
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      backgroundColor: colors.text,
    },
    cell: {
      width: '25%', // Match header width
      color: colors.background,
      borderWidth: 0.5,
      borderColor: '#000',
      borderStyle: 'solid',
      paddingVertical: 10,
      paddingHorizontal: 5, // Add padding to improve spacing
      textAlign: 'center',
    },
    button: {
      backgroundColor: colors.primary,
      padding: 10,
      height: 40,
      borderRadius: 5,
      display:'flex',
      marginHorizontal:'auto',
      marginVertical:'auto'
    },
    buttonText: {
      color: colors.text,
      fontWeight:'bold'
    },
    searchInput: {
      marginBottom: 10,
      padding: 10,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
    },
  });
  
 
  
  return {
    containerStyles,
    buttonStyles,
    tableStyles
  };
};
