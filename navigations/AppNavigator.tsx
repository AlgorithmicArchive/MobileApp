import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation, useTheme } from '@react-navigation/native';
import HomeTabs from '../navigations/HomeTabs';
import { SunsetLagoon, LightTheme } from '../themes';
import SettingsScreen from '../screens/SettingsScreen';
import Verification from '../screens/Home/Verification';
import UserTabs from '../navigations/UserTabs';
import OfficerTabs from '../navigations/OfficerTabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useUserType } from '../UserTypeContext';
import Form from '../screens/User/Form';
import AcknowledgementScreen from '../screens/User/Acknowledgement';
import ApplicationStatus from '../screens/User/ApplicationStatus';
import UserDetails from '../screens/Officer/UserDetails';

const Stack = createNativeStackNavigator();

// Header Component that uses theme
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

// App Navigator Component
const AppNavigator = () => {
  const [isDarkMode, setIsDarkMode] = useState(true); // Manage theme state here
  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  const { userType } = useUserType();

  // Use useTheme here
  const theme = isDarkMode ? SunsetLagoon : LightTheme;
  return (
    <NavigationContainer theme={theme}>
      <Header />
      <Stack.Navigator>
        {userType ? (
          <>
            <Stack.Screen
              name="Tabs"
              options={{ headerShown: false }}
            >
              {() => userType === 'Citizen' ? <UserTabs /> : <OfficerTabs />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="HomeTabs"
              options={{ headerShown: false }}
              component={HomeTabs}
            />
            <Stack.Screen name="Verification" options={{ headerShown: false }}>
              {() => <Verification />}
            </Stack.Screen>
          </>
        )}
        <Stack.Screen name="Settings">
          {() => <SettingsScreen toggleTheme={toggleTheme} />}
        </Stack.Screen>
        <Stack.Screen name="Form" component={Form} options={{ headerShown: false }} />
        <Stack.Screen name="Acknowledgement" component={AcknowledgementScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ApplicationStatus" component={ApplicationStatus} options={{ headerShown: false }} />
        <Stack.Screen name = "UserDetails" component={UserDetails} options={{headerShown:false}} />
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
    justifyContent: 'center',
    gap: 25,
  },
  text: {
    fontSize: 20,
  },
});
