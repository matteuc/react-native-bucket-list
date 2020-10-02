import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Avatar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import ThemedScreen from '../components/ThemedScreen';
import { AppScreens } from '../constants';
import Fab from '../components/Fab';
import { useTheme } from '../context/ThemeProvider';
import { useAuth } from '../context/AuthProvider';

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

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Nav />
      <ThemedScreen style={styles.container}>
        <Fab
          icon="add"
          onPress={() => navigation.navigate(AppScreens.CREATE_WISH)}
        />
        <Text>Home</Text>
      </ThemedScreen>
    </>
  );
};

export default HomeScreen;
