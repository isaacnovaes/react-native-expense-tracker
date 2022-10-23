export interface Expense {
    description: string;
    date: Date;
    amount: number;
    id: string;
}

export type ExpenseWithoutID = Omit<Expense, 'id'>;

export type ExpensesPeriod = 'Total' | 'Recent';
