import { useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router'

import PokemonDetails from '@/components/PokemonDetails';

export default function PokemonDetailPage() {
  const { name } = useLocalSearchParams();
  const pokemonName = Array.isArray(name) ? name[0] : name;
  const navigation = useNavigation();
  
  useLayoutEffect(() => {
    if (pokemonName) {
      navigation.setOptions({
        title: String(pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)),
      });
    }
  }, [navigation, pokemonName]);

  return (
    <PokemonDetails pokemonName={pokemonName} />
  )
}