import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import { NetworkStatusProvider } from './context/NetworkStatusProvider';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { unAuthScreens, authScreens } from './screens';
import { AppScreens, AppScreenParamList } from './constants';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { WishProvider } from './context/WishProvider';

const Stack = createStackNavigator<AppScreenParamList>();

function App() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <>
      <NavigationContainer theme={theme}>
        {user ? (
          <Stack.Navigator initialRouteName={AppScreens.HOME}>
            {authScreens.map(({ name, component, showHeader }) => (
              <Stack.Screen
                options={{
                  headerShown: showHeader,
                }}
                key={`screen-${name}`}
                name={name}
                component={component}
              />
            ))}
          </Stack.Navigator>
        ) : (
          <Stack.Navigator
            initialRouteName={AppScreens.LOGIN}
            headerMode="none"
          >
            {unAuthScreens.map(({ name, component, showHeader }) => (
              <Stack.Screen
                options={{
                  headerShown: showHeader,
                }}
                key={`screen-${name}`}
                name={name}
                component={component}
              />
            ))}
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}

export default function Main() {
  useEffect(() => {
    async function init() {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.PORTRAIT_UP
        );

        // Expo SplashScreen only broken for Android
        if (Platform.OS !== 'android')
          await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        if (__DEV__) console.warn(e);
      }
    }

    init();
  }, []);
  return (
    <ThemeProvider>
      <NetworkStatusProvider>
        <AuthProvider>
          <WishProvider>
            <App />
          </WishProvider>
        </AuthProvider>
      </NetworkStatusProvider>
    </ThemeProvider>
  );
}
