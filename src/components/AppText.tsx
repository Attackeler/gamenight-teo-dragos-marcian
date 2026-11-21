import React, { useContext } from 'react';
import { Text, type TextProps } from 'react-native';
import { ThemeContext } from '../theme/ThemeProvider';
import { typography, Theme } from '../theme/tokens';

type Variant = keyof typeof typography;
type ThemeColorsCombined = Theme['colors']['core'] &
    Theme['colors']['accent_semantic'];
export type ThemeColor = keyof ThemeColorsCombined;
type AppTextProps = TextProps & {
    variant?: Variant;
    color?: ThemeColor;
};
export default function AppText({
    style,
    variant = 'body',
    color = 'text',
    ...rest
}: AppTextProps) {
    const { theme } = useContext(ThemeContext);
    const combinedColors = {
        ...theme.colors.core,
        ...theme.colors.accent_semantic
    };
    return (
        <Text
            style={[
                { color: combinedColors[color] },
                typography[variant],
                style
            ]}
            selectable={false}
            {...rest}
        ></Text>
    );
}
