import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useThemedStyles} from '../../styles/styles';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface IndexProps {}

const Index = (props: IndexProps) => {
    const {colors} =useTheme();
    const navigation = useNavigation<StackNavigationProp<any>>();
    const { containerStyles, buttonStyles } = useThemedStyles();
  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background,gap:5}]}>
      <Image source={require('../../assets/socialwelfare.jpg')} style={{width:300,height:300}} />
      <TouchableOpacity style={buttonStyles.button} onPress={()=>navigation.navigate('Login')}>
            <Text style={buttonStyles.buttonText}>Get Started</Text>
          </TouchableOpacity>
    </View>
  );
};

export default Index;


