import React, { useRef } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { character } from '../models';
import CharacterCard from './CharacterCard';

export default function CharacterList(props: { characters: character[], scrollRef: any, navigation: any }) {
    
    return (
        <View>
            <ScrollView ref={props.scrollRef}>
                {props.characters.map((character: character) => (
                    <CharacterCard key={character.id} character = {character} navigation = {props.navigation}/>
                ))}
            </ScrollView>
        </View>
    )
}
