import { FC, useState, useEffect, useRef } from 'react';
import { Theme, ThemeProvider } from '@mui/material';
import Cookies from 'js-cookie';
import { ThemeContext, ThemeString } from './ThemeContext';
import { lightTheme, darkTheme } from '../../themes/';

type ThemeState = Theme;

export const ThemeContextProvider: FC = ({children}) => {
    const [themeString, setThemeString] = useState<ThemeString>('');
    const [theme, setTheme] = useState<ThemeState>(darkTheme);
    useEffect(() => {
        setTheme(
            Cookies.get('theme') === 'light' ? lightTheme 
            : Cookies.get('theme') === 'dark' ? darkTheme
            : window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme : lightTheme
        );
    }, []);
    useEffect(() => {
        setThemeString(Cookies.get('theme') as ThemeString || 'system');
    }, []);
    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => changeTheme('system'))
    }, []);
    const changeTheme = (theme: ThemeString) => {
        if(theme === themeString) return;
        if(theme === 'system') {
            setTheme(
                window.matchMedia("(prefers-color-scheme: dark)").matches ? darkTheme
                : lightTheme
            )
        }else{
            setTheme(theme === 'light' ? lightTheme : darkTheme);
        }
        Cookies.set('theme', theme);
        setThemeString(theme);
    }
    return (
        <ThemeContext.Provider value={{theme,changeTheme,currentTheme: themeString}}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    )
}