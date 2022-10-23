import { useMemo, createContext, useReducer } from 'react';
import type { Expense, ExpenseWithoutID } from '../types/common';

type ActionType =
    | { type: 'ADD_EXPENSE'; newExpenseData: Expense }
    | { type: 'REMOVE_EXPENSE'; expenseID: string }
    | {
          type: 'UPDATE_EXPENSE';
          expenseToUpdateID: string;
          newExpenseData: ExpenseWithoutID;
      }
    | { type: 'FETCH_EXPENSES'; expenses: Expense[] };

type StateType = {
    expenses: Expense[];
};

const initialState: StateType = {
    expenses: [],
};

const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            return {
                expenses: [action.newExpenseData, ...state.expenses],
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
        case 'FETCH_EXPENSES': {
            return {
                expenses: action.expenses.reverse(), // firebase stores items chronologically, so reverse it so new items are the fist ones
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
