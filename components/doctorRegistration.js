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
import ListDoctors from "./listDoctors";
 
const Separator = () => {
  return <View style={styles.separator} />;
};
 
export default function Doctors() {
  /* const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [key, setKey] = useState(""); */

  const [key, setKey] = useState("");
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [cfm, setCfm] = useState("");
  const [medicalArea, setMedicalArea] = useState("");
  const [deletingKey, setDeletingKey] = useState("");

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formError, setFormError] = useState(false);
  

  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);

  const showDialog = (key) => {
      setDeletingKey(key);
      setVisible(true);
    }

  const hideDialog = () => setVisible(false);
  
  function validForm(){
    if((name === "") ||
      (cpf === "") ||
      (cfm === "") ||
      (medicalArea === "")
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
 
    await firebase.database().ref('doctors').on('value', (snapshot) => {
      setDoctors([]);
      snapshot.forEach((chilItem) => {
 
        let data = {
          //de acordo com a chave de cada item busca os valores
          //cadastrados na relação e atribui nos dados
          key: chilItem.key,
          name: chilItem.val().name,
          cpf: chilItem.val().cpf,
          cfm: chilItem.val().cfm,
          medicalArea: chilItem.val().medicalArea,
          
 
        };
 
        setDoctors(oldArray => [...oldArray, data].reverse());
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
      (name !== "") &
      (cpf !== "") &
      (cfm !== "") &
      (medicalArea !== "") &
      (key !== "") &
      (validForm())
    ) {
      firebase.database().ref("doctors").child(key).update({
        name: name,
        cpf: cpf,
        cfm: cfm,
        medicalArea: medicalArea,
        
      });
 
      //para o teclado do celular fixo abaixo do formulário (não flutuante)
 
      Keyboard.dismiss();
      setSnackbarMessage('Registro de Médico Alterado!');
      onToggleSnackBar();
      setFormError(false);
      clearData();
      setKey("");
      return;
    }
 
    //cadastrar dados - insert
    if(validForm()){

    let prod = await firebase.database().ref("doctors"); //usar o await quando usar uma async function
    let keyprod = prod.push().key; //cadastar os dados - inserção gerando uma chave
    prod.child(keyprod).set({
        name: name,
        cpf: cpf,
        cfm: cfm,
        medicalArea: medicalArea,
    });
 
    setSnackbarMessage('Registro de Médico Cadastrado!')
    onToggleSnackBar();
    setFormError(false);
    clearData();
    }
  }
 
  function clearData() {
    setName("");
    setCpf("");
    setCfm("");
    setMedicalArea("");
  }

  function handleDelete(key) {
    firebase.database().ref('doctors').child(key).remove()
      .then(() => {
        const findDoctors = doctors.filter(item => item.key !== key);
        setDoctors(findDoctors);
        setDeletingKey(null);
        setSnackbarMessage('Registro de Médico Excluído');
        onToggleSnackBar();
        hideDialog();
      })
  }
 
  //função para editar 
  function handleEdit(data) {
      setKey(data.key),
      setName(data.name),
      setCpf(data.cpf),
      setCfm(data.cfm),
      setMedicalArea(data.medicalArea)
  }

 
  return (
    <View style={styles.container}>
      <PaperText variant="titleLarge" style={{marginTop: '2%'}}>Registro de Médicos Colaboradores</PaperText>
      <View></View>
      <TextInput
        style={{marginTop: '5%'}}
        placeholder="Nome"
        maxLength={80}
        left={<TextInput.Icon icon="pencil" />}
        onChangeText={(texto) => setName(texto)}
        value={name}
        ref={inputRef}
        error={formError}
      />
 
      <Separator />
 
      <TextInput
        placeholder="CPF"
        left={<TextInput.Icon icon="id-card" />}
        onChangeText={(texto) => setCpf(texto)}
        value={cpf}
        ref={inputRef}
        error={formError}
      />
 
      <Separator />
 
      <TextInput
        placeholder="CFM"
        left={<TextInput.Icon icon="stethoscope" />}
        onChangeText={(texto) => setCfm(texto)}
        value={cfm}
        ref={inputRef}
        error={formError}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Área de Atuação"
        style={{marginBottom: '3%'}}
        left={<TextInput.Icon icon="medical-bag" />}
        onChangeText={(texto) => setMedicalArea(texto)}
        value={medicalArea}
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
          <PaperText variant="titleLarge" style={{textAlign: "center", padding: '2%', marginTop: '2%'}} >Lista de Colaboradores</PaperText>
 
      {loading ? (
        <ActivityIndicator color="#121212" style={{marginVertical: '15%'}} size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={doctors}
          renderItem={({ item }) => (
            <ListDoctors
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