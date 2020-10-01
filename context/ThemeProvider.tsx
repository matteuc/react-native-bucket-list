import React, { createContext, useEffect, useContext, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AppearanceProvider, useColorScheme } from 'react-native-appearance';
import { darkTheme, theme } from '../theme';

interface ThemeContextProps extends ReactNativePaper.Theme {
  handleToggleTheme: () => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextProps>({
  ...theme,
  handleToggleTheme: () => null,
  isDark: false,
});

const InternalThemeProvider: React.FC = ({ children }) => {
  const [isDark, setTheme] = useState(false);

  const colorScheme = useColorScheme();

  const handleToggleTheme = () => setTheme(!isDark);

  useEffect(() => {
    setTheme(colorScheme === 'dark');
  }, [colorScheme]);

  const currentTheme = isDark ? darkTheme : theme;

  return (
    <ThemeContext.Provider
      value={{ ...currentTheme, isDark, handleToggleTheme }}
    >
      <PaperProvider theme={currentTheme}>{children}</PaperProvider>
    </ThemeContext.Provider>
  );
};

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <AppearanceProvider>
      <InternalThemeProvider>{children}</InternalThemeProvider>
    </AppearanceProvider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(`useTheme must be used within an ThemeProvider`);
  }

  return context;
};

export { ThemeProvider, useTheme };
