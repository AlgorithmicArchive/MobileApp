import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../styles/styles';
interface FormProps {}

const Form = (props: FormProps) => {
    const  {containerStyles} = useThemedStyles();
  return (
    <View style={[containerStyles.fullScreen]}>
      <Text style={containerStyles.text}>Service Form</Text>
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {}
});
