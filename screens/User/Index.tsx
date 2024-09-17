import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useThemedStyles } from '../../styles/styles';

interface IndexProps {}

const Index = (props: IndexProps) => {
    const {colors} =useTheme();
    const { containerStyles, buttonStyles } = useThemedStyles();

  return (
    <View style={[containerStyles.fullScreen,{backgroundColor:colors.background}]}>
      <Text style={[{color:colors.text}]}>User Page</Text>
    </View>
  );
};

export default Index;

