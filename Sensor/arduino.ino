#define USE_ARDUINO_INTERRUPTS true
#include <PulseSensorPlayground.h>

//  Variables
const int PulseWire = A0;      // Usar A0 para o NodeMCU
const int LED = 13;            // Usar D7 (pino 13) para o NodeMCU
int Threshold = 550;

PulseSensorPlayground pulseSensor;

void setup() {
  Serial.begin(9600);     // Inicializar a comunicação serial
  pulseSensor.analogInput(PulseWire);
  pulseSensor.blinkOnPulse(LED);
  pulseSensor.setThreshold(Threshold);

  if (pulseSensor.begin()) {
    Serial.println("Objeto PulseSensor criado!");
  }
}

void loop() {
  if (pulseSensor.sawStartOfBeat()) {
    int myBPM = pulseSensor.getBeatsPerMinute();
    //Serial.print("BPM: ");
    Serial.println(myBPM);
  }

  delay(1000);
}
