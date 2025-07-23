import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type StatBoxProps = {
    name: string;
    value: string;
}

export default function StatBox({name, value}: StatBoxProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name.toUpperCase()}</Text>
      <Text style={styles.subtext}>{value}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 15,
      borderWidth: 3,
      padding: 8,
      borderColor: '#d3d3d3',
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#3d3d3d',
    },
    subtext: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#707070',
    }
})