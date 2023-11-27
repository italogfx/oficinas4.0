const mqtt = require('mqtt');
const express = require('express');
const app = express();
const port = 3000; // ou a porta que você preferir

const brokerUrl = 'mqtt://34.151.202.171';
const topico = 'IFG/heart';

let lastBPM = null;

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
  const bpm = message.toString();
  lastBPM = bpm;
  console.log('Último BPM:', lastBPM);
});

function obterUltimoBPM(req, res) {
  try {
    if (lastBPM !== null) {
      res.status(200).json({ bpm: lastBPM });
    } else {
      res.status(404).json({ error: 'Nenhum dado de BPM recebido ainda.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Rota para obter o último BPM
app.get('/obterUltimoBPM', obterUltimoBPM);

app.listen(port, () => {
  console.log(`Servidor HTTP está ouvindo na porta ${port}`);
});

module.exports = {
  obterUltimoBPM,
};