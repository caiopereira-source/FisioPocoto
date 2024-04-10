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
import ListProducts from "./ListProducts";
 
const Separator = () => {
  return <View style={styles.separator} />;
};
 
export default function Products() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [key, setKey] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleSnackbar, setVisibleSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const onToggleSnackBar = () => setVisibleSnackbar(!visibleSnackbar);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  useEffect(() => {
  async function search() {
 
    await firebase.database().ref('products').on('value', (snapshot) => {
      setProducts([]);
      snapshot.forEach((chilItem) => {
 
        let data = {
          //de acordo com a chave de cada item busca os valores
          //cadastrados na relação e atribui nos dados
          key: chilItem.key,
          name: chilItem.val().name,
          brand: chilItem.val().brand,
          type: chilItem.val().type,
          price: chilItem.val().price,
          
 
        };
 
        setProducts(oldArray => [...oldArray, data].reverse());
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
      (brand !== "") &
      (type !== "") &
      (price !== "") &
      (key !== "")
    ) {
      firebase.database().ref("products").child(key).update({
        name: name,
        brand: brand,
        type: type,
        price: price,
        
      });
 
      //para o teclado do celular fixo abaixo do formulário (não flutuante)
 
      Keyboard.dismiss();
      setSnackbarMessage('Produto Alterado!');
      onToggleSnackBar();
      clearData();
      setKey("");
      return;
    }
 
    //cadastrar dados - insert
 
    let prod = await firebase.database().ref("products"); //usar o await quando usar uma async function
    let keyprod = prod.push().key; //cadastar os dados - inserção gerando uma chave
    prod.child(keyprod).set({
      name: name,
      brand: brand,
      type: type,
      price: price
    });
 
    setSnackbarMessage('Produto Cadastrado!')
    onToggleSnackBar();
    clearData();
  }
 
  function clearData() {
    setName("");
    setBrand("");
    setType("");
    setPrice("");
  }

  function handleDelete(key) {
    firebase.database().ref('products').child(key).remove()
      .then(() => {
        const findProducts = products.filter(item => item.key !== key);
        setProducts(findProducts);
        setSnackbarMessage('Produto Excluído');
        onToggleSnackBar();
      })
  }
 
  //função para editar 
  function handleEdit(data) {
      setKey(data.key),
      setName(data.name),
      setBrand(data.brand),
      setType(data.type),
      setPrice(data.price)
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
        placeholder="Marca"
        style={styles.input}
        onChangeText={(texto) => setBrand(texto)}
        value={brand}
        ref={inputRef}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Tipo"
        style={styles.input}
        onChangeText={(texto) => setType(texto)}
        value={type}
        ref={inputRef}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Preço"
        style={styles.input}
        onChangeText={(texto) => setPrice(texto)}
        value={price}
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
            <Button onPress={hideDialog}>Sim</Button>
            <Button onPress={hideDialog}>Não</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

 
      <View>
        <Text style={styles.listar}>Listar Produtos</Text>
      </View>
 
      {loading ? (
        <ActivityIndicator color="#121212" size={45} />
      ) : (
        <FlatList
          keyExtractor={(item) => item.key}
          data={products}
          renderItem={({ item }) => (
            <ListProducts
              data={item}
              deleteItem={handleDelete}
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