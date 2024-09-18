import React,{ useState }  from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import HomeTabs from '../navigations/HomeTabs';
import { DarkTheme, LightTheme } from '../themes';
import SettingsScreen from '../screens/SettingsScreen';
import Verification from '../screens/Home/Verification';
import UserTabs from '../navigations/UserTabs';
import OfficerTabs from '../navigations/OfficerTabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUserType } from '../UserTypeContext';
import Form from '../screens/User/Form';

const Stack = createNativeStackNavigator();


const Header = () => {
  const { colors } = useTheme();
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Social Welfare</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color={colors.text} />
      </TouchableOpacity>
    </View>
  );
};



const AppNavigator = () => {
    const [isDarkMode, setIsDarkMode] = useState(true); // Manage theme state here
    const toggleTheme = () => setIsDarkMode(!isDarkMode);
    const { userType } = useUserType();

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : LightTheme}>
      <Header />
      <Stack.Navigator>
        {userType ? (
          <>
           <Stack.Screen
              name="Tabs"
              options={{ headerShown: false }}
            >
              {() => userType == "Citizen"?<UserTabs  />:<OfficerTabs />}
            </Stack.Screen>
          
          </>
        ) : (
          <>
          <Stack.Screen
            name="HomeTabs"
            options={{ headerShown: false }}
            component={HomeTabs}
          />
           <Stack.Screen name='Verification' options={{headerShown:false}}>
            {()=><Verification />}
           </Stack.Screen>
          </>
        )}
        <Stack.Screen name="Settings">
              {() => <SettingsScreen toggleTheme={toggleTheme} />}
        </Stack.Screen>
        <Stack.Screen name='Form' component={Form} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
    container: {
      padding: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
      gap:25
    },
    text: {
      fontSize: 20,
    },
  });
  
