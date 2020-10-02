import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Appbar, Avatar } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { NetworkStatusProvider } from './context/NetworkStatusProvider';
import { ThemeProvider, useTheme } from './context/ThemeProvider';
import { unAuthScreens, authScreens } from './screens';
import { AppScreens } from './constants';
import { AuthProvider, useAuth } from './context/AuthProvider';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 15,
  },
});

const Nav: React.FC = () => {
  const {
    handleToggleTheme,
    colors: { primary },
    isDark,
  } = useTheme();
  const { signOut, user } = useAuth();

  return (
    <Appbar.Header
      style={{
        backgroundColor: primary,
      }}
    >
      <Avatar.Image
        source={{
          uri: user?.image,
        }}
        size={35}
      />
      <Appbar.Content
        title={user?.name}
        subtitle={user?.email}
        titleStyle={styles.title}
      />
      <Appbar.Action
        icon={isDark ? 'white-balance-sunny' : 'weather-night'}
        onPress={handleToggleTheme}
      />
      <Appbar.Action icon="exit-run" onPress={() => signOut()} />
    </Appbar.Header>
  );
};
function App() {
  const { user } = useAuth();
  return (
    <NavigationContainer>
      {user ? (
        <>
          <Nav />
          <Stack.Navigator initialRouteName={AppScreens.HOME} headerMode="none">
            {authScreens.map(({ name, component }) => (
              <Stack.Screen
                key={`screen-${name}`}
                name={name}
                component={component}
              />
            ))}
          </Stack.Navigator>
        </>
      ) : (
        <Stack.Navigator initialRouteName={AppScreens.LOGIN} headerMode="none">
          {unAuthScreens.map(({ name, component }) => (
            <Stack.Screen
              key={`screen-${name}`}
              name={name}
              component={component}
            />
          ))}
        </Stack.Navigator>
      )}
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
