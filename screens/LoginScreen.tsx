import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Headline } from 'react-native-paper';
import ThemedView from '../components/ThemedView';

import logo from '../assets/icon.png';
import googleSignInButton from '../assets/signin-button.png';
import { useAuth } from '../context/AuthProvider';

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
  const { signIn } = useAuth();

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
