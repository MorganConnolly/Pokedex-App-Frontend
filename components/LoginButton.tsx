import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AxiosError, AxiosResponse } from 'axios';

import { useMutation } from '@tanstack/react-query';
import useInputStore from '@/stores/loginStore';
import useTokenStore from '@/stores/tokenStore';
import useStore from '@/stores/store';
import axiosConfig from '@/axiosConfig';

type Payload = {
    token: string
}

type InputData = {
    email: string,
    password: string,
}

export default function LoginButton() {
    const setFavToken = useTokenStore((state) => state.setFavToken);
    const setErrors = useInputStore((state) => state.setErrors);
    const email = useInputStore((state) => state.email);
    const password = useInputStore((state) => state.password);
    const loginUser = useStore((state) => state.loginUser);

    const mutation = useMutation<AxiosResponse<Payload>, AxiosError, InputData>({
        mutationFn: async (formData: InputData) => {
            return await axiosConfig.post(process.env.EXPO_PUBLIC_API + 'login', formData);
         
            },
            onError: (error: AxiosError) => {
                const errorData = JSON.parse(error.response?.request._response);
                setErrors(errorData.errors);
            },
            onSuccess: (response) => {
                setFavToken(response.data.token)
                loginUser();
            }
    });

    async function loginAccount() {
        await mutation.mutate({
            email: email,
            password: password
        });
    };

    return (
        <Pressable style={styles.button} onPress={loginAccount}>
            <Text style={styles.buttonLabel}>Login</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#cdcdcdff',
        padding: 10,
        borderColor: 'grey',
        borderWidth: 3,
    },
    buttonLabel: {
        fontSize: 15,
        paddingRight: 2,
    }
})