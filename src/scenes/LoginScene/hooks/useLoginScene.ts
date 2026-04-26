import { useState } from 'react';
import { Navigation } from '@navigations';
import { useGoogleLoginMutation, useLoginMutation } from '@redux/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useLazyGetMeQuery } from '@redux/services/users';
import { setUser } from '@redux/slice/user-slice';
import Toast from 'react-native-toast-message';
import { validateEmail } from '@utils/index';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import crashlytics from '@react-native-firebase/crashlytics';

export function useLoginScene() {
    const dispatch = useDispatch();
    const [trigger] = useLazyGetMeQuery();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [email, setEmail] = useState('john@example.com');
    // const [password, setPassword] = useState('1234');
    const [login, { isLoading }] = useLoginMutation();
    const [googleLogin, { isLoading: isGoogleLoggingIn }] = useGoogleLoginMutation();


    async function handleLogin() {
        if (!validateEmail(email)) {
            Toast.show({
                type: 'error',
                text1: 'Invalid Email Format',
                text2: 'Please enter a valid email address.',
            });
            return;
        }

        try {
            const response = await login({
                email,
                password,
            }).unwrap();

            if (response) {
                await AsyncStorage.setItem('token', response.access_token);
                const authMe = await trigger();
                if (authMe.isSuccess) {
                    dispatch(setUser(authMe?.data));
                    Navigation.homeScene(Navigation.RESET);
                }
            }

        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: 'There was an issue with your login attempt.',
            });
        }
    }

    async function handleGoogleLogin() {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            const idToken = userInfo.data?.idToken;

            const response = await googleLogin({ token: idToken }).unwrap()
            await AsyncStorage.setItem('token', response.access_token);

            const authMe = await trigger();
            if (authMe.isSuccess) {
                dispatch(setUser(authMe.data));
                Navigation.homeScene(Navigation.RESET);
            }

        } catch (error) {

            Toast.show({
                type: 'error',
                text1: 'Google Login Failed',
                text2: JSON.stringify(error),
            });
        }
    }

    function goToSelfieScene() {
        Navigation.selfieScene();
    }

    function goToRegisterScene() {
        Navigation.registerScene();
    }

    return {
        state: {
            email,
            password,
            loading: isLoading || isGoogleLoggingIn,
        },
        method: {
            setPassword,
            setEmail,
            goToSelfieScene,
            goToRegisterScene,
            handleLogin,
            handleGoogleLogin
        },
    };
}
