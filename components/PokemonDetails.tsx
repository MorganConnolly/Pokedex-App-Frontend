import { Pressable, Platform, FlatList, ActivityIndicator, StyleSheet, Text, View, ImageSourcePropType } from 'react-native'
import axios from 'axios';
import { Image } from 'expo-image';

import DetailBackground from '@/components/LinearGradient';
import TypesContainer from '@/components/TypesContainer';
import StatBox from '@/components/StatBox';
import { useQuery } from '@tanstack/react-query';
import Ionicons from '@expo/vector-icons/Ionicons';
import useStore from '@/stores/store';
import { useRoute } from '@react-navigation/native';
import PokemonName from '@/components/PokemonName';
import FavouritesButton from './FavouritesButton';

export type PokemonProps = {
  name?: string;
  abilities?: ability[]; 
  type?: type[];
  stats?: stat[];
  sprite?: ImageSourcePropType;
};

type ability = {
  ability: APIResource;
  description?: string;
}

export type type = {
  type: APIResource;
}

type stat = {
  base_stat: number;
  stat: APIResource;
}

export type APIResource = {
  name: string;
  url: string;
}

type ComponentProps = {
  pokemonName: string,
  pokemonID: number,
}

export default function PokemonDetails({pokemonName, pokemonID}: ComponentProps) {
  const isLoggedIn = useStore((state) => state.isLoggedIn);
  const route = useRoute();
  const viewingFavPage = route.name === "favourites";
  const colourViewed = useStore((state) => state.colourBeingViewed)

  const { isLoading, error, data, isFetching } = useQuery<PokemonProps>({
    queryKey: ['pokemonDetails', pokemonName],
    queryFn: async () => {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
      const json = {...response.data};

      for (let i = 0; i < json.abilities.length; i++) {
        const response = await axios.get(json.abilities[i].ability.url);
        
        for (let j = 0; j < response.data.effect_entries.length; j++) {
          if (response.data.effect_entries[j].language.name === 'en') {
            json.abilities[i].description = response.data.effect_entries[j].short_effect;
            break;
          }
        }
      }

      return ({
        name: json.name,
        abilities: json.abilities,
        type: json.types,
        stats: json.stats,
        sprite: json.sprites.front_default
      });
    }
  })

  if (error) console.error(error)

  function extractStats(stats: stat[]) {
    return stats.map((stat) => ({
      name: stat.stat.name,
      value: stat.base_stat.toString(),
    }));
  }

  const extractedStats = extractStats(data?.stats || []);

  return (
    isLoading ? (
      <View style={styles.loadingContainer}>

        <ActivityIndicator />
        <Text style={styles.loadingText}>Loading details...</Text>
      </View>
    ) : (
      <View style={styles.container}>
        <DetailBackground pokemonName={pokemonName} />
        {viewingFavPage ? (
            <View style={{
                position: 'absolute',
                top: '3%',
                left: '8%',
            }}>
                <PokemonName pokemonName={pokemonName} pokemonID={pokemonID}/>
            </View>
        ) : (
          // Only display favourites (star) icon if users are logged in.
          isLoggedIn ? (
            <View style={[styles.favouritesIcon, styles.shadow]}>
              <FavouritesButton name={pokemonName} colour={colourViewed.toString()} data={data}/>
            </View>
          ) : (
            null
          )
        )}
        <TypesContainer PokemonTypes={data?.type || []} />
        <View style={{position: 'absolute', flex: 1, alignItems: 'center', height: '100%', width: '100%'}}>
          <Image style={styles.sprite} source={data?.sprite} />
        </View>
        <View style={[styles.break, {top: '37%'}]} />
        <View style={[styles.statBoxes, {top: '41%'}]}>
          <StatBox name={extractedStats[0]?.name || ''} value={extractedStats[0]?.value || ''} />
          <StatBox name={extractedStats[1]?.name || ''} value={extractedStats[1]?.value || ''} />
        </View>
        <View style={[styles.statBoxes, {top: '53%'}]}>
          <StatBox name={extractedStats[2]?.name || ''} value={extractedStats[2]?.value || ''} />
          <StatBox name={extractedStats[5]?.name || ''} value={extractedStats[5]?.value || ''} />
        </View>
        <View style={[styles.break, {top: '64%'}]} />
        <View style={styles.abilitiesContainer}>
          <View style={styles.abilitiesHeader}>
            <Text
            style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
              Abilities 
            </Text>
          </View>
          <FlatList
            contentContainerStyle={{paddingLeft:20}}
            showsVerticalScrollIndicator={Platform.OS === "web"}
            data={data?.abilities || []}
            key={(item: ability) => item.ability.name}
            renderItem={({item, index}) =>
              <>
                <Text style={{fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize'}}>
                {item.ability.name}
                </Text>
                <Text style={{fontSize: 16, color: 'grey', marginBottom: 10, marginRight: 10,}}>
                  {item.description || 'No description available.'}
                </Text>
              </>
            }
          />
        </View>
      </View>
    )
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  shadow: {
      shadowColor: 'black',
      shadowOffset: {width: -1, height:4 },
      shadowOpacity: 0.2,
      shadowRadius: 50,
      elevation: 5,
  },
  sprite: {
    width: 250,
    height: 250,
    marginTop: '10%',
  },
  statBoxes: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    height: '30%',
  },
  break : {
    position: 'absolute',
    width: '90%',
    height: '0.4%',
    backgroundColor: '#d3d3d3',
    margin: 10,
    borderRadius: 5,
  },
  abilitiesContainer: {
    position: 'absolute',
    flex: 1,
    top: '68%',
    width: '90%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 20,
  },
  abilitiesHeader: {
    marginBottom: 10,
    backgroundColor: 'red',
    width: '100%',
    height: '20%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  favouritesIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
        flex: 1,
		fontSize: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	loadingText: {
		paddingLeft: 10,
		fontSize: 20,
		color: "grey",
	}
})