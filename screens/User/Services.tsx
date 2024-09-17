import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { containerStyles } from '../../styles/styles';
import { useTheme } from '@react-navigation/native';

interface ServicesProps {}

const Services = (props: ServicesProps) => {
    const {colors} = useTheme();
  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background}]}>
      <Text>Services</Text>
    </View>
  );
};

export default Services;


