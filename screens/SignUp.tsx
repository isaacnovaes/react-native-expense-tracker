import { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../colors/globalColors';
import Button from '../components/UI/Button';
import Input from '../components/UI/Input';
import PasswordInput from '../components/UI/PasswordInput';
import CustomKeyboardAvoidingView from '../components/UI/CustomKeyboardAvoidingView';
import { singUp, SingUpErrorResponse } from '../utils/auth';
import { Context } from '../context/ContextProvider';
import { StackScreenSignUpProps } from '../types/navigation';
import axios from 'axios';
import LoadingOverlay from '../components/UI/LoadingOverlay';
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

const SignUp = (props: StackScreenSignUpProps) => {
    const credentialsInitialState = {
        email: '',
        password: '',
        name: '',
    };
    const [credentials, setCredentials] = useState(credentialsInitialState);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ state: false, message: '' });

    const { dispatch } = useContext(Context);

    const signUpHandler = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await singUp(email, password);
            if (response.status === 200 && response.data.email) {
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
            if (axios.isAxiosError<SingUpErrorResponse>(e)) {
                if (e.response) {
                    const message = e.response.data.error.message;
                    switch (message) {
                        case 'EMAIL_EXISTS': {
                            setError({
                                state: true,
                                message: 'Email already exists',
                            });
                            break;
                        }
                        case 'TOO_MANY_ATTEMPTS_TRY_LATER': {
                            setError({
                                state: true,
                                message: 'Too many attempts. Try later',
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
        <CustomKeyboardAvoidingView>
            <View style={styles.container}>
                <View style={styles.loginContainer}>
                    <Input
                        label='Name'
                        type='default'
                        returnKeyType='next'
                        value={credentials.name}
                        onChange={(text) => {
                            setCredentials((state) => ({
                                ...state,
                                name: text,
                            }));
                        }}
                    />
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
                        text='Sign up'
                        onPress={() => {
                            if (
                                credentials.name &&
                                credentials.email.includes('@') &&
                                credentials.password &&
                                credentials.password.length > 6
                            ) {
                                void signUpHandler(
                                    credentials.email,
                                    credentials.password
                                );
                            } else {
                                setError({
                                    state: true,
                                    message:
                                        'Enter a correct email and password',
                                });
                            }
                        }}
                    />
                </View>
            </View>
        </CustomKeyboardAvoidingView>
    );
};

export default SignUp;
