import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { useState } from 'react';
import { Link, useNavigation } from '@react-navigation/native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default function Login() {

    const [text, setText] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const navigation = useNavigation();
  return (
    <PaperProvider>
      <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={require('../../../assets/logo.png')} style={{ width: 700, height: 200 }}/>
      <StatusBar style="auto" />
      <TextInput style={styles.caixaDeTexto}
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
    />
      <TextInput style={styles.caixaDeTexto}
      label="Senha"
      value={senha}
      onChangeText={text => setText(text)}
    />
        <Button mode="contained" onPress={() => navigation.navigate('Principal')} 
        style={{ backgroundColor: '#1F76E2', marginTop: 20}} >
          Entrar
        </Button>
        <TouchableOpacity style={{ borderBottomWidth: 1, marginTop: 20}} onPress={() => navigation.navigate('Cadastrar')}>
        <Text style={{color: 'blue'}}>Cadastrar</Text>
      </TouchableOpacity>
      </View>
    </View>
    </PaperProvider>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C7D4E4',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  caixaDeTexto: {
    height: 60,
    width:400,
    marginTop: 10,
    borderRadius: 10,
    
  },
  botao:{
    borderRadius:20,
    backgroundColor: 'red',
  
  },
  texto:{
    fontSize:20,
    fontWeight: 'bold',
    color: 'grey',
    marginLeft: 5,
  }
});
