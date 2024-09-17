import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation, useTheme } from '@react-navigation/native';
import Index from '../screens/Officer/Index';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import LogoutScreen from '../screens/LogoutScreen';


const Tab = createBottomTabNavigator();
const OfficerTabs = () => {
    const {colors} = useTheme();

  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='Home' component={Index} options={{tabBarIcon:()=>{
            return <Ionicons name='home-outline' color={colors.primary} size={20}/>
        }}}/>
        <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{tabBarIcon:()=>{
          return <Ionicons name='log-out-outline' color={colors.primary} size={20}/>
      }}}
      />
    </Tab.Navigator>
  );
};

export default OfficerTabs;

