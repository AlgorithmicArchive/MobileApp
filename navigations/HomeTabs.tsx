import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Index from '../screens/Home/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/Home/Login';
import { useTheme } from '@react-navigation/native';

interface HomeTabsProps {}

const Tab = createBottomTabNavigator();

const HomeTabs = (props: HomeTabsProps) => {
  const { colors } = useTheme(); // Access the theme colors

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.primary }, // Set tab bar background color
        tabBarIcon: ({ color, size }) => {
          let iconName: string = ''; // Set default value

          if (route.name === 'Home') {
            iconName = 'home-outline';
          } else if (route.name === 'Login') {
            iconName = 'log-in-outline';
          }

          return <Ionicons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: colors.background, // Active tab icon color
        tabBarInactiveTintColor: colors.text, // Inactive tab icon color
      })}
    >
      <Tab.Screen name="Home" component={Index} />
      <Tab.Screen name="Login" component={Login} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
