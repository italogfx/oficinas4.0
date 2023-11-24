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
  
  const [latestMessage, setLatestMessage] = useState('');

  useEffect(() => {
    // WebSocket connection to the server
    const ws = new WebSocket('ws://localhost:3000');

    // Event handler for receiving messages from the server
    ws.onmessage = (event) => {
      const data = event.data;
      console.log('Received message from server:', data);
      setLatestMessage(data);
    };

    // Event handler for connection open
    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    // Event handler for connection close
    ws.onclose = (event) => {
      console.log('WebSocket connection closed:', event.reason);
    };

    // Clean up the WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount



  return (
    <PaperProvider >
      <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Monitora" subtitle="Subtítulo" />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 16 ,borderBottomWidth: 1, }} onPress={() => navigation.navigate('Principal')} >Meus pacientes</Text>
          <Text style={{ marginRight: 16,borderBottomWidth: 1,}} onPress={() => navigation.navigate('CadastroPaciente')}>Cadastrar Pacientes</Text>
        </View>
      </Appbar.Header>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>

        <Text>Latest Message: {latestMessage}</Text>
      <Button title="Fetch Data" onPress={() => console.log('Fetch data button pressed')} />
          </View>
        <ScrollView contentContainerStyle={styles.bomdia}>
        {databaseData.map((data) => (
          <Card key={data.id} style={styles.card}>
            <Card.Content>
              <Title>{data.title}</Title>
              <Paragraph>{data.description}</Paragraph>
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
