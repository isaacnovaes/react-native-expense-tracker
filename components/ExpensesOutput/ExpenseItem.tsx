import { useNavigation } from '@react-navigation/native';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { colors } from '../../colors/globalColors';
import type { Expense } from '../../types/common';
import type { BottomTabAllExpensesItemListNavHook } from '../../types/navigation';
import { getFormattedDate } from '../../utils/date';

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        marginVertical: 12,
        backgroundColor: colors.primary500,
        borderRadius: 5,
        elevation: 3,
        shadowColor: colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    textBase: {
        color: colors.primary50,
    },
    description: {
        fontSize: 12,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80,
    },
    amount: {
        color: colors.primary500,
        fontWeight: 'bold',
    },
});

const ExpenseItem = (props: Expense) => {
    const navigation = useNavigation<BottomTabAllExpensesItemListNavHook>();
    return (
        <Pressable
            onPress={() =>
                navigation.navigate('ManageExpense', {
                    mode: 'UPDATE',
                    expenseID: props.id,
                })
            }
            style={({ pressed }) => (pressed ? styles.pressed : null)}
        >
            <View style={styles.container}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {props.description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(props.date)}
                    </Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>
                        ${props.amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};
export default ExpenseItem;
