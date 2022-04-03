import { Theme } from '@mui/material';
import { createContext } from 'react';

export type ThemeString = 'light' | 'dark' | 'system' | '';

interface ContextProps {
    theme: Theme;
    currentTheme: ThemeString;
    changeTheme: (theme: ThemeString) => void;
}

export const ThemeContext = createContext({} as ContextProps);