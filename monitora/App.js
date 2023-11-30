import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Principal from './src/page/Home';
import Inicio from './src/page';
import Cadastro from './src/page/cadastrar';
import CadastroPaciente from './src/page/cadastrarPaciente';
import Notifi from './src/page/Noti';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Cadastrar" component={Cadastro} />
        <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} />
        <Stack.Screen name="Notificacao" component={Notifi} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
