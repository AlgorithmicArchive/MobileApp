import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Controller } from 'react-hook-form';

interface CustomDatePickerProps {
  label: string;
  control: any; // Control from react-hook-form
  name: string; // Field name
  rules?: object; // Validation rules
  errors?: any; // Validation errors
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, control, name, rules, errors }) => {
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Function to format date in the format "23 JUL 2024"
  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    
    const day = date.getDate().toString().padStart(2, '0'); // Get day, pad with leading zero if necessary
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase(); // Get month and convert to uppercase
    const year = date.getFullYear(); // Get full year

    return `${day} ${month} ${year}`; // Return formatted date as "DD MMM YYYY"
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TouchableOpacity
            style={styles.touchable}
            onPress={() => setShow(true)}
          >
            <Text style={styles.dateText}>{value || 'dd/mm/yyyy'}</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              value={selectedDate || new Date()} // Use selectedDate (Date object) for DateTimePicker
              mode="date"
              display="default"
              onChange={(event: any, date?: Date) => {
                setShow(false); // Close the picker after selection
                if (date) {
                  setSelectedDate(date); // Set the selected Date object for the picker
                  const formattedDate = formatDate(date); // Format the date as "23 JUL 2024"
                  onChange(formattedDate); // Update react-hook-form state with the formatted string
                }
              }}
            />
          )}

          {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    alignSelf: 'stretch',
    marginBottom: 5,
  },
  touchable: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    height: 50,
    justifyContent: 'center',
  },
  dateText: {
    color: 'gray',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
  },
});

export default CustomDatePicker;
