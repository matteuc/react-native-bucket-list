import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeProvider';

interface ThemedViewProps {
  style: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({ children, style }) => {
  const {
    colors: { background },
  } = useTheme();

  const combinedStyles = StyleSheet.flatten([
    style,
    {
      backgroundColor: background,
    },
  ]);

  return <View style={combinedStyles}>{children}</View>;
};

export default ThemedView;
