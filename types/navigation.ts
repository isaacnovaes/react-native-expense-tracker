import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// Native Stack
export type StackScreens = {
    Login: undefined;
    SignUp: undefined;
    BottomTabs: undefined;
    ManageExpense: { expenseID?: string; mode: 'ADD' | 'UPDATE' };
};

export type StackScreenLoginProps = NativeStackScreenProps<
    StackScreens,
    'Login'
>;

export type StackScreenSignUpProps = NativeStackScreenProps<
    StackScreens,
    'SignUp'
>;

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
    Logout: undefined;
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

export type BottomTabLogOutProps = CompositeScreenProps<
    BottomTabScreenProps<BottomTabsScreens, 'Logout'>,
    NativeStackScreenProps<StackScreens>
>;
