// App.tsx
import React, { useEffect, useState } from 'react';
import AppNavigator from './navigations/AppNavigator';
import { UserTypeProvider } from './UserTypeContext';
import GifSplashScreen from './components/GifSplashScreen';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  // Function to hide the splash screen and show the main app content
  const handleSplashFinish = async () => {
    setIsSplashVisible(false);
    await SplashScreen.hideAsync(); // Hide the native splash screen
  };

  useEffect(() => {
    // Hide the splash screen once the main app is ready to be shown
    SplashScreen.preventAutoHideAsync();
  }, []);

  return (
    <UserTypeProvider>
      {/* Show the GIF splash screen if it's visible */}
      {isSplashVisible ? (
        <GifSplashScreen onAnimationFinish={handleSplashFinish} />
      ) : (
        // Show the main app content after the splash screen is hidden
        <AppNavigator />
      )}
    </UserTypeProvider>
  );
}
