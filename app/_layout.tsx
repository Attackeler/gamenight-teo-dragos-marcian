import { SplashScreen, Stack } from 'expo-router';
import { useFonts } from '@expo-google-fonts/inter/useFonts';
import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { ThemeContext, ThemeProvider } from '../src/theme/ThemeProvider';
import { useContext, useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export function useInterFonts() {
    const [fontsLoaded] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold
    });
    return fontsLoaded;
}

function AppContent({ fontsLoaded }: { fontsLoaded: boolean }) {
    const { themeLoaded } = useContext(ThemeContext);
    useEffect(() => {
        if (themeLoaded && fontsLoaded) SplashScreen.hide();
    }, [fontsLoaded, themeLoaded]);

    // On web there is no native splash screen to cover the first render,
    // so render nothing until the saved theme has been read.
    if (!themeLoaded) {
        return null;
    }
    return (
        <Stack>
            <Stack.Screen name="index" />
        </Stack>
    );
}

export default function RootLayout() {
    const fontsLoaded = useInterFonts();

    if (!fontsLoaded) {
        return null;
    } else {
        return (
            <ThemeProvider>
                <AppContent fontsLoaded={fontsLoaded} />
            </ThemeProvider>
        );
    }
}
