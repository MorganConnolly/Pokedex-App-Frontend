import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import useStore from '@/stores/loginStore';

export default function RegisterError() {
    const errors = useStore((state) => state.errors);

    return (
        <View style={styles.container}>
            {errors?.email && (
                <Text style={{color: 'red'}}>{errors?.email[0]}</Text>
            )}
            {errors?.password && (
                <Text style={{color: 'red'}}>{errors?.password[0]}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 5,
    height: 60,
  },
})