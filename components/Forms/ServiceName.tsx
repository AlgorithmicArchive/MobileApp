import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ServiceNameProps {
  name: string;
}

const ServiceName: React.FC<ServiceNameProps> = ({ name }) => {
  return <Text style={styles.serviceName}>{name}</Text>;
};

const styles = StyleSheet.create({
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 20,
  },
});

export default ServiceName;
