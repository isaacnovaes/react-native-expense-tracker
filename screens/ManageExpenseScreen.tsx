import { View, StyleSheet, Alert } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { Ionicons } from '@expo/vector-icons';
import type { StackScreenManageExpenseProps } from '../types/navigation';
import { colors } from '../colors/globalColors';
import { useContext } from 'react';
import { Context } from '../context/ContextProvider';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

interface InputValues {
    amount: string;
    date: string;
    description: string;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderColor: colors.primary200,
        alignItems: 'center',
    },
});

const ManageExpenseScreen = (props: StackScreenManageExpenseProps) => {
    const { mode, expenseID } = props.route.params;
    const {
        dispatch,
        state: { expenses },
    } = useContext(Context);

    const selectedExpense = expenses.find(
        (expense) => expense.id === expenseID
    );

    return (
        <View style={styles.container}>
            <ExpenseForm
                selectedExpense={selectedExpense}
                mode={mode}
                onCancel={() => {
                    props.navigation.goBack();
                }}
                onSubmit={(data: InputValues) => {
                    switch (mode) {
                        case 'ADD': {
                            dispatch({
                                type: 'ADD_EXPENSE',
                                newExpenseData: {
                                    amount: +data.amount,
                                    date: new Date(data.date),
                                    description: data.description,
                                },
                            });
                            props.navigation.goBack();
                            break;
                        }
                        case 'UPDATE': {
                            dispatch({
                                type: 'UPDATE_EXPENSE',
                                expenseToUpdateID: expenseID ?? '',
                                newExpenseData: {
                                    amount: +data.amount,
                                    date: new Date(data.date),
                                    description: data.description,
                                },
                            });
                            props.navigation.goBack();
                            break;
                        }
                        default:
                            return;
                    }
                }}
            />
            {mode === 'UPDATE' && expenseID ? (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon={
                            <Ionicons
                                name='trash'
                                size={36}
                                color={colors.error500}
                            />
                        }
                        onPress={() => {
                            Alert.alert(
                                'This expense will be permanently removed',
                                'Remove expense? ',
                                [
                                    {
                                        text: 'No',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'Yes',
                                        style: 'destructive',
                                        onPress: () => {
                                            props.navigation.goBack();
                                            dispatch({
                                                type: 'REMOVE_EXPENSE',
                                                expenseID,
                                            });
                                        },
                                    },
                                ],
                                {
                                    cancelable: true,
                                }
                            );
                        }}
                    />
                </View>
            ) : null}
        </View>
    );
};
export default ManageExpenseScreen;
