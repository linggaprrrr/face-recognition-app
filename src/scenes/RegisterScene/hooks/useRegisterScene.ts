import { useState } from 'react';
import { Navigation } from '@navigations';
import { useGoogleLoginMutation, useRegisterMutation } from '@redux/services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastAndroid } from 'react-native';
import { validateEmail, validateName, validatePassword } from '@utils/index';
import Toast from 'react-native-toast-message';
import { validateRegistrationForm } from '../utils';
import { useDispatch } from 'react-redux';
import { useLazyGetMeQuery } from '@redux/services/users';
import { setUser } from '@redux/slice/user-slice';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export function useRegisterScene() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [checked, setChecked] = useState(false)
    const [register, { isLoading }] = useRegisterMutation()
    const [googleLogin, { isLoading: isGoogleLoggingIn }] = useGoogleLoginMutation();
    const dispatch = useDispatch();
    const [trigger] = useLazyGetMeQuery();

    async function handleSelfieBtn() {
        const validation = validateRegistrationForm(email, password, name);

        if (!validation.valid) {
            Toast.show({
                type: 'error',
                text1: 'Validasi gagal',
                text2: validation.message,
            });
            return;
        }


        try {
            const response = await register({
                email,
                password,
                name
            }).unwrap()

            if (response) {
                await AsyncStorage.setItem('token', response.access_token);
                Navigation.selfieScene();
            }
        } catch (error: any) {
            if (error.status === 400) {

                Toast.show({
                    type: 'error',
                    text1: 'Registrasi Gagal',
                    text2: 'Email sudah terdaftar',
                })
                return;
            }

            Toast.show({
                type: 'error',
                text1: 'Registrasi Gagal',
                text2: 'Terjadi masalah dengan upaya registrasi Anda.',
            })
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

    function goToLoginScene() {
        Navigation.loginScene();
    }

    return {
        state: {
            email,
            name,
            password,
            setPassword,
            loading: isLoading || isGoogleLoggingIn,
            checked,

        },
        method: {
            setPassword,
            setEmail,
            handleSelfieBtn,
            goToLoginScene,
            setName,
            setChecked,
            handleGoogleLogin
        },
    };
}
