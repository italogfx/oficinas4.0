#include <ESP8266WiFi.h>
#include <PubSubClient.h>

//MQTT Subscribe
#define ID_MQTT  "SaaSSD" 
#define TOPIC_PUB "IFG/heart"

//WiFi
const char* SSID = "NumbERS";   
const char* PASSWORD = "Numb3R5_00";
WiFiClient wifiClient;

//MQTT Server
const char* BROKER_MQTT = "192.168.0.150";
int BROKER_PORT = 1883;


PubSubClient MQTT(wifiClient); 

void mantemConexoes();
void conectaWiFi();
void conectaMQTT();
void recebePacote(char* topic, byte* payload, unsigned int length);

void setup() {

  //pinMode(Rele1, OUTPUT);

  Serial.begin(9600);
  conectaWiFi();
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);
}

void loop() {
 
  mantemConexoes();
  lerDados();
  MQTT.loop();  
}

void mantemConexoes() {
  
  if (!MQTT.connected()) {
    conectaMQTT();
  }
    conectaWiFi(); //se não há conexão com o WiFI, a conexão é refeita
}

void conectaWiFi() {
  if (WiFi.status() == WL_CONNECTED) {
    return;
  }

  Serial.print("Conectando-se na rede: ");
  Serial.print(SSID);
  Serial.println("  Aguarde!");

  WiFi.begin(SSID, PASSWORD); // Conecta na rede WI-FI
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Conectado com sucesso, na rede: ");
  Serial.print(SSID);
  Serial.print("  IP obtido: ");
  Serial.println(WiFi.localIP());
}

void conectaMQTT() {
  while (!MQTT.connected()) {
    Serial.print("Conectando ao Broker MQTT: ");
    Serial.println(BROKER_MQTT);
    if (MQTT.connect(ID_MQTT)) {
      Serial.println("Conectado ao Broker com sucesso!");
    }
    else {
      Serial.println("Nao foi possivel se conectar ao broker.");
      Serial.println("Nova tentatica de conexao em 10s");
      delay(10000); 
    }
  }
}

void publicaMensagem(const char* topico, const char* mensagem) {
  if (MQTT.publish(topico, mensagem)) {
    Serial.print("Mensagem publicada no tópico: ");
    Serial.println(topico);
  } else {
    Serial.println("Falha ao publicar a mensagem.");
  }
}

void lerDados(){
  if (Serial.available()) {
    String data = Serial.readStringUntil('\n');
    Serial.println("Dados recebidos do Arduino: " + data);
    const char* bpm = data.c_str();
    publicaMensagem(TOPIC_PUB, bpm);
  }
}
