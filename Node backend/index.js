const mqtt = require('mqtt');

const brokerUrl = 'mqtt://34.151.224.105';
const topico = 'IFG/heart';

const client = mqtt.connect(brokerUrl);

client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe(topico, (err) => {
    if (!err) {
      console.log('Inscrito no tópico:', topico);
    }
  });
});

client.on('message', (receivedTopic, message) => {
  console.log('Mensagem recebida no tópico:', receivedTopic);
  console.log('BPM:', message.toString());
});

client.on('error', (error) => {
  console.error('Erro:', error);
});
