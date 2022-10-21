import { Pressable, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        padding: 6,
        // margin: 8,
        marginHorizontal: 8,
        marginVertical: 2,
    },
    pressed: {
        opacity: 0.75,
    },
});

const IconButton = (props: { icon: React.ReactNode; onPress: () => void }) => {
    return (
        <Pressable
            style={({ pressed }) => (pressed ? styles.pressed : null)}
            onPress={props.onPress}
        >
            <View style={styles.container}>{props.icon}</View>
        </Pressable>
    );
};
export default IconButton;
