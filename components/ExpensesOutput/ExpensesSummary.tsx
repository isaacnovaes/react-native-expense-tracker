import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../../colors/globalColors';
import type { Expense, ExpensesPeriod } from '../../types/common';

interface ExpenseSummaryProps {
    expenses: Expense[];
    expensesPeriod: ExpensesPeriod;
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: colors.primary50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
    },
    period: {
        fontSize: 12,
        color: colors.primary400,
    },
    total: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.primary500,
    },
});

const ExpensesSummary = (props: ExpenseSummaryProps) => {
    const expensesSum = props.expenses.reduce((sum, expense) => {
        sum += expense.amount;
        return sum;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>
                {props.expensesPeriod === 'Recent'
                    ? 'Last 7 days'
                    : 'All expenses'}
            </Text>
            <Text style={styles.total}>{`$${expensesSum.toFixed(2)}`}</Text>
        </View>
    );
};
export default ExpensesSummary;
