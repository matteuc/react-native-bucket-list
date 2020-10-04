import { DefaultTheme, DarkTheme } from 'react-native-paper';

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
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...ovverideColors,
  },
  customColors,
};

const darkTheme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    ...ovverideColors,
    background: '#000d1a',
    primary: '#1f71ff',
  },
  customColors,
};

export interface AppTheme extends ReactNativePaper.Theme {
  customColors: typeof customColors;
}

export { theme, darkTheme };
