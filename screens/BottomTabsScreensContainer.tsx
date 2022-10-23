import { colors } from '../colors/globalColors';
import {
    BottomTabLogOutProps,
    BottomTabsScreens,
    StackScreenBottomTabsProps,
} from '../types/navigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllExpensesScreen from './AllExpensesScreen';
import RecentExpense from './RecentExpense';
import IconButton from '../components/UI/IconButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AntDesign } from '@expo/vector-icons';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../components/UI/Button';
import { useContext } from 'react';
import { Context } from '../context/ContextProvider';

const BottomTabs = createBottomTabNavigator<BottomTabsScreens>();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: colors.primary700,
    },
    message: {
        color: colors.white,
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

const Logout = (props: BottomTabLogOutProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.message}>Log out</Text>
            <Button
                text='Okay'
                onPress={() => props.navigation.navigate('Login')}
            />
        </View>
    );
};

const BottomTabsScreensContainer = (props: StackScreenBottomTabsProps) => {
    const {
        state: { user },
    } = useContext(Context);

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
            {user ? (
                <>
                    <BottomTabs.Screen
                        name='RecentExpenses'
                        component={RecentExpense}
                        options={{
                            title: 'Recent Expenses',
                            tabBarLabel: 'Recent',
                            // eslint-disable-next-line react/no-unstable-nested-components
                            tabBarIcon: ({ color, size }) => (
                                <Ionicons
                                    color={color}
                                    size={size}
                                    name='hourglass'
                                />
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
                                <Ionicons
                                    color={color}
                                    size={size}
                                    name='calendar'
                                />
                            ),
                        }}
                    />
                    <BottomTabs.Screen
                        name='Logout'
                        component={Logout}
                        options={{
                            title: 'Logout',
                            tabBarLabel: 'Logout',
                            // eslint-disable-next-line react/no-unstable-nested-components
                            tabBarIcon: ({ color, size }) => (
                                <AntDesign
                                    name='logout'
                                    size={size}
                                    color={color}
                                />
                            ),
                        }}
                    />
                </>
            ) : null}
        </BottomTabs.Navigator>
    );
};

export default BottomTabsScreensContainer;
