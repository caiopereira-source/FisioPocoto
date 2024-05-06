import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {Button, Dialog, Portal, Text as PaperText, Snackbar, TextInput, Card} from 'react-native-paper'
import { ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "../services/connectionFirebase";
import ListClinics from "./listClinics";
 
const Separator = () => {
  return <View style={styles.separator} />;
};
 
export default function  Clinics() {
  /* const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [key, setKey] = useState(""); */

  const [key, setKey] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [manager, setManager] = useState("");
  const [city, setCity] = useState("");
  const [formError, setFormError] = useState(false);

  const [deletingKey, setDeletingKey] = useState("");

  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);

  const showDialog = (key) => {
      setDeletingKey(key);
      setVisible(true);
    }

  const hideDialog = () => setVisible(false);

  function validForm(){
    if((address === "") &
      (zipcode	 === "") &
      (manager === "") &
      (city === "")
      ){
        setSnackbarMessage("Formulário Inválido! Verifique e corrija");
        onToggleSnackBar();
        setFormError(true);
        return false;
    }
    return true;
  }

  useEffect(() => {
  async function search() {
 
    await firebase.database().ref('clinics').on('value', (snapshot) => {
      setClinics([]);
      snapshot.forEach((chilItem) => {
 
        let data = {
          //de acordo com a chave de cada item busca os valores
          //cadastrados na relação e atribui nos dados
          key: chilItem.key,
          address: chilItem.val().address,
          zipcode: chilItem.val().zipcode,
          manager: chilItem.val().manager,
          city: chilItem.val().city,
          
 
        };
 
        setClinics(oldArray => [...oldArray, data].reverse());
      })
      setLoading(false);
    })
  }
  search();
}, []);
 
  //método para inserir ou alterar os dados na coleção bike
 
  async function insertUpdate() {
    //editar dados
 
    if (
      (address !== "") &
      (zipcode !== "") &
      (manager !== "") &
      (city !== "") &
      (key !== "") &
      (validForm())
    ) {
      firebase.database().ref("clinics").child(key).update({
        address: address,
        zipcode: zipcode,
        manager: manager,
        city: city,
        
      });
 
      //para o teclado do celular fixo abaixo do formulário (não flutuante)
 
      Keyboard.dismiss();
      setSnackbarMessage('Informações de Consultório Alterado!');
      onToggleSnackBar();
      clearData();
      setKey("");
      return;
    }
 
    //cadastrar dados - insert
    if(validForm()){
    let prod = await firebase.database().ref("clinics"); //usar o await quando usar uma async function
    let keyprod = prod.push().key; //cadastar os dados - inserção gerando uma chave
    prod.child(keyprod).set({
      address: address,
      zipcode: zipcode,
      manager: manager,
      city: city,
    });
 
    setSnackbarMessage('Informações de Consultório Cadastrados!')
    onToggleSnackBar();
    clearData();
    }
  }
 
  function clearData() {
    setAddress("");
    setZipcode("");
    setManager("");
    setCity("");
  }

  function handleDelete(key) {
    firebase.database().ref('clinics').child(key).remove()
      .then(() => {
        const findClinics = clinics.filter(item => item.key !== key);
        setClinics(findClinics);
        setDeletingKey(null);
        setSnackbarMessage('Registro de Consultório Excluído');
        onToggleSnackBar();
        hideDialog();
      })
  }
 
  //função para editar 
  function handleEdit(data) {
      setKey(data.key),
      setAddress(data.address),
      setZipcode(data.zipcode),
      setManager(data.manager),
      setCity(data.city)
  }

 
  return (
    <View style={styles.container}>
      <PaperText variant="titleLarge" style={{marginTop: '2%'}}>Registro de Consultórios</PaperText>
      <View></View>
      <TextInput
        style={{marginTop: '5%'}}
        placeholder="Endereço"
        maxLength={80}
        left={<TextInput.Icon icon="home" />}
        onChangeText={(texto) => setAddress(texto)}
        value={address}
        ref={inputRef}
        error={formError}
      />
 
      <Separator />
 
      <TextInput
        placeholder="CEP"
        left={<TextInput.Icon icon="email" />}
        onChangeText={(texto) => setZipcode(texto)}
        value={zipcode}
        ref={inputRef}
        error={formError}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Gerente Responsável"
        left={<TextInput.Icon icon="account" />}
        onChangeText={(texto) => setManager(texto)}
        value={manager}
        ref={inputRef}
        error={formError}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Cidade"
        style={{marginBottom: '3%'}}
        left={<TextInput.Icon icon="city-variant" />}
        onChangeText={(texto) => setCity(texto)}
        value={city}
        ref={inputRef}
        error={formError}
      />
 
      <Separator />
 
      <Button onPress={insertUpdate} mode="contained" style={{marginHorizontal: '24%'}}>
        <PaperText variant="bodyLarge" style={{color: '#FFF'}}>Salvar</PaperText>
      </Button>
    
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Excluir?</Dialog.Title>
          <Dialog.Content>
            <PaperText variant="bodyMedium" >Deseja mesmo excluir?</PaperText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => handleDelete(deletingKey)}>Confirmar</Button>
            <Button onPress={hideDialog}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

 
      <ScrollView>
        <Card mode="elevated" style={{ marginTop: '10%', marginHorizontal: '2%', minHeight: '100%'}}>
          <PaperText variant="titleLarge" style={{textAlign: "center", padding: '2%', marginTop: '2%'}} >Lista de Consultórios</PaperText>
 
      {loading ? (
        <ActivityIndicator color="#121212" style={{marginVertical: '15%'}} size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={clinics}
          renderItem={({ item }) => (
            <ListClinics
              data={item}
              deleteItem={showDialog}
              editItem={handleEdit}
            />
          )}
        />
      )}
      </Card>
      </ScrollView>
      <Snackbar
      visible={visibleSnackbar}
      onDismiss={onToggleSnackBar}
      action={{
        label: 'Fechar',
        onPress: () => {
        },
      }}
    >
      {snackbarMessage}
    </Snackbar>
    </View>
  );
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
 
  input: {
    marginBottom: 20,
    marginTop: 20,
    backgroundColor: "#FFF",
    borderRadius: 6,
    height: 45,
    width: 320,
    padding: 10,
    borderWidth: 2,
    borderColor: "#6EC071",
    placeholderTextColor: "#A9A9A9",
    alignItems: "center",
  },
 
  separator: {
    marginVertical: 5,
  },
 
  button: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },
 
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
  },
 
  buttonTextStyle: {
    color: "white",
    fontSize: 18,
    fontFamily: "Quicksand",
  },
 
  buttonIconSeparatorStyle: {
    backgroundColor: "#fff",
    width: 1,
    height: 20,
  },
 
  listar: {
    fontSize: 20,
    textAlign: "center",
  },
});