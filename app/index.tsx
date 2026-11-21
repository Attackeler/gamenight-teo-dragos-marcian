import AppText from '@/src/components/AppText';
import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import { ThemeContext } from '@/src/theme/ThemeProvider';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
    const { theme, selectTheme } = useContext(ThemeContext);
    return (
        <SafeAreaView
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: theme.colors.core.bg
            }}
        >
            <Button onPress={() => selectTheme('light_theme')}>
                light_theme
            </Button>
            <Button onPress={() => selectTheme('dark_theme')}>
                dark_theme
            </Button>
            <Button onPress={() => selectTheme('system')}>system</Button>
            <Card></Card>
        </SafeAreaView>
    );
}
