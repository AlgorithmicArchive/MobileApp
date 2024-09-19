import React, { useState } from 'react';
import { View, TextInput, Text, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Helper function to format the date
const formatDate = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

interface DatePickerFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, value, onChange }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      onChange(formatDate(selectedDate)); // Notify parent component about the formatted date change
    }
  };

  const showDatePicker = () => {
    setShowPicker(true);
    Keyboard.dismiss(); // Optionally hide the keyboard when the date picker opens
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ width: '100%', marginBottom: 10 }}>
        {label && <Text style={{ color: '#fff' }}>{label}</Text>}
        <TextInput
          style={{
            borderColor: '#ddd',
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
            color: '#fff'
          }}
          placeholder='dd/mm/yyyy'
          placeholderTextColor='gray'
          onFocus={showDatePicker} // Show the DatePicker when the input is focused
          value={value} // Display the formatted date in the input field
          onChangeText={(text) => onChange(text)} // Update the parent with the input value
          showSoftInputOnFocus={false} // Prevent the keyboard from showing
        />

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default DatePickerField;
