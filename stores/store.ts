import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color, { ColorJson, ColorInstance } from 'color';

type StoreProps = {
    favourites: {name: string, colour: ColorInstance | ColorJson}[];
    colourBeingViewed: ColorInstance;
    isLoggedIn: boolean,
    updateFavourites: (name: string, colour: ColorInstance) => void;
    isFavourite: (name: string) => boolean;
    updateColourViewed: (colour: ColorInstance) => void;
    loginUser: () => void;
    logoutUser: () => void;
}

const useStore = create<StoreProps>()(
    persist(
        (set, get) => ({
            favourites: [],
            colourBeingViewed: Color('blue'),
            isLoggedIn: false,
            updateFavourites: (name, colour) => {
                set((state) => {
                    if (state.favourites.some(fav => fav.name === name)) {
                        return {favourites: state.favourites.filter((fav) => fav.name !== name)};
                    }
                    return { favourites: [...state.favourites, {name, colour}] };
                })
            },
            isFavourite: (name) => get().favourites.some(fav => fav.name === name),
            updateColourViewed: (colour) =>
                set(() => ({colourBeingViewed: colour})),
            loginUser: () => set(() => ({ isLoggedIn: true } )),
            logoutUser: () => set(() => ({ isLoggedIn: false })),
        }),
        {   
            name: 'favourites-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useStore;