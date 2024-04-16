import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {Button, Text, Card} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-web';


export default function listClinics({ data, deleteItem, editItem }) {
    return (

        <View>
            <Card mode='contained' style={{padding: '1%', margin: '2%'}}>
                <Card.Content>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>Endereço:</Text> {data.address}</Text>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>CEP:</Text> {data.zipcode}</Text>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>Gerente:</Text> {data.manager}</Text>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>Cidade:</Text> {data.city}</Text>
                </Card.Content>
                <Card.Actions>
                <Button onPress={() => deleteItem(data.key)}>Excluir</Button>
                <Button onPress={() => editItem(data)}>Editar</Button>
                </Card.Actions>
            </Card>
        </View>

    )

}