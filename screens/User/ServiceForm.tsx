import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useThemedStyles } from '../../styles/styles';
import StepForm from '../../components/FormComponents/StepForm';

interface ServiceFormProps {}

const ServiceForm = (props: ServiceFormProps) => {
    const {containerStyles} = useThemedStyles();
  return (
    <View style={containerStyles.fullScreen}>
      <StepForm/>
    </View>
  );
};

export default ServiceForm;
