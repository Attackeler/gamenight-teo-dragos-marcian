import { ThemeContext } from '../theme/ThemeProvider';
import { useContext } from 'react';
import {
    SafeAreaView,
    SafeAreaViewProps
} from 'react-native-safe-area-context';

export default function Screen({
    children,
    style,
    ...rest
}: SafeAreaViewProps) {
    const { theme } = useContext(ThemeContext);
    return (
        <SafeAreaView
            style={[{ flex: 1, backgroundColor: theme.colors.core.bg }, style]}
            {...rest}
        >
            {children}
        </SafeAreaView>
    );
}
