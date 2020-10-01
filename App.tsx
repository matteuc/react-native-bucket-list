import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NetworkStatusProvider } from './context/NetworkStatusProvider';
import { ThemeProvider } from './context/ThemeProvider';
import screens from './screens';
import { AppScreens } from './constants';
import { AuthProvider } from './context/AuthProvider';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AppScreens.LOGIN} headerMode="none">
        {screens.map(({ name, component }) => (
          <Stack.Screen
            key={`screen-${name}`}
            name={name}
            component={component}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
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
