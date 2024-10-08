// App.tsx
import React from 'react';
import AppNavigator from './navigations/AppNavigator';
import { UserTypeProvider } from './UserTypeContext';

export default function App() {
 
  return (
    <UserTypeProvider>
        <AppNavigator />
    </UserTypeProvider>
  );
}
