import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreens } from './types/navigation';
import ManageExpenseScreen from './screens/ManageExpenseScreen';
import BottomTabsScreensContainer from './screens/BottomTabsScreensContainer';
import { colors } from './colors/globalColors';
import { ContextProvider } from './context/ContextProvider';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

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
                    <Stack.Screen name='Login' component={Login} />
                    <Stack.Screen name='SignUp' component={SignUp} />
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
