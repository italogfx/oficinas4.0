const mqtt = require('mqtt');


// Configurações do broker MQTT
const brokerUrl = 'mqtt://192.168.0.111'; // Substitua pelo URL do seu broker
const topic = 'IFG/heart'; // Substitua pelo tópico que deseja assinar

// Conectando ao broker
const client = mqtt.connect(brokerUrl);

// Quando o cliente se conecta
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe(topic, (err) => {
    if (!err) {
      console.log('Inscrito no tópico:', topic);
    }
  });
});

// Quando uma mensagem é recebida
client.on('message', (receivedTopic, message) => {
  console.log('Mensagem recebida no tópico:', receivedTopic);
  console.log('Conteúdo da mensagem:', message.toString()); // Mensagem recebida
});

// Em caso de erros
client.on('error', (error) => {
  console.error('Erro:', error);
});
