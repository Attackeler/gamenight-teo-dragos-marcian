import AppText from '@/src/components/AppText';
import Avatar from '@/src/components/Avatar';
import Button from '@/src/components/Button';
import Card from '@/src/components/Card';
import Screen from '@/src/components/Screen';
import { ThemeContext } from '@/src/theme/ThemeProvider';
import { useContext } from 'react';
export default function Index() {
    const { selectTheme } = useContext(ThemeContext);
    return (
        <Screen
            style={{
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Avatar variant="large" username="auasdasd">
                test
            </Avatar>
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
        </Screen>
    );
}
