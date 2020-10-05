import { DefaultTheme, DarkTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

const ovverideColors = {
  primary: '#00008B',
  accent: '#f1c40f',
};

const customColors = {
  secondaryAction: '#CDCDCD',
  success: 'green',
  muted: '#C0C0C0',
  danger: 'red',
};

const theme = {
  ...DefaultTheme,
  ...NavigationDefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    ...ovverideColors,
  },
  customColors,
};

const darkTheme = {
  ...DarkTheme,
  ...NavigationDarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    ...NavigationDarkTheme.colors,
    ...ovverideColors,
    background: '#000d1a',
    primary: '#1f71ff',
  },
  customColors,
};

export type AppTheme = {
  customColors: typeof customColors;
} & typeof theme &
  typeof darkTheme;

export { theme, darkTheme };
