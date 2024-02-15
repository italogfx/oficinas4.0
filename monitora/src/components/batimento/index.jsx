import React, { useState, useEffect } from 'react';
import { View, Image, TextInput, StatusBar, StyleSheet , Text, ScrollView } from 'react-native';
import { Card, Title,Paragraph,Button, Appbar, Provider as PaperProvider } from 'react-native-paper';
import {useNavigation } from '@react-navigation/native';
import { WebSocket } from 'react-native-gifted-chat'; 
import * as Notifications from 'expo-notifications'
import { Modal, Portal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function Home() {
  const navigation = useNavigation();
  const numero = 180
  const databaseData = [
    { id: 1, title: 'Eva Maria'},
  ];

  const [estadoNotificacao, setEstadoNotificacao] = useState("");

  const [ultimoBPM, setUltimoBPM] = useState(null);
  const abaixo = async() =>{
    await Notifications.scheduleNotificationAsync(
      {
        content:{
          title: "Paciente Eva: BPM em alerta",
          body:"Abaixo da média informada"
        },
        trigger:{
          seconds:1,
        }
      }
    )
  }
  const acima = async() =>{
    await Notifications.scheduleNotificationAsync(
        {
          content:{
            title: "Paciente Eva: BPM em alerta",
            body:"Acima da média informada"
          },
          trigger:{
            seconds:1,
          }

        }
      )
  }

  const obterUltimoBPM = async () => {
    try {
      const response = await fetch('http://172.20.10.2:3000/obterUltimoBPM');
      const data = await response.json();
      setUltimoBPM(data.bpm);
    } catch (error) {
      console.error('Erro ao obter último BPM:', error);
    }

  };

  useEffect(() => {
    obterUltimoBPM();
  

    const intervalId = setInterval(() => {
      obterUltimoBPM();
  
    }, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []); 


  useEffect(() => {
    // Lógica para notificação quando ultimoBPM é atualizado
    const numeroInt = +ultimoBPM;


    if (numeroInt <= 20 && estadoNotificacao !== "-1") {
      console.log('abaixo');
      abaixo();
      setEstadoNotificacao("-1");
      console.log(estadoNotificacao)
    } else if (numeroInt >= 150 && estadoNotificacao !== "1") {
      console.log('acima');
      acima();
      setEstadoNotificacao("1");
      console.log(estadoNotificacao)
    } else if (numeroInt > 20 && numeroInt < 150 && estadoNotificacao !== "0") {
      setEstadoNotificacao("0");
      console.log(estadoNotificacao)
    }
  }, [ultimoBPM, estadoNotificacao]);

  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const numeroTeste = 110;


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
      <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Icon name="close" size={30} onPress={hideModal} />
            <Text style={styles.textBat}> {numeroTeste !== null ? numeroTeste : 'Nenhum dado recebido ainda.'}</Text>
            <Text style={styles.textSub}>BPM</Text>
          </Modal>
        </Portal>
        {databaseData.map((data) => (
          <Card key={data.id} style={styles.card} onPress={showModal}>
            <Card.Content>
              <Title>{data.title}</Title>
              <Paragraph>Último BPM: {numeroTeste !== null ? numeroTeste : 'Nenhum dado recebido ainda.'}</Paragraph>
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
  modalContainer:{
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
    marginLeft: 150,
    borderRadius: 20,
  },
  textBat:{
    padding: 36,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 80
  },
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
  textSub:{
    marginTop: -50,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#676667',
  },
});

