import React, { createContext, useContext, useState, useEffect } from 'react';
import { LightColors, DarkColors } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

type ThemeType = typeof LightColors;

interface ThemeContextProps {
  theme: ThemeType;
  toggleTheme: () => void;
  colorScheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: LightColors,
  toggleTheme: () => {},
  colorScheme: 'light',
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(systemColorScheme);

  // Optional: Sync with system theme changes
  useEffect(() => {
    setColorScheme(systemColorScheme);
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setColorScheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const theme = colorScheme === 'dark' ? DarkColors : LightColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
