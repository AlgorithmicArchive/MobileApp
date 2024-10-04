import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomCardProps {
  bgColor: string;
  textColor: string;
  title: string;
  icon: string;
  value: number;
  onPress?: () => void; // Optional onPress prop to handle click events
}

const CustomCard = (props: CustomCardProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, { backgroundColor: props.bgColor }]}>
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
        <Ionicons name={props.icon} size={30} color={props.textColor} />
        <Text style={{ fontSize: 18, color: props.textColor }}>{props.title}</Text>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 20, color: props.textColor }}>{props.value}</Text>
    </TouchableOpacity>
  );
};

export default CustomCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 50,
    paddingHorizontal:10,
    borderRadius: 15,
    marginVertical: 10,
  },
});
