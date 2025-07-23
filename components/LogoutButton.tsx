import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

import useTokenStore from '@/stores/tokenStore';
import useStore from '@/stores/store';

export default function LogoutButton() {
    const logoutState = useStore((state) => state.logoutUser);
    const setFavToken = useTokenStore((state) => state.setFavToken);

    function logoutUser() {
        logoutState();
        setFavToken('');
    }

    return (
        <Pressable style={styles.button} onPress={logoutUser}>
            <Text style={styles.buttonLabel}>Logout</Text>
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