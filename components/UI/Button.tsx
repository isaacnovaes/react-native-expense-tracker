import type { ViewStyle, StyleProp } from 'react-native';
// eslint-disable-next-line no-duplicate-imports
import { Pressable, StyleSheet, View, Text } from 'react-native';
import { colors } from '../../colors/globalColors';

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: colors.primary500,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    text: {
        color: colors.white,
        textAlign: 'center',
    },
    flatText: {
        color: colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: colors.primary100,
        borderRadius: 4,
    },
});

const Button = (props: {
    text: string;
    onPress: () => void;
    mode?: 'FLAT';
    style?: StyleProp<ViewStyle>;
}) => {
    return (
        <View style={props.style}>
            <Pressable
                onPress={props.onPress}
                style={({ pressed }) => (pressed ? styles.pressed : null)}
            >
                <View
                    style={[
                        styles.button,
                        props.mode === 'FLAT' && styles.flat,
                    ]}
                >
                    <Text
                        style={[
                            styles.text,
                            props.mode === 'FLAT' && styles.flatText,
                        ]}
                    >
                        {props.text}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
};
export default Button;
