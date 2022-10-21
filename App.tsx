import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type {
    BottomTabsScreens,
    StackScreenBottomTabsProps,
    StackScreens,
} from './types/navigation';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import RecentExpense from './screens/RecentExpense';
import AllExpensesScreen from './screens/AllExpensesScreen';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from './colors/globalColors';
import IconButton from './components/UI/IconButton';
import { ContextProvider } from './context/ContextProvider';

const Stack = createNativeStackNavigator<StackScreens>();
const BottomTabs = createBottomTabNavigator<BottomTabsScreens>();

const BottomTabsScreensContainer = (props: StackScreenBottomTabsProps) => {
    return (
        <BottomTabs.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary500,
                },
                headerTintColor: colors.white,
                tabBarStyle: {
                    backgroundColor: colors.primary500,
                },
                tabBarActiveTintColor: colors.accent500,
                // eslint-disable-next-line react/no-unstable-nested-components
                headerRight: ({ tintColor }) => (
                    <IconButton
                        icon={
                            <Ionicons name='add' size={24} color={tintColor} />
                        }
                        onPress={() => {
                            props.navigation.navigate('ManageExpense', {
                                mode: 'ADD',
                            });
                        }}
                    />
                ),
            }}
        >
            <BottomTabs.Screen
                name='RecentExpenses'
                component={RecentExpense}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='hourglass' />
                    ),
                }}
            />
            <BottomTabs.Screen
                name='AllExpenses'
                component={AllExpensesScreen}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'Expenses',
                    // eslint-disable-next-line react/no-unstable-nested-components
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='calendar' />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
};

export default function App() {
    return (
        <ContextProvider>
            <StatusBar style='light' />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: { backgroundColor: colors.primary500 },
                        headerTintColor: colors.white,
                    }}
                >
                    <Stack.Screen
                        name='BottomTabs'
                        component={BottomTabsScreensContainer}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ManageExpense'
                        component={ManageExpenseScreen}
                        options={({ route }) => ({
                            title:
                                route.params.mode === 'ADD'
                                    ? 'Add Expense'
                                    : 'Edit Expense',
                            presentation: 'modal',
                        })}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </ContextProvider>
    );
}
