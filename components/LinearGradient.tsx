import { StyleSheet, View } from 'react-native'
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Color, { ColorInstance } from 'color';
import { LinearGradient } from 'expo-linear-gradient';

import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import useStore from '@/stores/store';

type QueryProps = {
    colour: ColorInstance;
}

type ComponentProps = {
  pokemonName: string,
  colour?: ColorInstance,
}

function lightenColor(baseColour: ColorInstance): ColorInstance {
    return baseColour.lighten(0.7);
}

export default function DetailBackground({pokemonName}: {pokemonName: string}) {
    const route = useRoute();
    const viewingFavPage = route.name === "favourites";
    const updateColourViewed = useStore((state) => state.updateColourViewed);

    const { isLoading, error, data, isFetching } = useQuery<QueryProps>({
    queryKey: ['pokemonColours', pokemonName],
    queryFn: async () => {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName.toLowerCase()}`);
        const json = {...response.data};
        
        updateColourViewed(Color(json.color.name));

        return ({
        colour: Color(json.color.name),
        });
    }
    })

    const lighterColor = data ? lightenColor(data.colour).hex() : '#fff';

  return (
    <View style={{
        ...(viewingFavPage ? {borderRadius: 25} : {}),
        overflow: 'hidden',
        width: '100%',
        flex: 1,
        alignItems: 'center',
        position: 'relative'
        }}>
        <View style={[styles.backgroundSegment, styles.shadow, {backgroundColor: 'black'}]} />
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[data ? data.colour.hex() : '#fff', lighterColor]}
            style={styles.backgroundSegment} />
    </View>
  )
}

const styles = StyleSheet.create({
backgroundSegment: {
    position: "absolute",
    width: '110%',
    height: '30%',
    top: '0%',
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
  },
  shadow: {
      shadowColor: 'black',
      shadowOffset: {width: -1, height:4 },
      shadowOpacity: 0.3,
      shadowRadius: 50,
      elevation: 5,
  }
})