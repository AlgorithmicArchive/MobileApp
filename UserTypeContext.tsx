// UserTypeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { UserType } from './UserTypes'; // Import the UserType type

interface UserTypeContextType {
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined);

export const UserTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userType, setUserType] = useState<UserType>(null);

  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};

export const useUserType = (): UserTypeContextType => {
  const context = useContext(UserTypeContext);
  if (context === undefined) {
    throw new Error('useUserType must be used within a UserTypeProvider');
  }
  return context;
};
