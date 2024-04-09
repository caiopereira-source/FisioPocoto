import {
    StyleSheet, View, Image, SafeAreaView,
    TouchableOpacity, Text
} from 'react-native';
import React, { useState } from 'react';
import Logo from './../assets/logo.png'
import { Button, TextInput } from 'react-native-paper';
import firebase from '../services/connectionFirebase';

const Separator = () => {
    return <View style={styles.separator} />;
}

export default function Login({changeStatus}) {

    const [type, setType] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleLogin() {
        if (type === 'login') {
          // Aqui fazemos o login
          const user = firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user) => {
              changeStatus(user.user.uid)
            })
            .catch((err) => {
              console.log(err);
              alert('Email ou senha não cadastrados!');
              return;
            })
     
        } else {
          // Aqui cadastramos o usuario 
          const user = firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user) => {
              changeStatus(user.user.uid)
            })
            .catch((err) => {
              console.log(err);
              alert('Erro ao Cadastrar!');
              return;
            })
        }
      }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Image
                    source={Logo} style={styles.image}>
                </Image>
                <Separator />
                <TextInput
                    label="Email"
                    type="flat"
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    mode='outlined'
                    outlineColor='#048480'
                    activeOutlineColor='#048480'
                />
                <TextInput
                    label="Senha"
                    type="flat"
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry
                    mode='outlined'
                    outlineColor='#048480'
                    activeOutlineColor='#048480'
                />

                <Button buttonColor='#048480' mode="contained" onPress={handleLogin} style={{width: '50%'}}>
                    {type === 'login' ? 'Acessar' : 'Cadastrar' }
                </Button>

                <TouchableOpacity onPress={ () => setType(type => type === 'login' ? 'cadastrar' : 'login')} >
                    <Text style={{ textAlign: 'center', marginTop: '20%'}}>
                        {type === 'login' ? 'Criar uma conta?' : 'Já possuo uma conta!' }
                    </Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
        //paddingHorizontal: 10,
    },
    input: {
        width: '75%',
        marginBottom: 20,
        minWidth: '75%'
    },
    image: {
        width: 350,
        height: 98,
        marginBottom: 30,
    },
    handleLogin: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 45,
        marginBottom: 10,
    },
    loginText: {
        color: 'white',
        fontSize: 30,
    },

    Button: {
        backgroundColor: '#048480'
    }
});