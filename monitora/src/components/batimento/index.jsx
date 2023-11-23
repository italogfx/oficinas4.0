import React, { useState } from 'react';
import { View, Image, TextInput, StatusBar, StyleSheet , Text, ScrollView } from 'react-native';
import { Card, Title,Paragraph,Button, Appbar, Provider as PaperProvider } from 'react-native-paper';
import {useNavigation } from '@react-navigation/native';


export default function Home() {
  const mensage = '80 BPM';
  const navigation = useNavigation();

  const databaseData = [
    { id: 1, title: 'Eva Maria', description: '80 BPM' },
    { id: 2, title: 'Isabel', description: '120 BPM' },
  ];


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

        {/* Main Content */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
          {/* <StatusBar style="auto" />
          <TextInput
            style={{ height: 120, borderColor: 'gray', borderWidth: 1, borderRadius: 100, paddingHorizontal: 8, paddingTop: 8, marginBottom: 20 }}
            multiline
            value={mensage}
          />
          <Button mode="contained" style={{ backgroundColor: '#1F76E2' }}>
            Atualizar
          </Button> */}
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
