import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Link, useNavigation } from '@react-navigation/native';
import { Button, Provider as PaperProvider } from 'react-native-paper';
import * as React from 'react';
import { TextInput,} from 'react-native-paper';

export default function Form() {

    const [email, setEmail] = React.useState("");
    const [nome, setNome] = React.useState("");
    const [funcao, setFuncao] = React.useState("");
    const [senha, setSenha] = React.useState("");
    const [selectedValue, setSelectedValue] = useState('option1');
    const navigation = useNavigation();
  return (
    <PaperProvider>
      <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Opção 1" value="option1" />
        <Picker.Item label="Opção 2" value="option2" />
        <Picker.Item label="Opção 3" value="option3" />
      </Picker>
        </View>
      <TextInput style={styles.caixaDeTexto}
      label="Nome"
      value={nome}
      onChangeText={text => setNome(text)}
    />
    <TextInput style={styles.caixaDeTexto}
      label="Função (médico, familia, paciente)"
      value={nome}
      onChangeText={text => setNome(text)}
    />
      <TextInput style={styles.caixaDeTexto}
      label="Email"
      value={email}
      onChangeText={text => setText(text)}
    />
      <TextInput style={styles.caixaDeTexto}
      label="Senha"
      value={senha}
      onChangeText={text => setText(text)}
    />
     <TextInput style={styles.caixaDeTexto}
      label="Confirmar a senha"
      value={senha}
      onChangeText={text => setText(text)}
    />
        <Button mode="contained" onPress={() => navigation.navigate('Inicio')} 
        style={{ backgroundColor: '#1F76E2', marginTop: 20}} >
          Cadastrar
        </Button>
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
