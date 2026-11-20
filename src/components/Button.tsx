import { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';
import { typography } from '../theme/tokens';
import { Pressable } from 'react-native';
import AppText from './AppText';

export default function Button({ children, ...props }: any) {
    const { theme } = useContext(ThemeContext);

    return (
        <>
            <Pressable
                style={{
                    backgroundColor: theme.colors.core.surfaceAlt
                }}
                {...props}
            >
                <AppText font={{ ...typography.body }}>{children}</AppText>
            </Pressable>
        </>
    );
}
