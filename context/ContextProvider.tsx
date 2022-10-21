import { useMemo, createContext, useReducer } from 'react';
import type { Expense } from '../types/common';

type ActionType =
    | { type: 'ADD_EXPENSE'; newExpenseData: Omit<Expense, 'id'> }
    | { type: 'REMOVE_EXPENSE'; expenseID: string }
    | {
          type: 'UPDATE_EXPENSE';
          expenseToUpdateID: string;
          newExpenseData: Omit<Expense, 'id'>;
      };

type StateType = {
    expenses: Expense[];
};

const initialState: StateType = {
    expenses: [
        {
            id: 'first',
            amount: 300,
            description: 'A pair of shoes',
            date: new Date('2021-11-18'),
        },
        {
            id: 'second',
            amount: 30.95,
            description: 'A pair of trousers',
            date: new Date('2022-09-15'),
        },
        {
            id: 'third',
            amount: 3.98,
            description: 'Some bananas',
            date: new Date('2022-11-13'),
        },
        {
            id: 'fourth',
            amount: 85.47,
            description: 'A book',
            date: new Date('2022-11-18'),
        },
        {
            id: 'fifth',
            amount: 85.47,
            description: 'A backpack',
            date: new Date('2020-11-17'),
        },
        {
            id: 'd1',
            amount: 300,
            description: 'A pair of shoes',
            date: new Date('2022-11-18'),
        },
        {
            id: 'd2',
            amount: 30.95,
            description: 'A pair of trousers',
            date: new Date('2022-11-15'),
        },
        {
            id: 'd3',
            amount: 3.98,
            description: 'Some bananas',
            date: new Date('2022-11-13'),
        },
        {
            id: 'd4',
            amount: 85.47,
            description: 'A book',
            date: new Date('2022-07-18'),
        },
        {
            id: 'd6',
            amount: 85.47,
            description: 'A backpack',
            date: new Date('2022-11-17'),
        },
        {
            id: 'd7',
            amount: 300,
            description: 'A pair of shoes',
            date: new Date('2022-11-18'),
        },
        {
            id: 'd8',
            amount: 30.95,
            description: 'A pair of trousers',
            date: new Date('2022-05-15'),
        },
        {
            id: 'sf',
            amount: 3.98,
            description: 'Some bananas',
            date: new Date('2022-11-13'),
        },
        {
            id: 'fwegweg',
            amount: 85.47,
            description: 'A book',
            date: new Date('2022-11-18'),
        },
        {
            id: 'xvsvwe',
            amount: 85.47,
            description: 'A backpack',
            date: new Date('2020-11-17'),
        },
    ],
};

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            return {
                expenses: [
                    ...state.expenses,
                    { ...action.newExpenseData, id: Math.random().toString() },
                ],
            };
        }
        case 'REMOVE_EXPENSE': {
            return {
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.expenseID
                ),
            };
        }
        case 'UPDATE_EXPENSE': {
            return {
                expenses: state.expenses.map((expense) => {
                    if (expense.id !== action.expenseToUpdateID) return expense;
                    return { ...expense, ...action.newExpenseData };
                }),
            };
        }
        default:
            return state;
    }
};

const Context = createContext<{
    state: StateType;
    dispatch: React.Dispatch<ActionType>;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
}>({ state: initialState, dispatch: () => {} });

type ProviderPropsType = {
    children: React.ReactNode;
};

function ContextProvider({ children }: ProviderPropsType) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const data = useMemo(() => {
        return { state, dispatch };
    }, [state]);

    return <Context.Provider value={data}>{children}</Context.Provider>;
}

export { Context, ContextProvider };
