import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosConfig from '@/axiosConfig';
import CarouselComponent from './CarouselComponent';
import { useFocusEffect } from 'expo-router';

type ResponseData= {
    id: number,
    name: string,
}[]

export default function UnlockedFavourites() {
    const queryClient = useQueryClient();

    // Fetch favourite pokemon ids.
    const { isLoading, error, data, isFetching } = useQuery<ResponseData>({
        queryKey: ['FavouriteInfo-FavouritesPage'],
        refetchOnMount: true,
        queryFn: async () => {
            
            const response = await axiosConfig.get(process.env.EXPO_PUBLIC_API + 'favs/');
            return response.data.favourites;
        }
    })

    // Doesn't automatically refetch on remount because no state change, so must force manual refetch
    useFocusEffect(
        React.useCallback(() => {
            queryClient.invalidateQueries({
                queryKey: ['FavouriteInfo-FavouritesPage']
            });
        }, [])
    );

    return (
        (data?.length === 0) ? (
            <View style={styles.container}>
                <Text style={styles.noneText}>No Favourites Found...</Text>
            </View>
        ) : (
            <View>
                <FlatList 
                    data={data}
                    renderItem={({item}) => <CarouselComponent name={item.name} id={item.id}/>}
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                />
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
    }, noneText: {
        fontSize: 20,
		color: "grey",
    }
})