import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { character } from '../models'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function characterCard(props: { character: character, navigation: any }) {
    // function showDetails(character: character) {
    //     props.navigation.navigate("Character Details");
    // }
    return (
        <View>
            <Card mode='outlined' style={styles.card}>
                <Card.Content style={styles.contentContainer}>
                    <Card.Cover style={styles.logo} source={{ uri: props.character.image }} />
                    <View>
                        <Card.Title style={{ width: '100%' }}
                            title={(props.character.name.length < 17) ? props.character.name : (props.character.name.substr(0, 15) + '..')}
                            subtitle={props.character.status + ' - ' + props.character.species} />
                        <Card.Actions>
                            <Button mode="outlined" onPress = {() => props.navigation.navigate("Character Details", {character: props.character})}>Details</Button>
                        </Card.Actions>
                    </View>

                </Card.Content>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
        marginBottom: 4,
        marginTop: 4
    },
    text: {
        fontSize: 25,
        marginLeft: '4%',
        marginTop: '1%',
        color: 'grey'
    },
    contentContainer: {
        flexDirection: 'row',
    },
    logo: {
        width: 130,
        height: 130,
        borderRadius: 130/2,
        overflow: "hidden",
        borderWidth: 2,
        borderColor: "grey"
    },
});