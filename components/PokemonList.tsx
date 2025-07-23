import { TextInput, ActivityIndicator, View, Text, Platform, StyleSheet, FlatList, ImageSourcePropType } from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

import PokemonButton from './PokemonButton';
import { useQuery } from '@tanstack/react-query';

type PokemonProps = {
	name: string;
	url?: string;
	sprite: ImageSourcePropType;
};

function debounce(func, timeout = 300) {
	let timer;
	return (...args) => {
		clearTimeout(timer);
		timer = setTimeout(() => { func.apply(this, args); }, timeout);
	};
};

const numOfPokemon = 100; // Limit the number of Pokémon to fetch
const timeout = 500; // Debounce time for searching.

export default function PokemonList() {
	const [searchQuery, setSearchQuery] = useState('');
	const [filteredResult, setFilteredResult] = useState<PokemonProps[] | undefined>([]);
	const debouncedHandleSearch = debounce(handleSearch, timeout);

	function handleSearch() {
		const formattedQuery = searchQuery.toLowerCase();
		const filteredResult = data?.filter((pokemon) => pokemon.name.includes(formattedQuery));

		setFilteredResult(filteredResult);
	};

	const { isLoading, error, data, isFetching } = useQuery<PokemonProps[]>({
		queryKey: ['pokemonList'],
		queryFn: async () => {
			let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=${numOfPokemon}`);
			const json = response.data.results.sort((a: PokemonProps, b: PokemonProps) => a.name.localeCompare(b.name));

			for (let i = 0; i < json.length; i++) {
				response = await axios.get(json[i]["url"]);
				const sprite = response.data.sprites.front_default;
				json[i]["sprite"] = sprite;
			}

			return json;
		}
		}
	)

	useEffect(() => {
	  if (searchQuery) {
		debouncedHandleSearch();
		return;
	  }

	  setFilteredResult(data);
	
	}, [data, searchQuery])
	

	if (error) console.error(error)

    return (
		<>
			{isLoading ? (
				<>
					<View style={styles.loadingContainer}>
						<ActivityIndicator />
						<Text style={styles.loadingText}>Loading Pokémon...</Text>
					</View>
				</>
			) : (
				<>
					<FlatList 
						contentContainerStyle={styles.listContainer}
						showsVerticalScrollIndicator={Platform.OS === "web"}
						data={filteredResult}
						keyExtractor={item => item.name}
						renderItem={({item}) => <PokemonButton name={item.name} sprite={item.sprite} />}
						ListHeaderComponent={
							<View style={{backgroundColor: 'transparent', height: 70}}/>
						}
						ListEmptyComponent={
							<Text style={styles.loadingText}>No results...</Text>
						}
					/> 
				</>
			) }
			<TextInput 
				placeholder="Search"
				clearButtonMode="always"
				style={[styles.searchBox, styles.shadow]}
				autoCapitalize='none'
				autoCorrect={false}
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>
		</>
    )
};

const styles = StyleSheet.create({
	listContainer: {
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "space-between",
	},
	loadingContainer: {
		fontSize: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	loadingText: {
		paddingLeft: 10,
		fontSize: 20,
		color: "grey",
	},
	searchBox: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderColor: 'grey',
		borderWidth: 1,
		borderRadius: 8,
		width: '90%',
		position: 'absolute',
		top: 20,
		backgroundColor: 'white',
	},
	shadow: {
        shadowColor: 'black',
        shadowOffset: {width: -1, height:4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    }
});