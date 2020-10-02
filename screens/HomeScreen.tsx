import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import ThemedView from '../components/ThemedView';
import { AppScreens } from '../constants';
import Fab from '../components/Fab';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <ThemedView style={styles.container}>
        <Fab
          icon="add"
          onPress={() => navigation.navigate(AppScreens.CREATE_WISH)}
        />
        <Text>Open up App.tsx to start working on your app!!</Text>
        <StatusBar style="auto" />
      </ThemedView>
    </>
  );
};

export default HomeScreen;
