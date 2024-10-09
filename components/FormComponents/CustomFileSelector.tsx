import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { View, StyleSheet, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Controller } from 'react-hook-form';
import { Control, FieldValues } from 'react-hook-form';
import { useTheme } from '@react-navigation/native';

interface CustomFileSelectorProps {
  label: string;
  errors: any;
  rules?: object;
  control: Control<FieldValues, object>;
  name: string;
}

// Define type guard to check if the result is DocumentPickerSuccessResult
const isDocumentPickerSuccessResult = (
  result: DocumentPicker.DocumentPickerResult
): result is DocumentPicker.DocumentPickerSuccessResult => {
  return !result.canceled; // If not canceled, it must be a success result
};

const CustomFileSelector: React.FC<CustomFileSelectorProps> = ({ label, errors, rules, control, name }) => {
  const handleImagePicker = async (onChange: (value: string | null) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });

    if (!result.canceled) {
      const newImageUri = result.assets[0].uri;
      onChange(newImageUri);
    }
  };

  const handleFilePicker = async (onChange: (value: string | null) => void) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
      copyToCacheDirectory: true,
    });

    // Use the type guard to check if the result is a success result
    if (isDocumentPickerSuccessResult(result) && result.assets && result.assets.length > 0) {
      const fileUri = result.assets[0].uri; // Get the URI from the first asset in the array
      onChange(fileUri);
    }
  };

  const handlePicker = async (onChange: (value: string | null) => void) => {
    if (label === 'Applicant image') {
      await handleImagePicker(onChange);
    } else {
      await handleFilePicker(onChange);
    }
  };
  const {colors} = useTheme();
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <Text style={[styles.label,{color:colors.primary}]}>{label}</Text>
          <TouchableOpacity
            style={[styles.button,{borderColor:colors.primary,borderWidth:1}]}
            onPress={() => handlePicker(onChange)}
          >
            <Text style={[styles.buttonText,{color:colors.text}]}>{label === 'Applicant image' ? 'Choose Image' : 'Choose File'}</Text>
          </TouchableOpacity>

          {/* Display selected image or file name */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.previewContainer}>
            {name === 'ApplicantImage' && value ? (
              <Image source={{ uri: value }} style={styles.image} />
            ) : value ? (
              <Text style={styles.fileName}>{value.split('/').pop()}</Text>
            ) : null}
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
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'stretch',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:5,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  previewContainer: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#b0b0b0',
  },
  fileName: {
    fontSize: 14,
    color: '#666',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default CustomFileSelector;
