import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NetworkStatusProvider } from './context/NetworkStatusProvider';
import { ThemeProvider } from './context/ThemeProvider';
import screens from './screens';
import { AppScreens } from './constants';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AppScreens.LOGIN}>
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
    <NetworkStatusProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </NetworkStatusProvider>
  );
}
