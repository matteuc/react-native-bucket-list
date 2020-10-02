import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { NetworkStatusProvider } from './context/NetworkStatusProvider';
import { ThemeProvider } from './context/ThemeProvider';
import { unAuthScreens, authScreens } from './screens';
import { AppScreens } from './constants';
import { AuthProvider, useAuth } from './context/AuthProvider';

const Stack = createStackNavigator();

function App() {
  const { user } = useAuth();
  return (
    <>
      <NavigationContainer>
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
      <StatusBar style="auto" />
    </>
  );
}

export default function Main() {
  return (
    <ThemeProvider>
      <NetworkStatusProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </NetworkStatusProvider>
    </ThemeProvider>
  );
}
