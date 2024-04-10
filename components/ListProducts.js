import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Button} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';


export default function listProducts({ data, deleteItem, editItem }) {
    return (

        <View style={styles.container}>

            <Text style={styles.text}>Produto: {data.name}</Text>
            <Text style={styles.text}>Marca: {data.brand}</Text>
            <Text style={styles.text}>Tipo: {data.type}</Text>
            <Text style={styles.text}>Preço(R$): {data.price}</Text>

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