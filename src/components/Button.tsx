import React, { useContext } from 'react';
import { ThemeContext } from '../theme/ThemeProvider';
import {
    Pressable,
    PressableProps,
    StyleProp,
    ViewStyle,
    StyleSheet
} from 'react-native';
import AppText, { ThemeColor } from './AppText';
import { heights, radii, spacing } from '../theme/tokens';

type Variant = 'primary' | 'tinted' | 'plain';

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
    variant?: Variant;
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};
export default function Button({
    style,
    variant = 'primary',
    children,
    ...rest
}: ButtonProps) {
    const { theme } = useContext(ThemeContext);
    const textColor: ThemeColor =
        variant === 'primary'
            ? 'onAccent'
            : variant === 'tinted'
              ? 'accentSoftText'
              : 'accent';

    return (
        <Pressable
            style={[
                variant === 'primary'
                    ? { backgroundColor: theme.colors.accent_semantic.accent }
                    : variant === 'tinted'
                      ? {
                            backgroundColor:
                                theme.colors.accent_semantic.accentSoftBg
                        }
                      : undefined,
                styles.default,
                style
            ]}
            {...rest}
        >
            <AppText color={textColor} variant="headline">
                {children}
            </AppText>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    default: {
        borderRadius: radii.button,
        minHeight: heights.button,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.m
    }
});
