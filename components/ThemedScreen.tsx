import React from 'react';
import { SafeAreaView, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

interface ThemedScreenProps {
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const ThemedScreen: React.FC<ThemedScreenProps> = ({ children, style }) => {
  const {
    colors: { background },
  } = useTheme();

  const combinedStyles = StyleSheet.flatten([
    style,
    {
      backgroundColor: background,
    },
  ]);

  return <SafeAreaView style={combinedStyles}>{children}</SafeAreaView>;
};

export default ThemedScreen;
