import { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../colors/globalColors';
import Button from '../components/UI/Button';
import { StackScreenLoginProps } from '../types/navigation';
import Input from '../components/UI/Input';
import PasswordInput from '../components/UI/PasswordInput';
import { login, LoginErrorResponse } from '../utils/auth';
import { Context } from '../context/ContextProvider';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import axios from 'axios';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary800,
        paddingHorizontal: 24,
        paddingTop: 30,
    },
    loginContainer: {
        backgroundColor: colors.primary400,
        padding: 20,
        borderRadius: 6,
    },
});

const Login = (props: StackScreenLoginProps) => {
    const credentialsInitialState = { email: '', password: '' };

    const [credentials, setCredentials] = useState(credentialsInitialState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: '' });

    const { dispatch } = useContext(Context);

    const loginHandler = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await login(email, password);
            if (response.status === 200 && response.data.registered) {
                dispatch({
                    type: 'SET_USER',
                    user: {
                        id: response.data.localId,
                        name: response.data.email,
                    },
                });
                setCredentials(credentialsInitialState);
                props.navigation.navigate('BottomTabs');
            }
        } catch (e) {
            if (axios.isAxiosError<LoginErrorResponse>(e)) {
                if (e.response) {
                    const message = e.response.data.error.message;
                    switch (message) {
                        case 'EMAIL_NOT_FOUND': {
                            setError({
                                state: true,
                                message: 'Email not found',
                            });
                            break;
                        }
                        case 'INVALID_PASSWORD': {
                            setError({
                                state: true,
                                message: 'Invalid password',
                            });
                            break;
                        }
                        default:
                            setError({
                                state: true,
                                message: 'Error while logging in',
                            });
                    }
                }
            }
        }

        setLoading(false);
    };

    if (loading) {
        return <LoadingOverlay />;
    }

    if (error.state) {
        return (
            <ErrorOverlay
                message={error.message}
                onPress={() => {
                    setError({ state: false, message: '' });
                }}
            />
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Input
                    label='Email Address'
                    type='email-address'
                    returnKeyType='next'
                    value={credentials.email}
                    onChange={(text) => {
                        setCredentials((state) => ({
                            ...state,
                            email: text,
                        }));
                    }}
                />
                <PasswordInput
                    label='Password'
                    value={credentials.password}
                    onChange={(text) => {
                        setCredentials((state) => ({
                            ...state,
                            password: text,
                        }));
                    }}
                />
                <Button
                    text='Log in'
                    onPress={() => {
                        if (
                            credentials.email.includes('@') &&
                            credentials.password &&
                            credentials.password.length > 6
                        ) {
                            void loginHandler(
                                credentials.email,
                                credentials.password
                            );
                        } else {
                            setError({
                                state: true,
                                message: 'Enter a correct email and password',
                            });
                        }
                    }}
                />
                <Button
                    text='Create a new user'
                    onPress={() => {
                        props.navigation.navigate('SignUp');
                    }}
                    mode='FLAT'
                />
            </View>
        </View>
    );
};
export default Login;
