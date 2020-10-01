import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '../context/ThemeProvider';
import ThemedView from '../components/ThemedView';
import { AppScreens } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { handleToggleTheme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!</Text>
      <Button onPress={handleToggleTheme}>Change Theme</Button>
      <Button
        onPress={() =>
          navigation.reset({
            routes: [{ name: AppScreens.LOGIN }],
          })
        }
      >
        Logout
      </Button>
      <StatusBar style="auto" />
    </ThemedView>
  );
};

export default HomeScreen;
