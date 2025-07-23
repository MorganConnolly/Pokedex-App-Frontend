import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import BugIcon from '@/assets/type-icons/bug.svg';
import DarkIcon from '@/assets/type-icons/dark.svg';
import DragonIcon from '@/assets/type-icons/dragon.svg';
import ElectricIcon from '@/assets/type-icons/electric.svg';
import FairyIcon from '@/assets/type-icons/fairy.svg';
import FightingIcon from '@/assets/type-icons/fighting.svg';
import FireIcon from '@/assets/type-icons/fire.svg';
import FlyingIcon from '@/assets/type-icons/flying.svg';
import GhostIcon from '@/assets/type-icons/ghost.svg';
import GrassIcon from '@/assets/type-icons/grass.svg';
import GroundIcon from '@/assets/type-icons/ground.svg';
import IceIcon from '@/assets/type-icons/ice.svg';
import NormalIcon from '@/assets/type-icons/normal.svg';
import PoisonIcon from '@/assets/type-icons/poison.svg';
import PsychicIcon from '@/assets/type-icons/psychic.svg';
import RockIcon from '@/assets/type-icons/rock.svg';
import SteelIcon from '@/assets/type-icons/steel.svg';
import WaterIcon from '@/assets/type-icons/water.svg';

const iconMap: Record<string, React.ComponentType<{ style?: any }>> = {
    Bug: BugIcon,
    Dark: DarkIcon,
    Dragon: DragonIcon,
    Electric: ElectricIcon,
    Fairy: FairyIcon,
    Fighting: FightingIcon,
    Fire: FireIcon,
    Flying: FlyingIcon,
    Ghost: GhostIcon,
    Grass: GrassIcon,
    Ground: GroundIcon,
    Ice: IceIcon,
    Normal: NormalIcon,
    Poison: PoisonIcon,
    Psychic: PsychicIcon,
    Rock: RockIcon,
    Steel: SteelIcon,
    Water: WaterIcon
};

const colourMap: Record<string, string> = {
    Normal: '#A8A77A',
    Fire: '#EE8130',
    Water: '#6390F0',
    Electric: '#F7D02C',
    Grass: '#7AC74C',
    Ice: '#96D9D6',
    Fighting: '#C22E28',
    Poison: '#A33EA1',
    Ground: '#E2BF65',
    Flying: '#A98FF3',
    Psychic: '#F95587',
    Bug: '#A6B91A',
    Rock: '#B6A136',
    Ghost: '#735797',
    Dragon: '#6F35FC',
    Dark: '#705746',
    Steel: '#B7B7CE',
    Fairy: '#D685AD',
};

function typeColour(typeName: string) : string {
    return colourMap[typeName] || colourMap['Normal']
};

export default function TypeBox({typeName}: {typeName: string}) {

    const Icon = iconMap[typeName] || NormalIcon; // Default to WaterIcon if type not found

    return (
    <View style={[styles.container, styles.shadow, {borderColor: typeColour(typeName)}]}>
        <Icon style={styles.icon} />
        <Text style={[styles.text, {color: typeColour(typeName)}]}>{typeName}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        borderWidth: 4,
        borderRadius: 20,
        padding: 7,
        margin: 2,
        backgroundColor: 'white',
    },
    icon: {
        marginRight: 5,
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    }, 
    shadow: {
        shadowColor: 'black',
        shadowOffset: {width: -1, height:4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    }
})