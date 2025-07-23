import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import useStore from '@/stores/store';
import { dataTagSymbol, useQuery } from '@tanstack/react-query';
import axiosConfig from '@/axiosConfig';
import Color, { ColorInstance } from 'color';

type ComponentProps = {
    pokemonName: string,
    pokemonID: number,
}

type ResponseData = string;

export default function PokemonName({pokemonName, pokemonID}: ComponentProps) {
    // Fetch favourite pokemon ids.
    const { isLoading, error, data, isFetching } = useQuery<ResponseData>({
        queryKey: ['NameColour', pokemonID],
        refetchOnMount: true,
        queryFn: async () => {
            
            const response = await axiosConfig.get(process.env.EXPO_PUBLIC_API + `favs/${pokemonID}`);
            const colour = Color.rgb(response.data.colour)

            if (colour.luminosity() < 0.5) {
                return 'white';
            }
            return 'black';
        }
    })

    return (
        <View>
            { isLoading ? (
                <></>
            ) : (
                <Text style={[styles.text, {
                    color: data,
                }]}>
                    {pokemonName}
                </Text>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        textTransform: 'capitalize',
        width: '100%',
    }
})