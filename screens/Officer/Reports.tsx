import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface ReportsProps {}

const Reports = (props: ReportsProps) => {
  return (
    <View style={styles.container}>
      <Text>Reports</Text>
    </View>
  );
};

export default Reports;

const styles = StyleSheet.create({
  container: {}
});
