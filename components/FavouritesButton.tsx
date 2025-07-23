import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axiosConfig from '@/axiosConfig';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorInstance } from 'color';
import { PokemonProps } from './PokemonDetails';
import { AxiosError, AxiosResponse } from 'axios';

type FavouriteInfo = {
    name: string,
    colour: string,
    data?: PokemonProps,
}

type ResponseData= {
    isFavourite: boolean,
    pokemonID: string,
}

export default function FavouritesButton({name, colour, data} : FavouriteInfo) {
    const queryClient = useQueryClient();
    // Fetch favourites to colour the button.
    // When it's pressed, it should add or remove the pokemon from the favourites.

    // Fetch favourites to and return boolean to select the necessary icon
    const { isLoading, error, data: payload, isFetching } = useQuery<ResponseData>({
        queryKey: ['FavouriteInfo', name],
        queryFn: async () => {
            
            const response = await axiosConfig.get(process.env.EXPO_PUBLIC_API + 'favs/');
            const favouritesArray = response.data.favourites;

            for (const favourite of favouritesArray) {
                
                if (favourite.name === name) {
                    return ({
                        isFavourite: true,
                        pokemonID: favourite.id,
                    });
                }
            }

            return ({
                isFavourite: false,
                pokemonID: '',
            });
        }
    })

    // Add pokemon to favourites
    const addFavourite = useMutation<AxiosResponse, AxiosError, FavouriteInfo>({
        mutationFn: async (formData: FavouriteInfo) => {
            const response = await axiosConfig.post(process.env.EXPO_PUBLIC_API + 'favs/', formData);
            return response
            },
            onError: (error: AxiosError) => {
                const errorData = JSON.parse(error.response?.request._response);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['FavouriteInfo', name],
                });
            }
    });

    // Delete pokemon from favourites
    const deleteFavourite = useMutation<AxiosResponse, AxiosError>({
        mutationFn: async () => {
            const response = await axiosConfig.delete(process.env.EXPO_PUBLIC_API + `favs/${payload?.pokemonID}`);
            return response
            },
            onError: (error: AxiosError) => {
                const errorData = JSON.parse(error.response?.request._response);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({
                    queryKey: ['FavouriteInfo', name],
                });
            }
    });

    // Run add/delete function depending on if it's in favourites
    async function updateFavourites() {
        if (payload?.isFavourite == false) {
            await addFavourite.mutateAsync({
                name: name,
                colour: colour,
                data: data
            });
        } else {
            await deleteFavourite.mutateAsync();
        }
    }

    return (
        isLoading ? (
            <></>
        ) : (
            <Pressable onPress={() => updateFavourites()}>
                {payload?.isFavourite ? (
                    <Ionicons name={'star'} color={'#ededed'} size={40}/>
                ) : (
                    <Ionicons name={'star-outline'} color={'#ededed'} size={40}/>
                )}
            </Pressable>
        )
    )
}

const styles = StyleSheet.create({})