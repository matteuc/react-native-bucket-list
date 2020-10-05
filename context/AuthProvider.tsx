import React, { createContext, useContext, useState, useEffect } from 'react';
import * as Google from 'expo-google-app-auth';
import { auth } from 'firebase';
import * as SplashScreen from 'expo-splash-screen';
import { AppUser } from '../constants';
import config from '../config';
import { createUser, getUser, watchUser } from '../utils/users';
import { useNetwork } from './NetworkStatusProvider';

interface AuthContextProps {
  signIn: () => void;
  signOut: () => void;
  user: AppUser;
}

const AuthContext = createContext<AuthContextProps>({
  signIn: () => {},
  signOut: () => {},
  user: null,
});

const googleSignInConfig: Google.GoogleLogInConfig = {
  behavior: 'system',
  iosClientId: config.IOS_CLIENT_ID,
  androidClientId: config.AND_CLIENT_ID,
  androidStandaloneAppClientId: config.AND_CLIENT_ID_PROD,
  iosStandaloneAppClientId: config.IOS_CLIENT_ID_PROD,
  scopes: ['profile', 'email'],
};

const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<AppUser>(null);
  const { callNetworkAction } = useNetwork();
  const [authInitialized, setAuthInitialized] = useState(false);

  const signIn = callNetworkAction(async () => {
    try {
      const result = await Google.logInAsync(googleSignInConfig);

      if (
        result.type === 'success' &&
        result.accessToken &&
        result.user.name &&
        result.user.photoUrl &&
        result.user.email &&
        result.user.id
      ) {
        const cred = await auth().signInWithCredential(
          auth.GoogleAuthProvider.credential(result.idToken)
        );

        const userId = cred.user?.uid;

        if (!userId)
          throw new Error('Google Credential has no associated user');

        const existingUser = await getUser(userId);

        const dbUser: AppUser =
          existingUser ||
          (await createUser(
            {
              name: result.user.name,
              image: result.user.photoUrl,
              email: result.user.email,
            },
            userId
          ));

        setUser(dbUser);
      }
    } catch (e) {
      alert(e);
    }
  });

  useEffect(() => {
    if (user?.id) {
      const unsubscribe = watchUser(user.id, (updatedUser) => {
        setUser(updatedUser);
      });

      return () => unsubscribe();
    }

    return () => {};
  }, [user?.id]);

  useEffect(() => {
    return auth().onAuthStateChanged(async function (currentUser) {
      if (currentUser) {
        // User is signed in.

        const existingUser = await getUser(currentUser.uid);

        if (existingUser) {
          setUser(existingUser);
        } else {
          setUser(null);
        }
      }

      if (!authInitialized) {
        await SplashScreen.hideAsync();
        setAuthInitialized(true);
      }
    });
  }, [user?.id, authInitialized]);

  const signOut = callNetworkAction(async () => {
    await auth().signOut();
    setUser(null);
  });

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
