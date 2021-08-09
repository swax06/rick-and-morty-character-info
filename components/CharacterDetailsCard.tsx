import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { character } from '../models'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function CharacterDetailsCard(props: { route: any, navigation: any }) {
    const character: character = props.route.params.character;
    return (
        <View>
            <Card mode='outlined' style={styles.card}>
                <Card.Content style={styles.contentContainer}>
                    <Card.Cover style={styles.logo} source={{ uri: character.image }} />
                    <Card.Title
                        title={(character.name.length < 40) ? character.name : (character.name.substr(0, 42) + '..')}
                        subtitle={character.status + ' - ' + character.species}
                    />
                    <View style={{ width: '100%' }}>
                        <Text style={styles.text}>Gender</Text>
                        <Text style={styles.paragraph}>{character.gender}</Text>
                        <Text style={styles.text}>Last known location:</Text>
                        <Text style={styles.paragraph}>{character.origin.name}</Text>
                        <Text style={styles.text}>First seen in:</Text>
                        <Text style={styles.paragraph}>{character.location.name}</Text>
                    </View>

                </Card.Content>
                <Button style={styles.button} mode='outlined' onPress={() => props.navigation.goBack()}>Back</Button>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: '2%',
        marginTop: '8%',
    },
    text: {
        fontSize: 20,
        marginLeft: '4%',
        marginTop: '2%',
        color: 'grey'
    },
    paragraph: {
        fontSize: 15,
        marginLeft: '4%'
    },
    button: {
        margin: '5%',
    },
    contentContainer: {
        alignItems: 'center'
    },
    logo: {
        width: '90%',
        height: 300,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "grey"
    },
});