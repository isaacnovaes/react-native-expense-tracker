import { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Platform,
    Pressable,
} from 'react-native';
import { colors } from '../../colors/globalColors';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
    credentialContainer: {
        marginBottom: 15,
    },
    label: {
        color: colors.white,
        fontSize: 15,
        marginRight: 10,
    },
    input: {
        backgroundColor: colors.primary100,
        fontSize: 14,
        paddingVertical: Platform.select({ ios: 5, android: 2 }),
        paddingHorizontal: 3,
        marginTop: 5,
        borderRadius: 4,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const PasswordInput = (props: {
    label: string;
    value: string;
    onChange: (text: string) => void;
}) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);
    return (
        <View style={styles.credentialContainer}>
            <Pressable
                style={styles.passwordContainer}
                onPress={() => setPasswordVisibility((state) => !state)}
            >
                <Text style={styles.label}>{props.label}</Text>
                <View>
                    {isPasswordVisible ? (
                        <Entypo name='eye' size={20} color={colors.white} />
                    ) : (
                        <Entypo name='eye-with-line' size={20} color='white' />
                    )}
                </View>
            </Pressable>
            <TextInput
                style={styles.input}
                secureTextEntry={!isPasswordVisible}
                onChangeText={props.onChange}
                returnKeyType='done'
                value={props.value}
            />
        </View>
    );
};
export default PasswordInput;
