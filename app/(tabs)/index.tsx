import { StyleSheet, View } from "react-native";

import PokemonList from "@/components/PokemonList";

export default function Index() {
  return (
    <View style={styles.container}>
      <PokemonList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
