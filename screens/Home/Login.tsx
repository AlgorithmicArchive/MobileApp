import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StackNavigationProp } from '@react-navigation/stack';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const { colors } = useTheme();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigation = useNavigation<StackNavigationProp<any>>();

  const handleLogin =  async() =>{
    const formdata = new FormData();
    formdata.append('Username',username);
    formdata.append('Password',password);
    formdata.append('formType','login');
  
    const response = await fetch("http://10.149.88.34/Home/Authentication",{method:"post",body:formdata});
    const result:any = await response.json();
    if(result.status) navigation.navigate('Verification');
    else Alert.alert("Error",result.response)
  
  }

  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer,{backgroundColor:colors.background,borderStyle:'solid',borderWidth:3,borderColor:colors.text}]}>
        <Ionicons name="person-circle-outline" size={100} color={colors.text} />
        <Text style={[styles.title, { color: colors.text }]}>Login</Text>
        
        <TextInput
          placeholder="Username"
          placeholderTextColor={colors.text}
          style={[styles.input, { color: colors.text,borderColor: colors.text }]}
          value={username}
          onChangeText={setUsername}
        />
        
        <TextInput
          placeholder="Password"
          placeholderTextColor={colors.text}
          secureTextEntry
          style={[styles.input, { color: colors.text,borderColor: colors.text }]}
          value={password}
          onChangeText={setPassword}
        />
        
        <TouchableOpacity style={[styles.button, { backgroundColor: colors.text}]} onPress={handleLogin}>
          <Text style={[styles.buttonText, { color: colors.background }]} >Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width:'90%',
    maxWidth: 400,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Login;
