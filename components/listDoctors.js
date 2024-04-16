import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';


export default function listDoctors({ data, deleteItem, editItem }) {
    return (

        <View style={styles.container}>

            <Text style={styles.text}>Nome: {data.name}</Text>
            <Text style={styles.text}>CPF: {data.cpf}</Text>
            <Text style={styles.text}>CFM: {data.cfm}</Text>
            <Text style={styles.text}>Área de Atuação(R$): {data.medicalArea}</Text>

            <View style={styles.item}>

                <Button mode='elevated' onPress={() => deleteItem(data.key)}>
                    <Icon name="trash" size={20}>Excluir</Icon>
                </Button>

                <Button mode='contained' onPress={() => editItem(data)}>
                    <Icon name="create" size={20}>Editar</Icon>
                </Button>

            </View>
        </View>

    )

}



const styles = StyleSheet.create({

    container: {

        flex: 1,

        marginTop: 10,

        marginBottom: 5,

        padding: 10,

        backgroundColor: '#FAFAD2',

    },

    text: {

        color: 'black',

        fontSize: 17

    },

    item: {

        flex: 1,

        flexDirection: 'row',

        justifyContent: 'space-around'

    }

}); 