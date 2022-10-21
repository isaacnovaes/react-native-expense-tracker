import { View, StyleSheet, Text } from 'react-native';
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { colors } from '../../colors/globalColors';
import { useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { getDateMinusDays } from '../../utils/date';
import type { ExpensesPeriod } from '../../types/common';

interface ExpensesOutputProps {
    expensesPeriod: ExpensesPeriod;
    fallbackText: string;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        backgroundColor: colors.primary700,
    },
    fallbackText: {
        color: colors.white,
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    },
});

const ExpensesOutput = (props: ExpensesOutputProps) => {
    const {
        state: { expenses },
    } = useContext(Context);

    const today = new Date();
    const recentExpenses = expenses.filter((expense) => {
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date >= date7DaysAgo;
    });

    const expensesToRender =
        props.expensesPeriod === 'Recent' ? recentExpenses : expenses;

    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={expensesToRender}
                expensesPeriod={props.expensesPeriod}
            />
            {expensesToRender.length === 0 ? (
                <Text style={styles.fallbackText}>{props.fallbackText}</Text>
            ) : null}
            <ExpensesList expenses={expensesToRender} />
        </View>
    );
};
export default ExpensesOutput;
