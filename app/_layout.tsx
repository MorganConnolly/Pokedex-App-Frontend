import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from "expo-status-bar";

const queryClient = new QueryClient();

export default function RootLayout() {

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" backgroundColor="black" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false, title: 'Pokédex' }}/>
        <Stack.Screen name="pokemon_details/[name]" />
        <Stack.Screen name="register" options={{headerBackTitle: "Favourites"}}/>
      </Stack>
    </QueryClientProvider>
  );
}