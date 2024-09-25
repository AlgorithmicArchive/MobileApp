import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import Index from '../screens/User/Index';
import LogoutScreen from '../screens/LogoutScreen';
import Services from '../screens/User/Services';

interface LoginProps {
  setUserType: (userType: string | null) => void; // Function to set user type
}

const Tab = createBottomTabNavigator();
const UserTabs = () => {
  const { colors } = useTheme(); // Get colors from the theme

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.primary }, // Set background color of tab bar
        tabBarActiveTintColor: colors.background, // Active tab icon color
        tabBarInactiveTintColor: colors.text, // Inactive tab icon color
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          // Dynamically set icon based on route name
          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Services') {
            iconName = 'list-outline';
          } else if (route.name === 'Logout') {
            iconName = 'log-out-outline';
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Index} />
      <Tab.Screen name="Services" component={Services} />
      <Tab.Screen name="Logout" component={LogoutScreen} />
    </Tab.Navigator>
  );
};

export default UserTabs;
