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
            <Button
                variant="primary"
                onPress={() => selectTheme('light_theme')}
            >
                light
            </Button>
            <Button variant="tinted" onPress={() => selectTheme('dark_theme')}>
                dark
            </Button>
            <Button variant="plain" onPress={() => selectTheme('system')}>
                system
            </Button>
            <Card>
                <AppText>Friday boardgame night</AppText>
                <AppText>Fri, Jul 3 * 19:00</AppText>
            </Card>
        </SafeAreaView>
    );
}
