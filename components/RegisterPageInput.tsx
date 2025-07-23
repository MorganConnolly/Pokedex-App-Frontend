import { TextInput, StyleSheet, Text, View, InputAccessoryView } from 'react-native'
import React from 'react'

import useStore from '@/stores/registerStore';

type inputProps = {
    inputBoxType: 'email' | 'password' | 'username';
}

export default function RegisterPageInput({inputBoxType}: inputProps) {
    let value, setValueInput;

    if (inputBoxType === 'email') {
        value = useStore((state) => state.email);
        setValueInput = useStore((state) => state.setEmailInput);
    } else if (inputBoxType === 'username') {
        value = useStore((state) => state.username);
        setValueInput = useStore((state) => state.setUsernameInput);
    } else {
        value = useStore((state) => state.password);
        setValueInput = useStore((state) => state.setPasswordInput);
    }

    return (
    <>
        {inputBoxType === 'password' ? (
            <TextInput
                style={[styles.searchBox, styles.shadow]}
                placeholder="Password"
                clearButtonMode="always"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="current-password"
                secureTextEntry={true}
                value={value}
                onChangeText={setValueInput}
            />
            ) : inputBoxType === 'email' ? (
                <TextInput
                    style={[styles.searchBox, styles.shadow]}
                    placeholder='Email'
                    clearButtonMode='always'
                    autoCapitalize='none'
                    autoCorrect={false}
                    autoComplete='email'
                    keyboardType="email-address"
                    value={value}
                    onChangeText={setValueInput}
                />
            ) : (
                <TextInput
                    style={[styles.searchBox, styles.shadow]}
                    placeholder="Name"
                    clearButtonMode="always"
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete="username"
                    value={value}
                    onChangeText={setValueInput}
                />
            )
        }
    </>
  );
}

const styles = StyleSheet.create({
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
})