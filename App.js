import { Image, StyleSheet, Text, View } from 'react-native';
import Login from './components/Login';
import MenuTab from './components/menuTab';
import Home from './components/Home';
import {useState} from 'react';

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login changeStatus={(user) => setUser(user)} />
    //return <MenuTab/>
  }

  return <MenuTab/>
}