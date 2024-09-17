// LogoutScreen.js
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { useUserType } from '../UserTypeContext';
import { containerStyles } from '../styles/styles';

const LogoutScreen = ( ) => {
 const navigation = useNavigation<StackNavigationProp<any>>();
 const { setUserType } = useUserType();
 const {colors} = useTheme();
  const handleLogout = () => {
    setUserType(null);
    navigation.navigate('Home'); 
  };

  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background}]}>
      <Text style={{color:colors.text}}>Are you sure you want to Logout?</Text>
      <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={handleLogout}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Logout</Text>
          </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});