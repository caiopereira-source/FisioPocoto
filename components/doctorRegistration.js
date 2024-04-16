import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
  TextInput,
} from "react-native";
import {Button, Dialog, Portal, Text as PaperText, Snackbar} from 'react-native-paper'
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

  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);

  const showDialog = (key) => {
      setDeletingKey(key);
      setVisible(true);
    }

  const hideDialog = () => setVisible(false);


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
      (key !== "")
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
      clearData();
      setKey("");
      return;
    }
 
    //cadastrar dados - insert
 
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
    clearData();
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
      <TextInput
        placeholder="Nome"
        maxLength={40}
        style={styles.input}
        onChangeText={(texto) => setName(texto)}
        value={name}
        ref={inputRef}
      />
 
      <Separator />
 
      <TextInput
        placeholder="CPF"
        style={styles.input}
        onChangeText={(texto) => setCpf(texto)}
        value={cpf}
        ref={inputRef}
      />
 
      <Separator />
 
      <TextInput
        placeholder="CFM"
        style={styles.input}
        onChangeText={(texto) => setCfm(texto)}
        value={cfm}
        ref={inputRef}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Área de Atuação"
        style={styles.input}
        onChangeText={(texto) => setMedicalArea(texto)}
        value={medicalArea}
        ref={inputRef}
      />
 
      <Separator />
 
      <TouchableOpacity
        onPress={insertUpdate}
        style={styles.button}
        activeOpacity={0.5}
      >
        <Text style={styles.buttonTextStyle}>Salvar</Text>
      </TouchableOpacity>
    
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

 
      <View>
        <Text style={styles.listar}>Listagem de Colaboradores</Text>
      </View>
 
      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
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