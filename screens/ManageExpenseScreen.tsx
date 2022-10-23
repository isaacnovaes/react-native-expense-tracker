import { View, StyleSheet, Alert } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { Ionicons } from '@expo/vector-icons';
import { StackScreenManageExpenseProps } from '../types/navigation';
import { colors } from '../colors/globalColors';
import { useContext, useState } from 'react';
import { Context } from '../context/ContextProvider';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import { Expense } from '../types/common';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

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

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ isError: false, message: '' });

    if (loading) {
        return <LoadingOverlay />;
    }
    if (error.isError) {
        return (
            <ErrorOverlay
                message={error.message}
                onPress={() => {
                    setError({
                        isError: false,
                        message: '',
                    });
                }}
            />
        );
    }

    const selectedExpense = expenses.find(
        (expense) => expense.id === expenseID
    );

    return (
        <>
            <View style={styles.container}>
                <ExpenseForm
                    selectedExpense={selectedExpense}
                    mode={mode}
                    onCancel={() => {
                        props.navigation.goBack();
                    }}
                    onSubmit={(data: InputValues) => {
                        const newExpenseDataWithoutID = {
                            amount: +data.amount,
                            date: new Date(data.date),
                            description: data.description.trim(),
                        };
                        const addExpense = async () => {
                            setLoading(true);

                            try {
                                const response = await storeExpense(
                                    newExpenseDataWithoutID
                                );
                                if (response.status === 200) {
                                    const id = response.data.name;

                                    const newExpenseDataAfterRequest: Expense =
                                        {
                                            id,
                                            ...newExpenseDataWithoutID,
                                        };

                                    dispatch({
                                        type: 'ADD_EXPENSE',
                                        newExpenseData:
                                            newExpenseDataAfterRequest,
                                    });
                                    props.navigation.goBack();
                                }
                            } catch {
                                setError({
                                    isError: true,
                                    message: 'Error while adding your expense',
                                });
                            }

                            setLoading(false);
                        };

                        const updateExpenseLocally = async (id: string) => {
                            setLoading(true);
                            try {
                                const response = await updateExpense(
                                    id,
                                    newExpenseDataWithoutID
                                );

                                if (response.status === 200) {
                                    dispatch({
                                        type: 'UPDATE_EXPENSE',
                                        expenseToUpdateID: id,
                                        newExpenseData: newExpenseDataWithoutID,
                                    });
                                    props.navigation.goBack();
                                }
                            } catch {
                                setError({
                                    isError: true,
                                    message: 'Error while editing your expense',
                                });
                            }
                            setLoading(false);
                        };

                        switch (mode) {
                            case 'ADD': {
                                void addExpense();
                                break;
                            }
                            case 'UPDATE': {
                                if (expenseID) {
                                    void updateExpenseLocally(expenseID);
                                }
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
                                                const deleteLocally =
                                                    async () => {
                                                        setLoading(true);
                                                        try {
                                                            const response =
                                                                await deleteExpense(
                                                                    expenseID
                                                                );

                                                            if (
                                                                response.status ===
                                                                200
                                                            ) {
                                                                props.navigation.goBack();
                                                                dispatch({
                                                                    type: 'REMOVE_EXPENSE',
                                                                    expenseID,
                                                                });
                                                            }
                                                        } catch {
                                                            setError({
                                                                isError: true,
                                                                message:
                                                                    'Error while removing your expense',
                                                            });
                                                        }
                                                        setLoading(false);
                                                    };

                                                void deleteLocally();
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
        </>
    );
};
export default ManageExpenseScreen;
