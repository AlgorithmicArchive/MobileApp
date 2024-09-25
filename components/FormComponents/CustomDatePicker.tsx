import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Button from '../Button';

interface CustomDatePickerProps {
  label: string;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('en-US', options).toUpperCase(); // Format date as "1 JUL 2024"
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Button name={formatDate(date) || 'Select Date'} onPress={()=>setShow(true)}/>
      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 10,
    alignSelf:'stretch'
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    padding: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default CustomDatePicker;
