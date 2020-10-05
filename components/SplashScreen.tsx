import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import splash from '../assets/splash.png';

const SplashScreen: React.FC = () => {
  const styles = StyleSheet.create({
    image: {
      width: '100%',
      height: '100%',
    },
  });

  return (
    <View>
      <Image source={splash} style={styles.image} resizeMode={'cover'} />
    </View>
  );
};

export default SplashScreen;
