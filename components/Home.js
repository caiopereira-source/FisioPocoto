import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('./../assets/logo.png')}
      />
      <Button mode="contained" style={styles.button}>
        Acessar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 98,
  },
  button: {
    padding: 5,
    marginVertical: 40,
    backgroundColor: '#048480',
  }
});
