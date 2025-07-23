import { Pressable, TextInput, Text, FlatList, StyleSheet, View } from 'react-native';
import React, {useEffect, useState} from 'react';

import useStore from '@/stores/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import LoginPageInput from '@/components/LoginPageInput';
import LoginButton from '@/components/LoginButton';
import LoginError from '@/components/LoginError';
import UnlockedFavourites from '@/components/UnlockedFavourites';
import LogoutButton from '@/components/LogoutButton';

export default function Favourites() {
    const isLoggedIn = useStore((state) => state.isLoggedIn);

    // AsyncStorage.clear()

    return (
        isLoggedIn ? (
            <View style={styles.container}>
                <UnlockedFavourites/>
                <View style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    }}>
                    <LogoutButton/>
                </View>
            </View>
        ) : (
            <View style={styles.container}>
                <LoginPageInput inputBoxType='email'/>
                <LoginPageInput inputBoxType='password'/>
                <View style={{flexDirection: 'row', gap: 10}}>
                    <Pressable style={styles.button} onPress={() => router.navigate('/register')}>
                        <Text style={styles.buttonLabel}>Register an Account</Text>
                    </Pressable>
                    <LoginButton />
                </View>
                <LoginError />
            </View>
        )
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 10,
    },
    noneText: {
        fontSize: 20,
		color: "grey",
    },
    searchBox: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 8,
		width: '90%',
		backgroundColor: 'white',
	},
	shadow: {
        shadowColor: 'black',
        shadowOffset: {width: -1, height:4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
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
        textTransform: 'capitalize',
    }
})