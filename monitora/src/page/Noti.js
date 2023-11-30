import React, { useState } from 'react';
import { SMS } from 'expo-sms'; // Import the SMS module
import { View, TextInput, Button, Alert } from 'react-native';
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const Notifi = () => {
  const numero = 0

  const handleCallNotifications = async() => {
    const {status} = await Notifications.getPermissionsAsync();

    if(status !== 'granted'){
      Alert.alert("Deu ruim")
      return
    }

    if(numero <= 20 ){
      console.log('menor que 20')
      await Notifications.scheduleNotificationAsync(
        {
          content:{
            title: "BPM em alerta",
            body:"Abaixo da média informada"
          },
          trigger:{
            seconds:1,
          }
        }
      )
    }else if(numero >= 150){
      await Notifications.scheduleNotificationAsync(
        {
          content:{
            title: "BPM em alerta",
            body:"Acima da média informada"
          },
          trigger:{
            seconds:1,
          }
        }
      )
    }

    console.log("bom dia")
  }
  return(
    <View>
      <Button title='enviar' onPress={handleCallNotifications} />
    </View>
  )
}
export default Notifi;
