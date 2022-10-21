export interface Expense {
    description: string;
    date: Date;
    amount: number;
    id: string;
}

export type ExpensesPeriod = 'Total' | 'Recent';
