import React, { createContext, useContext } from 'react';
// import { auth } from "../firebase";
// import { useNavigation } from '@react-navigation/core';
import * as Google from 'expo-google-app-auth';
import config from '../config';

interface AuthContextProps {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: async () => {},
  signOut: async () => {},
});

const AuthProvider: React.FC = ({ children }) => {
  // const navigation = useNavigation();
  async function signIn() {
    try {
      const result = await Google.logInAsync({
        behavior: 'system',
        // iosClientId: IOS_CLIENT_ID,
        androidClientId: config.AND_CLIENT_ID,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        console.log(result);
      }
    } catch (e) {
      alert(e);
    }
  }

  async function signOut() {
    await Google.logInAsync({
      behavior: 'system',
      // iosClientId: IOS_CLIENT_ID,
      androidClientId: config.AND_CLIENT_ID,
      scopes: ['profile', 'email'],
    });
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }

  return context;
};

export { AuthProvider, useAuth };
