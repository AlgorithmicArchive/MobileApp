// app.config.ts
import 'dotenv/config'; // Import dotenv/config to load environment variables
import { ExpoConfig, ConfigContext } from '@expo/config'; // Import types for Expo config

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'MobileApp',
  slug: 'MobileApp',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash-screen.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff'
  },
  extra: {
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000', // Default value if SERVER_URL is not set
    API_KEY: process.env.API_KEY || 'default-api-key', // Default value if API_KEY is not set
    eas: {
      projectId: '70f23b85-72d7-4122-954c-b3ac30e583d9'
    }
  },
  ios: {
    supportsTablet: true,
    usesIcloudStorage: true,
    bundleIdentifier: 'com.momin129.MobileApp'
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff'
    },
    package: 'com.momin129.MobileApp'
  },
  web: {
    favicon: './assets/favicon.png'
  },
  plugins: [
    [
      'expo-document-picker',
      {
        iCloudContainerEnvironment: 'Production'
      }
    ]
  ]
});
