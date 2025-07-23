import { Tabs, Stack } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function RootLayout() {
  
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
            backgroundColor: "#77d9bb",
          },
      }}>
      <Tabs.Screen name='index' 
        options={{
          title: 'Pokédex',
          tabBarLabel: 'Pokédex',
          tabBarIcon: ({color, focused}) => <Ionicons name={focused ? 'book' : 'book-outline'} color={color} size={24}/>,

      }}
      />
      <Tabs.Screen name='favourites' 
        options={{
          title: 'Favourites',
          tabBarLabel: 'Favourites',
          tabBarIcon: ({color, focused }) => <Ionicons name={focused ? 'star' : 'star-outline'} color={color} size={24}/>,
        }}
      />
    </Tabs>
  );
}
