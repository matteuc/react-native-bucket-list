import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Avatar, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { useTheme } from '../context/ThemeProvider';
import ThemedView from '../components/ThemedView';
import { AppScreens } from '../constants';
import { useAuth } from '../context/AuthProvider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  title: {
    fontSize: 15,
  },
});

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const {
    handleToggleTheme,
    colors: { primary },
  } = useTheme();
  const { signOut, user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigation.reset({
        routes: [{ name: AppScreens.LOGIN }],
      });
    }
  }, [user, navigation]);

  return (
    <>
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
      </Appbar.Header>
      <ThemedView style={styles.container}>
        <Text>Open up App.tsx to start working on your app!!</Text>
        <Button onPress={handleToggleTheme}>Change Theme</Button>
        <Button onPress={() => signOut()}>Logout</Button>
        <StatusBar style="auto" />
      </ThemedView>
    </>
  );
};

export default HomeScreen;
