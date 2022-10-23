import { View, StyleSheet, Text } from 'react-native';
import { colors } from '../../colors/globalColors';
import Button from './Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: colors.primary700,
    },
    message: {
        color: colors.white,
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const ErrorOverlay = (props: { message: string; onPress: () => void }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.message, styles.title]}>
                An error occurred!
            </Text>
            <Text style={styles.message}>{props.message}</Text>
            <Button text='Okay' onPress={props.onPress} />
        </View>
    );
};
export default ErrorOverlay;
