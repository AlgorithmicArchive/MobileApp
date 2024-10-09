import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { useThemedStyles } from '../../styles/styles';
import CutomButton from '../../components/CustomButton';
import { useForm } from 'react-hook-form';
import CustomInput from '../../components/FormComponents/CustomInput';  // Import custom component

type FormData = {
  username: string;
  password: string;
};

const Login = () => {
  const { containerStyles } = useThemedStyles();
  const [passwordVisible, setPasswordVisible] = useState(false);  // Password visibility state
  const navigation = useNavigation<StackNavigationProp<any>>();
  const {colors} = useTheme();
  // Initialize useForm
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const handleLogin = async (data: FormData) => {
    const { username, password } = data;
    const { SERVER_URL } = Constants.expoConfig?.extra || {};
    const formdata = new FormData();
    formdata.append('Username', username);
    formdata.append('Password', password);
    formdata.append('formType', 'login');

    try {
      const response = await fetch(`${SERVER_URL}/Home/Authentication`, { method: "post", body: formdata });
      const result: any = await response.json();
      if (result.status) {
        navigation.navigate('Verification');
      } else {
        Alert.alert("Error", result.response);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <View style={[containerStyles.fullScreen,{gap:20}]}>
      <View style={{width:'100%',gap:10,alignItems:'center',backgroundColor:colors.card,paddingHorizontal:20,paddingVertical:30,borderRadius:15}}>
            <Text style={[{ color: containerStyles.text.color, fontSize: 36, fontWeight: 'bold', padding: 10 }]}>
              Welcome Back
            </Text>
            {/* Username Input */}
            <CustomInput
              name="username"
              control={control}
              placeholder="Username"
              rules={{ required: 'Username is required' }}
              iconName="person-outline"
              errors={errors}
            />

            {/* Password Input */}
            <CustomInput
              name="password"
              control={control}
              placeholder="Password"
              secureTextEntry
              showPasswordToggle
              passwordVisible={passwordVisible}
              togglePasswordVisibility={() => setPasswordVisible(!passwordVisible)}
              iconName="lock-closed-outline"
              rules={{ required: 'Password is required' }}
              errors={errors}
            />

            {/* Login Button */}
            <CutomButton name='Login' onPress={handleSubmit(handleLogin)} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Login;
