import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const SettingsScreen = ({ toggleTheme }: { toggleTheme: () => void }) => {
  const { colors } = useTheme();
const navigation = useNavigation<StackNavigationProp<any>>();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Settings Screen</Text>
      <View style={{flexDirection:'row', gap:5,padding:5}}>
        <Button title="Toggle Theme" onPress={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});

export default SettingsScreen;
