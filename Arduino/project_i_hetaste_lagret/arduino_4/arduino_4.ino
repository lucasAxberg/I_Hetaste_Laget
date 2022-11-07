#include <Arduino_JSON.h>
#include "FirebaseESP8266.h"
#include <ESP8266WiFi.h>
#include <Adafruit_AM2320.h>
#include <ESP8266HTTPClient.h>

#include "Arduino.h"
#include <time.h>

#include <NTPClient.h>
#include <WiFiUdp.h>

#include <Wire.h>
#include <AM2320.h>
AM2320 sensor;

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP,"pool.ntp.org");

#define FIREBASE_HOST "https://i-hetaste-lagret-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "uEV6xQMSLBZrOEfU8zZS4SGRp035qybRjCdaSBVQ"
#define WIFI_SSID "ABBgym_2.4"
#define WIFI_PASSWORD "mittwifiarsabra"

FirebaseData firebaseData;
FirebaseData firebaseData2;

const int ledPin = 4;
const int swPin = 5;
bool swState = false;
String path = "/nodes";
String nodeID = "Arduino4";
/*Arduino4 = Utomhus*/

float SensorTemp;
float SensorHum;
int monthDay; 
int currentMonth;

String months[12]={"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"};

void setup()
{
    Wire.begin(D5,D6);

    Serial.begin(115200);

    pinMode(ledPin, OUTPUT);
    pinMode(swPin, INPUT);

    Serial.println();
    Serial.println();  

    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("Connecting to Wi-Fi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(300);
    }
    Serial.println();
    Serial.print("Connected with IP: ");
    Serial.println(WiFi.localIP());
    Serial.println();

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    Firebase.reconnectWiFi(true);

    if (!Firebase.beginStream(firebaseData, "/Arduino4"))
    {
        Serial.println("Could not begin stream");
        Serial.println("REASON: " + firebaseData.errorReason());
        Serial.println();
    }
    
    timeClient.begin();
    timeClient.setTimeOffset(3600);
}

float getTemp(){
  if (sensor.measure()){
    SensorTemp = sensor.getTemperature();
}else {
    int errorCode = sensor.getErrorCode();
    switch (errorCode) {
      case 1: Serial.println("ERR: Sensor is offline"); break;
      case 2 : Serial.println("ERR: CRC validation failed."); break;
    }
}
    return SensorTemp;
}


float getHum(){
  if (sensor.measure()){
    SensorHum = sensor.getHumidity();
  }else {
    int errorCode = sensor.getErrorCode();
    switch (errorCode) {
      case 1: Serial.println("ERR: Sensor is offline2"); break;
      case 2 : Serial.println("ERR: CRC validation failed2."); break;
    }
  } 
    return SensorHum;
}


void loop() {
   timeClient.update();
    time_t epochTime = timeClient.getEpochTime();
    struct tm *ptm = gmtime ((time_t *)&epochTime); 

   int monthDay = ptm->tm_mday;
   int currentMonth = ptm->tm_mon+1;
   String currentMonthName = months[currentMonth-1];
  
  Serial.println(timeClient.getFormattedTime());
      if (!Firebase.setFloat(firebaseData,"/Arduino4/saved/" + String(currentMonthName) + "/" + String(monthDay) +"/"+ String(timeClient.getHours()) +"/"+ String(timeClient.getMinutes()) + "/temp", getTemp())){
      Serial.println("REASON: " + firebaseData.errorReason());}
  delay(300);
   if (!Firebase.setFloat(firebaseData,"/Arduino4/saved/" + String(currentMonthName) + "/" + String(monthDay) +"/"+ String(timeClient.getHours()) +"/"+ String(timeClient.getMinutes()) + "/hum", getHum())){
      Serial.println("REASON: " + firebaseData.errorReason());}

  delay(300000);
  if (!Firebase.setFloat(firebaseData,"/Arduino4/current/temp", getTemp())){
      Serial.println("REASON: " + firebaseData.errorReason());}
  delay(300);
   if (!Firebase.setFloat(firebaseData,"/Arduino4/current/hum", getHum())){
      Serial.println("REASON: " + firebaseData.errorReason());}
}
