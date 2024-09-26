import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../Button';
import { Controller } from 'react-hook-form'; // Import Controller

interface CustomImageSelectorProps {
  label: string; // New prop for label
  rules?: object; // Validation rules from react-hook-form
  errors?: any; // Errors object from react-hook-form
  control: any; // control object from react-hook-form
  name: string; // name for the form field
}

const CustomImageSelector: React.FC<CustomImageSelectorProps> = ({ label, errors, rules, control, name }) => {
  const handleImagePicker = async (onChange: (value: string | null) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Allow only one image selection
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri; // Get the first image
      onChange(newImage); // Update the form value using onChange from react-hook-form
    }
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
            style={[{backgroundColor:'#FFF',width:'100%',padding:15,borderRadius:10,elevation:3,height:50}]}
            onPress={()=>handleImagePicker(onChange)} // Do nothing if no onPress is provided
          >
            <Text style={[{color:'#000'}]}>Choose Image</Text>
          </TouchableOpacity>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageList}>
            {value &&
              <Image source={{ uri: value }} style={styles.image} />
            }
          </ScrollView>
          {errors && errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    fontWeight: 'normal',
    fontSize: 14,
    alignSelf: 'stretch',
  },
  imageList: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  placeholderText: {
    color: '#999',
    fontSize: 14,
    alignSelf: 'stretch',
  },
  errorText: {
    color: 'red',
    alignSelf: 'stretch',
  },
});

export default CustomImageSelector;
