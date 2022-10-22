import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { StackScreens } from './types/navigation';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import BottomTabsScreensContainer from './screens/BottomTabsScreensContainer';
import { colors } from './colors/globalColors';
import { ContextProvider } from './context/ContextProvider';

const Stack = createNativeStackNavigator<StackScreens>();

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
