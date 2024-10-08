import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

interface EditFormProps {}

const EditForm = (props: EditFormProps) => {
  return (
    <View style={styles.container}>
      <Text>EditForm</Text>
    </View>
  );
};

export default EditForm;

const styles = StyleSheet.create({
  container: {}
});
