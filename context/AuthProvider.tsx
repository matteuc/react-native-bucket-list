import React, { createContext, useContext, useState } from 'react';
// import { auth } from "../firebase";
import * as Google from 'expo-google-app-auth';
import { AppUser } from '../constants';
import config from '../config';

interface AuthContextProps {
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  user: AppUser;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: async () => {},
  signOut: async () => {},
  user: null,
});

const googleSignInConfig: Google.GoogleLogInConfig = {
  behavior: 'system',
  // iosClientId: IOS_CLIENT_ID,
  androidClientId: config.AND_CLIENT_ID,
  scopes: ['profile', 'email'],
};

const AuthProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState<string | null>('');
  const [user, setUser] = useState<AppUser>(null);

  async function signIn() {
    try {
      const result = await Google.logInAsync(googleSignInConfig);

      if (
        result.type === 'success' &&
        result.accessToken &&
        result.user.name &&
        result.user.photoUrl &&
        result.user.email
      ) {
        setToken(result.accessToken);
        setUser({
          name: result.user.name,
          image: result.user.photoUrl,
          email: result.user.email,
        });
      }
    } catch (e) {
      alert(e);
    }
  }

  async function signOut() {
    if (token?.length) {
      await Google.logOutAsync({ ...googleSignInConfig, accessToken: token });
      setToken(null);
      setUser(null);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user }}>
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
