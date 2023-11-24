const express = require('express');
const http = require('http');
const mqtt = require('mqtt');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const brokerUrl = 'mqtt://34.151.224.105';
const topico = 'IFG/heart';

const client = mqtt.connect(brokerUrl);

let latestMessage = ''; // Variable to store the latest message

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
  latestMessage = message.toString();
  broadcastUpdate(latestMessage); // Send the latest message to connected clients
});

client.on('error', (error) => {
  console.error('Erro:', error);
});

// WebSocket connection
wss.on('connection', (ws) => {
  // Send the latest message when a WebSocket client connects
  ws.send(latestMessage);

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });
});

app.get('/', (req, res) => {
  res.send(`Latest Message: ${latestMessage}`);
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

function broadcastUpdate(data) {
  // Broadcast the data to all connected WebSocket clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}
