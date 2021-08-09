import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';
import { grey600 } from 'react-native-paper/lib/typescript/styles/colors';

export default function Pagination(props: {nextPage: any , prevPage: any, pageNo: number}) {
    return (
        <View style={styles.buttonContainer}>
            <Button style={styles.button} mode="contained" disabled={props.prevPage === null} onPress={props.prevPage}>Previous</Button>
            <Text style={styles.text}>{props.pageNo}</Text>
            <Button style={styles.button} mode="contained" disabled={props.nextPage === null} onPress={props.nextPage}>Next</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        marginLeft: '5%',
        marginTop: '1%',
        color: 'grey',
        borderColor: 'grey'
    },
    button: {
        margin: '1%',
        marginLeft: '5%',
        width: '35%',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: '3%'
    }
  });
