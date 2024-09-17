import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Index from '../screens/Home/Index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/Home/Login';
import { useTheme } from '@react-navigation/native';

interface HomeTabsProps {}

const Tab = createBottomTabNavigator();
const HomeTabs = (props: HomeTabsProps) => {
    const {colors} = useTheme();
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='Home' component={Index} options={{tabBarIcon:()=>{
            return <Ionicons name='home-outline' color={colors.primary} size={20}/>
        }}}/>
         <Tab.Screen name='Login' component={Login} options={{tabBarIcon:()=>{
            return <Ionicons name='lock-closed-outline' color={colors.primary} size={20}/>
        }}}/>
    </Tab.Navigator>
  );
};

export default HomeTabs;

