import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { containerStyles } from '../../styles/styles';
import { useTheme } from '@react-navigation/native';

interface IndexProps {}

const Index = (props: IndexProps) => {
    const {colors} =useTheme();
  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background}]}>
      <Text style={[{color:colors.text}]}>User Page</Text>
    </View>
  );
};

export default Index;

