import { Platform, Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'

import PokemonDetails from '@/components/PokemonDetails';

const windowWidth = Dimensions.get('window').width - 20;
const windowHeight = Dimensions.get('window').height - 40;

type ComponentProps = {
  name: string,
  id: number,
}

export default function CarouselComponent({name, id}: ComponentProps) {

  return (
    <View style={[styles.container,
      { height: Platform.OS === 'android' ? windowHeight*0.88 : windowHeight*0.8 }
    ]}>
      <PokemonDetails pokemonName={name} pokemonID={id}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: windowWidth,
      height: windowHeight*0.8,
      margin: 10,
      borderColor: 'grey',
      borderWidth: 5,
      borderRadius: 30,
  }
})