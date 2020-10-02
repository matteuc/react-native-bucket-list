import { DefaultTheme, DarkTheme } from 'react-native-paper';

const customColors = {
  primary: '#00008B',
  accent: '#f1c40f',
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...customColors,
  },
};

const darkTheme = {
  ...DarkTheme,
  roundness: 2,
  colors: {
    ...DarkTheme.colors,
    ...customColors,
    background: '#000d1a',
  },
};

export { theme, darkTheme };
