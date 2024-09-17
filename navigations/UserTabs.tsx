import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';
import Index from '../screens/User/Index';
import LogoutScreen from '../screens/LogoutScreen';
import Services from '../screens/User/Services';

interface LoginProps {
  setUserType: (userType: string|null) => void; // Function to set user type
}

const Tab = createBottomTabNavigator();
const UserTabs = () => {
    const {colors} = useTheme();
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='Home' component={Index} options={{tabBarIcon:()=>{
            return <Ionicons name='home-outline' color={colors.primary} size={20}/>
        }}}/>
        <Tab.Screen name='Services' component={Services} options={{tabBarIcon:()=>{
            return <Ionicons name='list-outline' color={colors.primary} size={20}/>
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

export default UserTabs;

