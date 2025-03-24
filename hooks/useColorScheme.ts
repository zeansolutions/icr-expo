import { useColorScheme as _useColorScheme } from 'react-native';

// Custom hook (optional for future enhancements)
export default function useColorScheme(): 'light' | 'dark' {
  return _useColorScheme() || 'light'; // Default to 'light'
}
