import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTheme } from '../context/ThemeProvider';
import ThemedView from '../components/ThemedView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function HomeScreen() {
  const { handleToggleTheme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <Text>Open up App.tsx to start working on your app!!</Text>
      <Button onPress={handleToggleTheme}>Change Theme</Button>
      <StatusBar style="auto" />
    </ThemedView>
  );
}
