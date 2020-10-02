import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import ThemedView from '../components/ThemedView';

import logo from '../assets/icon.png';
import googleSignInButton from '../assets/signin-button.png';
import { useAuth } from '../context/AuthProvider';
import { AppScreens } from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerView: {
    flex: 0.6,
    width: '60%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    resizeMode: 'contain',
  },
});

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { signIn, user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      navigation.reset({
        routes: [{ name: AppScreens.HOME }],
      });
    }
  }, [user?.id, navigation]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.innerView}>
        <Headline>buckets</Headline>
        <Image source={logo} />

        <View onTouchStart={signIn} style={styles.buttonContainer}>
          <Image style={styles.button} source={googleSignInButton} />
        </View>
      </View>
    </ThemedView>
  );
};

export default LoginScreen;
