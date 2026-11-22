import React, { useContext } from 'react';
import { Text, type TextProps } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';
import { typography, Theme, dark_theme } from '../theme/tokens';

type Variant = keyof typeof typography;
type AppTextProps = TextProps & {
    variant?: Variant;
    color?: ThemeColor;
};
type Core = keyof Theme['colors']['core'];
type AccentSemantic = keyof Theme['colors']['accent_semantic'];
export type ThemeColor = Core | AccentSemantic;

function isCore(c: ThemeColor): c is Core {
    return c in dark_theme.colors.core;
}

function getColor(theme: Theme, c: ThemeColor) {
    return isCore(c) ? theme.colors.core[c] : theme.colors.accent_semantic[c];
}

export default function AppText({
    style,
    variant = 'body',
    color = 'text',
    ...rest
}: AppTextProps) {
    const { theme } = useContext(ThemeContext);
    return (
        <Text
            style={[
                { color: getColor(theme, color) },
                typography[variant],
                style
            ]}
            selectable={false}
            {...rest}
        ></Text>
    );
}
