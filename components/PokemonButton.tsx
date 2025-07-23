import { StyleSheet, View, Pressable, Text, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { usePathname, useRouter } from 'expo-router';

type Props = {
    name: string,
    sprite: ImageSourcePropType,
};

export default function PokemonButton({name, sprite}: Props) {
    const router = useRouter();

    return (
        <Pressable
            onPress={() => router.navigate(`/pokemon_details/${name}`)}
            style={[styles.button, styles.shadow]}>
            <Text style={styles.buttonLabel}>{name}</Text>
            <Image style={styles.buttonIcon} source={sprite} />
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingLeft: 10,
        paddingRight: 5,
        margin: 5,
        borderColor: 'grey',
        borderWidth: 3,
    },
    buttonIcon: {
        height: 50,
        width: 50,
    },
    buttonLabel: {
        fontSize: 20,
        paddingRight: 2,
        textTransform: 'capitalize',
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: {width: -1, height:4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    }
})