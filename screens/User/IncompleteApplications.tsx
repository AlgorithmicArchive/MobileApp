import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface IncompleteApplicationsProps {}

const IncompleteApplications = (props: IncompleteApplicationsProps) => {
  return (
    <View style={styles.container}>
      <Text>IncompleteApplications</Text>
    </View>
  );
};

export default IncompleteApplications;

const styles = StyleSheet.create({
  container: {}
});
