import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {Button, Text, Card} from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-web';


export default function listDoctors({ data, deleteItem, editItem }) {
    return (

        <View>
            <Card mode='contained' style={{padding: '1%', margin: '2%'}}>
                <Card.Content>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>Nome:</Text> {data.name}</Text>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>CPF:</Text> {data.cpf}</Text>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>CFM:</Text> {data.cfm}</Text>
                <Text variant="bodyLarge"><Text variant='bodyLarge' style={{fontWeight: '700'}}>Área de Atuação:</Text> {data.medicalArea}</Text>
                </Card.Content>
                <Card.Actions>
                <Button onPress={() => deleteItem(data.key)}>Excluir</Button>
                <Button onPress={() => editItem(data)}>Editar</Button>
                </Card.Actions>
            </Card>
        </View>

    )

}