#include <Adafruit_AM2320.h>

#include <Wire.h>
#include <AM2320.h>

AM2320 sensor;

float SensorTemp;
float SensorHum;

void setup() {
  Serial.begin(9600);
  Wire.begin(14, 12);
  delay(5000);
}

void getTempHum(){
  
  SensorTemp = sensor.getTemperature();
  Serial.print("tempature");
  Serial.println(SensorTemp);

  SensorHum = sensor.getHumidity();
  Serial.print("humidity");
  Serial.println(SensorHum);

  if (sensor.measure()){
    
  }
  else {
    int errorCode = sensor.getErrorCode();
    switch (errorCode){
      case 1: Serial.print("bruh 1");  break;
      case 2: Serial.print("bruh 2");  break;
    }
    
  }
  
  
}

  

void loop() {
  getTempHum();
  delay(500);

}
