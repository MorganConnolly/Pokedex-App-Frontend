import { StyleSheet, Text, View } from 'react-native';
import React, {useEffect, useState} from 'react';

import { type } from '@/app/pokemon_details/[name]';
import TypeBox from './TypeBox';

type TypesContainerProps = {
  PokemonTypes: type[];
}

export default function TypesContainer({PokemonTypes}: TypesContainerProps) {

  const arrayOfTypeNames = PokemonTypes.map((value) => value.type.name.charAt(0).toUpperCase() + value.type.name.slice(1));

  // Create TypeBox component which renders a type box for each in the list.

  return (
    <View style={styles.container}>
      {arrayOfTypeNames.map((typeName) => (
        <TypeBox key={typeName} typeName={typeName} />))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    position: 'absolute',
    top: '1%',
    right: '1%',
  }
})