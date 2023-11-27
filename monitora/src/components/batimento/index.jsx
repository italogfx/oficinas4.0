import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, StatusBar, StyleSheet , Text, ScrollView } from 'react-native';
import { Card, Title,Paragraph,Button, Appbar, Provider as PaperProvider } from 'react-native-paper';
import {useNavigation } from '@react-navigation/native';
import { WebSocket } from 'react-native-gifted-chat'; 


export default function Home() {
  const mensage = '80 BPM';
  const navigation = useNavigation();

  const databaseData = [
    { id: 1, title: 'Eva Maria', description: '80 BPM' },
    { id: 2, title: 'Isabel', description: '120 BPM' },
  ];

  const [ultimoBPM, setUltimoBPM] = useState(null);

  const obterUltimoBPM = async () => {
    try {
      const response = await fetch('http://192.168.1.229:3000/obterUltimoBPM');
      const data = await response.json();
      setUltimoBPM(data.bpm);
    } catch (error) {
      console.error('Erro ao obter último BPM:', error);
    }
  };
  useEffect(() => {
    // Chama ao montar o componente
    obterUltimoBPM();

    // Atualiza automaticamente a cada 5 segundos (ajuste conforme necessário)
    const intervalId = setInterval(() => {
      obterUltimoBPM();
    }, 5000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); 


  return (
    <PaperProvider >
      <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Monitora" subtitle="Subtítulo" />
        <View style={{ flexDirection: 'row' }}>
        <Button style={{ marginRight: 16 ,borderBottomWidth: 1, color: 'black' }} onPress={() => navigation.navigate('Principal')} >Meus Pacientes</Button>
        <Button style={{ marginRight: 16 ,borderBottomWidth: 1, color: 'black' }} onPress={() => navigation.navigate('CadastroPaciente')} >Cadastrar Pacientes</Button>
        </View>
      </Appbar.Header>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView contentContainerStyle={styles.bomdia}>
        {databaseData.map((data) => (
          <Card key={data.id} style={styles.card}>
            <Card.Content>
              <Title>{data.title}</Title>
              <Paragraph>Último BPM: {ultimoBPM !== null ? ultimoBPM : 'Nenhum dado recebido ainda.'}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
        </View>
      </View>
    </PaperProvider>
  );
}


const styles = StyleSheet.create({
  bomdia: {
    padding: 36,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 600,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 60,
    fontWeight: 'bold',
    color: 'red',
  },
  caixaDeTexto: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100, 
    paddingHorizontal: 8,
    paddingTop: 8,
    marginBottom: 20,
  },
});

