import { colors } from '../colors/globalColors';
import type {
    BottomTabsScreens,
    StackScreenBottomTabsProps,
} from '../types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpensesScreen from './AllExpensesScreen';
import RecentExpense from './RecentExpense';
import IconButton from '../components/UI/IconButton';
import Ionicons from '@expo/vector-icons/Ionicons';

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

export default BottomTabsScreensContainer;
