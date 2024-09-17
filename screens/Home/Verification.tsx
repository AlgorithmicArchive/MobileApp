import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useUserType } from '../../UserTypeContext';




const Verification = () => {
  const { colors } = useTheme(); // Get the colors from the current theme
  const [showOptions, setShowOptions] = useState(true); // State to show options or input fields
  const [inputType, setInputType] = useState<'OTP' | 'BackupCode'>(); // State to track selected option
  const [input, setInput] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<any>>();
  const { setUserType } = useUserType();

  const handleOptionSelect = (type: 'OTP' | 'BackupCode') => {
    setInputType(type);
    setShowOptions(false);
  };

  const handleGoBack = () => {
    setInputType(undefined);
    setShowOptions(true);
  };

  const handleSubmit = async() => {
    const formdata = new FormData();
    formdata.append("otp",inputType=="OTP"?input:'');
    formdata.append("backupCode",inputType=="BackupCode"?input:'');
    const response = await fetch("http://10.149.88.34/Home/Verification",{method:'post',body:formdata});
    const result = await response.json();
    console.log(result);
    setUserType(result.userType)
    let url = result.usrType == "Admin"?"Dashboard":"Home";
    navigation.navigate(url);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showOptions ? (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => handleOptionSelect('OTP')}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Verify with OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: colors.primary }]}
            onPress={() => handleOptionSelect('BackupCode')}
          >
            <Text style={[styles.buttonText, { color: colors.background }]}>Verify with Backup Code</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
            <Text style={[styles.goBackText, { color: colors.primary }]}>Go Back</Text>
          </TouchableOpacity>
          <TextInput
            placeholder={inputType === 'OTP' ? 'Enter OTP' : 'Enter Backup Code'}
            placeholderTextColor={colors.text}
            style={[styles.input, { borderColor: colors.primary,color:colors.text }]}
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={[styles.submitButton, { backgroundColor: colors.primary }]}
            onPress={handleSubmit}
          >
            <Text style={[styles.submitButtonText, { color: colors.background }]}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
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
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginVertical: 10,
  },
  submitButton: {
    padding: 16,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  goBackButton: {
    position: 'absolute',
    top: 16,
    left: 16,
  },
  goBackText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Verification;
