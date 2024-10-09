import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ServiceNameProps {
  name: string;
}

const ServiceName: React.FC<ServiceNameProps> = ({ name }) => {
  const {colors} = useTheme();
  return <Text style={[styles.serviceName,{color:colors.primary}]}>{name}</Text>;
};

const styles = StyleSheet.create({
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ServiceName;
