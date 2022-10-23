import { useMemo, createContext, useReducer } from 'react';
import { Expense, ExpenseWithoutID } from '../types/common';

interface User {
    id: string;
    name: string;
}

type ActionType =
    | { type: 'ADD_EXPENSE'; newExpenseData: Expense }
    | { type: 'REMOVE_EXPENSE'; expenseID: string }
    | {
          type: 'UPDATE_EXPENSE';
          expenseToUpdateID: string;
          newExpenseData: ExpenseWithoutID;
      }
    | { type: 'FETCH_EXPENSES'; expenses: Expense[] }
    | { type: 'SET_USER'; user: User }
    | { type: 'LOG_OUT' };

type StateType = {
    expenses: Expense[];
    user: { id: string; name: string } | null;
};

const initialState: StateType = {
    expenses: [],
    user: null,
};

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            return {
                ...state,
                expenses: [action.newExpenseData, ...state.expenses],
            };
        }
        case 'REMOVE_EXPENSE': {
            return {
                ...state,
                expenses: state.expenses.filter(
                    (expense) => expense.id !== action.expenseID
                ),
            };
        }
        case 'UPDATE_EXPENSE': {
            return {
                ...state,
                expenses: state.expenses.map((expense) => {
                    if (expense.id !== action.expenseToUpdateID) return expense;
                    return { ...expense, ...action.newExpenseData };
                }),
            };
        }
        case 'FETCH_EXPENSES': {
            return {
                ...state,
                expenses: action.expenses.reverse(), // firebase stores items chronologically, so reverse it so new items are the fist ones
            };
        }
        case 'SET_USER': {
            return {
                ...state,
                user: action.user,
            };
        }
        case 'LOG_OUT': {
            return {
                expenses: [],
                user: null,
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
