import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Principal from './src/page/Home';
import Inicio from './src/page';
import Cadastro from './src/page/cadastrar';
import CadastroPaciente from './src/page/cadastrarPaciente';
import FormPaciente from './src/components/formPaciente';

const Stack = createStackNavigator();

Notifications.setNotificationHandler({
  handleNotification: async ()=>({
    shouldPlaySound: true,
    shouldShowAlert: true,
    shouldSetBadge: true,
  })
})

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Cadastrar" component={Cadastro} />
        <Stack.Screen name="CadastroPaciente" component={CadastroPaciente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
