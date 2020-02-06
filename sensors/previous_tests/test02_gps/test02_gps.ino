#include <SoftwareSerial.h>
#include <TinyGPS.h>

long lat, lon;

SoftwareSerial gpsSerial(2,3); //create gps sensor connection
TinyGPS gps; //create gps object 

void setup(){
  Serial.begin(9600);
  gpsSerial.begin(4800);
}

void loop(){
  while(gpsSerial.available()){
    Serial.print("Agetha");
    if(gps.encode(gpsSerial.read())){
      gps.get_position(&lat,&lon);
      Serial.print("Position: ");
      Serial.print("lat: ");Serial.print(lat);Serial.print("");
      Serial.print("lon: ");Serial.println(lon);
    }
  }
}
