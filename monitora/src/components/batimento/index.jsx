import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image ,TextInput, } from 'react-native';
import { useState } from 'react';
import { Button, Provider, Drawer , PaperProvider } from 'react-native-paper';
import * as React from 'react';

export default function Home() {

    const mensage = '80 BPM'

  const [active, setActive] = React.useState('');



  return (
     <PaperProvider>
      <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
     <View style={styles.container}>
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Image source={require('../../../assets/logo.png')} style={{ width: 200, height: 200 }}/>
      <StatusBar style="auto" />
      <TextInput
        style={styles.caixaDeTexto}
        multiline
        value={mensage}
      />
       <Button mode="contained"  style={{ backgroundColor: '#1F76E2' }} >
         Atualizar
       </Button>
     </View>
   </View>
   </PaperProvider>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize: 60,
    fontWeight: 'bold',
    color:'red'
  },
  caixaDeTexto: {
    height: 120,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 100, // Metade da largura ou altura para criar uma borda circular
    paddingHorizontal: 8,
    paddingTop: 8,
    marginBottom: 20,
  },
});
