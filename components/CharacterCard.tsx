import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { character } from '../models'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import { addCharacterId } from '../actions/CharacterId'

const mapStateToProps = (state: any) => {
    return {
        ids: state.idReducer.idList
    }
}

const mapDispatchProps = (dispatch: any) => {
    return {
        add: (id: number) => dispatch(addCharacterId(id))
    }
}

function CharacterCard(props: { character: character, navigation: any, add: any }) {
    function details() {
        props.navigation.navigate("Character Details", { character: props.character });
        props.add(props.character.id);
    }
    return (
        <View>
            <Card mode='outlined' style={styles.card}>
                <Card.Content style={styles.contentContainer}>
                    <Card.Cover style={styles.logo} source={{ uri: props.character.image }} />
                    <View>
                        <Card.Title style={{ width: '100%' }}
                            title={(props.character.name.length < 17) ? props.character.name : (props.character.name.substr(0, 15) + '..')}
                            subtitle={props.character.status + ' - ' + props.character.species} />
                        <Card.Actions style={styles.action}>
                            <Button mode="outlined" onPress={details}>Details</Button>
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
    action: {
        marginLeft: '1%'
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
        borderRadius: 130 / 2,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "grey"
    },
});

export default connect(mapStateToProps, mapDispatchProps)(CharacterCard);