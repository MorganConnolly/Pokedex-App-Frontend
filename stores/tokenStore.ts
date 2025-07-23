import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StoreProps = {
    favToken: string,
    setFavToken: (token: string) => void;
}

const useStore = create<StoreProps>()(
    persist(
        (set) => ({
            favToken: '',
            setFavToken: (token) => {
                set(() => {
                    return {favToken: token};
                })
            },
        }),
        {   
            name: 'token-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export default useStore;