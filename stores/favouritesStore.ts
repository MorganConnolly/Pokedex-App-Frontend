// import { PokemonProps } from '@/components/PokemonDetails';
// import Color, { ColorInstance } from 'color';
// import { create } from 'zustand';

// type StoreProps = {
//     favouritePokemon: {
//         id: number,
//         name: string,
//         colour: ColorInstance,
//         data: PokemonProps,
//     }[]

//     updateFavourites: (id: number, name: string, colour: ColorInstance, data: PokemonProps) => void;
//     isFavourite: (identifier: string | number) => boolean;
//     getOverlayColour: (identifier: string | number) => ColorInstance;
// }

// const useStore = create<StoreProps>()(
//     (set, get) => ({
//         favouritePokemon: [],
//         updateFavourites: (id, name, colour, data) => {
//             set((state) => {
//                 if (state.favouritePokemon.some(fav => fav.id === id)) {
//                     return {favouritePokemon: state.favouritePokemon.filter((fav) => fav.id !== id)};
//                 }
//                 return { favouritePokemon: [...state.favouritePokemon, {id, name, colour, data}] };
//             })
//         },
//         isFavourite: (identifier) => get().favouritePokemon.some(fav => fav.name === name),
//         getOverlayColour: (identifier) => {
//             const favourite:any = get().favouritePokemon.find((fav) => fav.name === name)

//             if (favourite) {
//                 const colour = Color.rgb(favourite.colour.color)

//                 if (colour.luminosity() < 0.5) {
//                     return Color('white');
//                 }
//             }
//             return Color('black');
//         },
//     })
// );

// export default useStore;