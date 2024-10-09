// GifSplashScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import * as SplashScreen from 'expo-splash-screen'; // Import SplashScreen from expo

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

const { width, height } = Dimensions.get('window');

const GifSplashScreen = ({ onAnimationFinish }: { onAnimationFinish: () => void }) => {
  useEffect(() => {
    // Simulate the time needed to show the GIF (e.g., 3 seconds)
    const timer = setTimeout(() => {
      onAnimationFinish(); // Call the function to hide the GIF and show the main app content
    }, 3000); // Adjust this time based on your GIF length

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  return (
    <View style={styles.container}>
      {/* Display the GIF using the Image component */}
      <Image
        source={require('../assets/splash.gif')} // Path to your GIF file
        style={{ width, height }} // Set width and height to cover the screen
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Background color matching the splash screen
  },
});

export default GifSplashScreen;
