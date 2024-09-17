import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface IndexProps {}

const Index = (props: IndexProps) => {
  return (
    <View style={styles.container}>
      <Text>Officer Page</Text>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {}
});
