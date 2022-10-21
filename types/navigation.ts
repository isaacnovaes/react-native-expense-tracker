import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Native Stack
export type StackScreens = {
    ManageExpense: { expenseID?: string; mode: 'ADD' | 'UPDATE' };
    BottomTabs: undefined;
};

// Only a Screens Container
export type StackScreenBottomTabsProps = NativeStackScreenProps<
    StackScreens,
    'BottomTabs'
>;

export type StackScreenManageExpenseProps = NativeStackScreenProps<
    StackScreens,
    'ManageExpense'
>;

// Bottom Tabs
export type BottomTabsScreens = {
    RecentExpenses: undefined;
    AllExpenses: undefined;
};

export type BottomTabRecentExpensesProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabsScreens, 'RecentExpenses'>,
    NativeStackScreenProps<StackScreens>
>;

export type BottomTabAllExpensesProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabsScreens, 'AllExpenses'>,
    NativeStackScreenProps<StackScreens>
>;

export type BottomTabAllExpensesItemListNavHook =
    BottomTabAllExpensesProps['navigation'];
