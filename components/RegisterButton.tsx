import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AxiosError, AxiosResponse } from 'axios';
import { useRouter } from 'expo-router';

import { useMutation } from '@tanstack/react-query';
import useInputStore from '@/stores/registerStore';
import useTokenStore from '@/stores/tokenStore';
import useStore from '@/stores/store';
import axiosConfig from '@/axiosConfig';


type Payload = {
    token: string
}

type InputData = {
    email: string,
    name: string,
    password: string,
}

export default function RegisterButton() {
    const setFavToken = useTokenStore((state) => state.setFavToken);
    const setErrors = useInputStore((state) => state.setErrors);
    const email = useInputStore((state) => state.email);
    const username = useInputStore((state) => state.username);
    const password = useInputStore((state) => state.password);
    const loginUser = useStore((state) => state.loginUser);
    const router = useRouter();

    const mutation = useMutation<AxiosResponse<Payload>, AxiosError, InputData>({
        mutationFn: async (formData: InputData) => {
            const response = await axiosConfig.post(process.env.EXPO_PUBLIC_API + 'register', formData);
            return response
            },
            onError: (error: AxiosError) => {
                const errorData = JSON.parse(error.response?.request._response);
                setErrors(errorData.errors);
            },
            onSuccess: (response) => {
                setFavToken(response.data.token)
                loginUser();
                router.back();
            }
    });

    async function registerAccount() {
        await mutation.mutateAsync({
            email: email,
            name: username,
            password: password
        });
    };

    return (
        <Pressable style={styles.button} onPress={registerAccount}>
            <Text style={styles.buttonLabel}>Register</Text>
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