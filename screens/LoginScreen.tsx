import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import ThemedView from '../components/ThemedView';
import { AppScreens } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ThemedView style={styles.container}>
      <Text>Login</Text>
      <Button
        onPress={() =>
          navigation.reset({
            routes: [{ name: AppScreens.HOME }],
          })
        }
      >
        Login
      </Button>
    </ThemedView>
  );
};

export default LoginScreen;
