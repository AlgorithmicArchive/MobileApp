import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Define the props interface
interface FileInputFieldProps {
  label?: string;
  onImageSelected?: (uri: string) => void; // Callback for selected image URI
}

const FileInputField: React.FC<FileInputFieldProps> = ({ label, onImageSelected }) => {
  const [image, setImage] = useState<string | null>(null);

  // Function to handle image selection
  const pickImage = async () => {
    // Request permission to access the camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // Check if the result is a success and has a uri
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      if (uri) {
        setImage(uri);
        if (onImageSelected) {
          onImageSelected(uri); // Call the callback function with the image URI
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.buttonText, { width: '100%' }]}>{label}</Text>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Choose Image</Text>
      </TouchableOpacity>
      {image && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
});

export default FileInputField;
