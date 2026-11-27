import { View, ViewProps, StyleSheet } from 'react-native';
import { avatar, heights, radii, sizes, spacing } from '../theme/tokens';

type Variant = 'small' | 'medium' | 'large';
type AvatarProps = ViewProps & {
    variant?: Variant;
    username: string;
    isOnline?: boolean;
};
export default function Avatar({
    style,
    variant = 'small',
    username,
    isOnline = false
}: AvatarProps) {
    return (
        <View
            style={[
                {
                    backgroundColor:
                        avatar.colors.avatar_fills[
                            username.length % avatar.colors.avatar_fills.length
                        ]
                },
                styles.default,
                variant === 'small'
                    ? styles.small
                    : variant === 'medium'
                      ? styles.medium
                      : variant === 'large'
                        ? styles.large
                        : undefined,

                style
            ]}
        ></View>
    );
}

const styles = StyleSheet.create({
    default: {
        borderRadius: radii.avatar,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.m
    },
    small: { minHeight: sizes.avatar.small },
    medium: { minHeight: sizes.avatar.medium },
    large: { minHeight: sizes.avatar.large }
});
