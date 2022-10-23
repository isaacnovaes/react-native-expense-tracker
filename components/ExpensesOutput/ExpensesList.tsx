import { FlatList } from 'react-native';
import { Expense } from '../../types/common';
import ExpenseItem from './ExpenseItem';

interface ExpensesListProps {
    expenses: Expense[];
}

const ExpensesList = (props: ExpensesListProps) => {
    return (
        <FlatList
            data={props.expenses}
            renderItem={({ item }) => <ExpenseItem {...item} />}
            keyExtractor={(item) => item.id}
        />
    );
};
export default ExpensesList;
