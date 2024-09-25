import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Button from '../Button';

interface CustomImageSelectorProps {
  label: string; // New prop for label
}

const CustomImageSelector: React.FC<CustomImageSelectorProps> = ({ label }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false, // Allow only one image selection
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri; // Get the first image
      setSelectedImage(newImage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Button name='Select Image' onPress={handleImagePicker} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageList}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No image selected. Please select an image.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontWeight: 'normal',
    fontSize: 14,
    marginBottom: 10,
    alignSelf:'stretch'
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
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});

export default CustomImageSelector;
