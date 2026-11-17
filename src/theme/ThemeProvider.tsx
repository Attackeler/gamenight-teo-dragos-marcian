import { createContext, useEffect, useState, type ReactNode } from 'react';
import { dark_theme, light_theme, Theme } from './tokens';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Mode = 'dark_theme' | 'light_theme' | 'system';

export type ThemeContextType = {
    mode: Mode;
    theme: Theme;
    selectTheme: (mode: Mode) => void;
    themeLoaded: boolean;
};

const defaultThemeContext: ThemeContextType = {
    mode: 'dark_theme',
    theme: dark_theme,
    selectTheme: () => {},
    themeLoaded: false
};

export const ThemeContext =
    createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const colorScheme = useColorScheme();
    const [themeLoaded, setThemeLoaded] = useState(false);
    const [mode, setMode] = useState<Mode>('system');
    const resolved =
        mode === 'system'
            ? colorScheme === 'dark'
                ? dark_theme
                : light_theme
            : mode === 'dark_theme'
              ? dark_theme
              : light_theme;

    async function saveThemeMode(mode: Mode) {
        await AsyncStorage.setItem('themeMode', mode);
    }

    const selectTheme = (new_mode: Mode) => {
        setMode(new_mode);
        saveThemeMode(new_mode);
    };

    useEffect(() => {
        const getMode = async () => {
            const savedMode = await AsyncStorage.getItem('themeMode');
            if (savedMode == null) {
                setMode('system');
            } else {
                setMode(savedMode as Mode);
            }
            setThemeLoaded(true);
        };

        getMode();
    }, []);

    return (
        <ThemeContext.Provider
            value={{ mode, theme: resolved, selectTheme, themeLoaded }}
        >
            {children}
        </ThemeContext.Provider>
    );
};
