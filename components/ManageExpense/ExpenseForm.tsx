import { useState } from 'react';
import { TextInput, View, StyleSheet, Text, Alert } from 'react-native';
import { colors } from '../../colors/globalColors';
import { Expense } from '../../types/common';
import { getFormattedDate } from '../../utils/date';
import Button from '../UI/Button';

interface InputValues {
    amount: string;
    date: string;
    description: string;
}

interface ExpenseFormProps {
    onCancel: () => void;
    onSubmit: (data: InputValues) => void;
    mode: 'ADD' | 'UPDATE';
    selectedExpense?: Expense;
}

const styles = StyleSheet.create({
    form: {
        marginTop: 50,
        marginBottom: 20,
    },
    fontTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
        textAlign: 'center',
        marginVertical: 24,
    },
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: colors.primary100,
        marginBottom: 4,
    },
    input: {
        backgroundColor: colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        color: colors.primary700,
    },
    inputMultiline: {
        minHeight: 100,
    },
    smallInputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    smallInputs: {
        flex: 1,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});

const ExpenseForm = (props: ExpenseFormProps) => {
    const [inputValues, setInputValues] = useState<InputValues>({
        amount: props.selectedExpense?.amount.toString() ?? '',
        date: props.selectedExpense?.date.toString()
            ? getFormattedDate(props.selectedExpense.date)
            : '',
        description: props.selectedExpense?.description.toString() ?? '',
    });

    return (
        <View style={styles.form}>
            <Text style={styles.fontTitle}>
                {props.mode === 'ADD'
                    ? 'Add a new expense'
                    : 'Edit your expense'}
            </Text>
            <View style={styles.smallInputsContainer}>
                <View style={[styles.inputContainer, styles.smallInputs]}>
                    <Text style={styles.label}>Amount</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter amount'
                        keyboardType='decimal-pad'
                        onChangeText={(text) => {
                            setInputValues((state) => ({
                                ...state,
                                amount: text,
                            }));
                        }}
                        returnKeyType='next'
                        value={inputValues.amount}
                    />
                </View>
                <View style={[styles.inputContainer, styles.smallInputs]}>
                    <Text style={styles.label}>Date</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='YYYY-MM-DD'
                        maxLength={10}
                        onChangeText={(text) => {
                            setInputValues((state) => ({
                                ...state,
                                date: text,
                            }));
                        }}
                        returnKeyType='next'
                        value={inputValues.date}
                    />
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={[styles.input, styles.inputMultiline]}
                    placeholder='Enter description'
                    onChangeText={(text) => {
                        setInputValues((state) => ({
                            ...state,
                            description: text,
                        }));
                    }}
                    multiline
                    textAlignVertical='top'
                    returnKeyType='done'
                    value={inputValues.description}
                />
            </View>
            <View style={styles.buttonsContainer}>
                <Button
                    text='Cancel'
                    onPress={() => {
                        props.onCancel();
                    }}
                    mode='FLAT'
                    style={styles.button}
                />
                <Button
                    text={props.mode === 'ADD' ? 'Add' : 'Update'}
                    onPress={() => {
                        const isAmountValid =
                            !isNaN(+inputValues.amount) &&
                            +inputValues.amount > 0;

                        const isDateValid =
                            new Date(inputValues.date).toString() !==
                            'Invalid Date';

                        const isDescriptionValid =
                            inputValues.description.trim().length > 0;

                        if (
                            isAmountValid &&
                            isDateValid &&
                            isDescriptionValid
                        ) {
                            props.onSubmit(inputValues);
                            return;
                        }

                        Alert.alert(
                            'Invalid input',
                            'Please check your input values'
                        );
                    }}
                    style={styles.button}
                />
            </View>
        </View>
    );
};
export default ExpenseForm;
