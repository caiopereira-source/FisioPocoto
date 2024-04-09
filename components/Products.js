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
      alert("Produto Alterado!");
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
 
    alert("Produto Inserido!");
    clearData();
  }
 
  function clearData() {
    setName("");
    setBrand("");
    setType("");
    setPrice("");
  }
 
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nome"
        maxLength={40}
        style={styles.input}
        onChangeText={(texto) => setName(texto)}
        value={name}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Marca"
        style={styles.input}
        onChangeText={(texto) => setBrand(texto)}
        value={brand}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Tipo"
        style={styles.input}
        onChangeText={(texto) => setType(texto)}
        value={type}
      />
 
      <Separator />
 
      <TextInput
        placeholder="Preço"
        style={styles.input}
        onChangeText={(texto) => setCodebar(texto)}
        value={price}
      />
 
      <Separator />
 
      <TouchableOpacity
        onPress={insertUpdate}
        style={styles.button}
        activeOpacity={0.5}
      >
        <Text style={styles.buttonTextStyle}>Salvar</Text>
      </TouchableOpacity>
 
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
              deleteItem={'handleDelete'}
              editItem={'handleEdit'}
            />
          )}
        />
      )}
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