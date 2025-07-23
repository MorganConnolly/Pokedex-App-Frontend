import { StyleSheet, View } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from 'expo-router';

import RegisterPageInput from '@/components/RegisterPageInput';
import RegisterButton from '@/components/RegisterButton';
import RegisterError from '@/components/RegisterError';
import useStore from '@/stores/registerStore';

export default function register() {
  const navigation = useNavigation();
  const clearErrors = useStore((state) => state.clearErrors);

  useLayoutEffect(() => {
        navigation.setOptions({
          title: 'Register an Account',
        });
    }, [navigation]);

    // Clear errors on page load
    useEffect(() => {
      clearErrors();
    }, []);

  return (
    <View style={styles.container}>
      <RegisterPageInput inputBoxType='email'/>
      <RegisterPageInput inputBoxType='username'/>
      <RegisterPageInput inputBoxType='password'/>
      <RegisterButton />
      <RegisterError />
    </View>
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
})