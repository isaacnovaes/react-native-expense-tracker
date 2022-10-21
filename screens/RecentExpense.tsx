import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

const RecentExpense = () => {
    return (
        <ExpensesOutput
            expensesPeriod='Recent'
            fallbackText='No expenses registered for the last 7 days'
        />
    );
};
export default RecentExpense;
