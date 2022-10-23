import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Platform,
    KeyboardTypeOptions,
    ReturnKeyTypeOptions,
} from 'react-native';
import { colors } from '../../colors/globalColors';

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
});

const Input = (props: {
    label: string;
    type: KeyboardTypeOptions;
    value: string;
    onChange: (text: string) => void;
    returnKeyType: ReturnKeyTypeOptions;
}) => {
    return (
        <View style={styles.credentialContainer}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                style={styles.input}
                keyboardType={props.type}
                onChangeText={props.onChange}
                returnKeyType={props.returnKeyType}
                value={props.value}
            />
        </View>
    );
};
export default Input;
