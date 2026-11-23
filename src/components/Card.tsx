import { useContext } from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';
import { elevation, radii, spacing } from '../theme/tokens';

export default function Card({ style, children, ...rest }: ViewProps) {
    const { theme, scheme } = useContext(ThemeContext);
    const themeElevation =
        scheme === 'dark'
            ? {
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: theme.colors.core.border
              }
            : elevation.light;
    return (
        <View
            style={[
                {
                    backgroundColor: theme.colors.core.surface,
                    borderRadius: radii.card,
                    padding: spacing.l
                },
                themeElevation,
                style
            ]}
            {...rest}
        >
            {children}
        </View>
    );
}
