import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../../colors/globalColors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: colors.primary700,
    },
});

const LoadingOverlay = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} />
        </View>
    );
};
export default LoadingOverlay;
