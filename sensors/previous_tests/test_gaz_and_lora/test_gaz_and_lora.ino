#include <LowPower.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <SPI.h>
#include "SX1272.h"
#include "MutichannelGasSensor.h"

/*
VCC : 3.3V
GND : GND
SDA : A4
SCL : A5
*/

#define ETSI_EUROPE_REGULATION
#define PABOOST
#define BAND868

#ifdef ETSI_EUROPE_REGULATION
#define MAX_DBM 14
#elif defined SENEGAL_REGULATION
#define MAX_DBM 10
#elif defined FCC_US_REGULATION
#define MAX_DBM 14
#endif

#ifdef BAND868
#ifdef SENEGAL_REGULATION
const uint32_t DEFAULT_CHANNEL=CH_04_868;
#else
const uint32_t DEFAULT_CHANNEL=CH_10_868;
#endif
#elif defined BAND900
const uint32_t DEFAULT_CHANNEL=CH_05_900;
#elif defined BAND433
const uint32_t DEFAULT_CHANNEL=CH_00_433;
#endif

#define LORAMODE  1
#define node_addr 8

#if defined __SAMD21G18A__ && not defined ARDUINO_SAMD_FEATHER_M0
#define PRINTLN                   SerialUSB.println("")              
#define PRINT_CSTSTR(fmt,param)   SerialUSB.print(F(param))
#define PRINT_STR(fmt,param)      SerialUSB.print(param)
#define PRINT_VALUE(fmt,param)    SerialUSB.print(param)
#define FLUSHOUTPUT               SerialUSB.flush();
#else
#define PRINTLN                   Serial.println("")
#define PRINT_CSTSTR(fmt,param)   Serial.print(F(param))
#define PRINT_STR(fmt,param)      Serial.print(param)
#define PRINT_VALUE(fmt,param)    Serial.print(param)
#define FLUSHOUTPUT               Serial.flush();
#endif

#define DEFAULT_DEST_ADDR 1


unsigned long nextTransmissionTime=0L;
uint8_t message[200];
int loraMode  = LORAMODE;
int sensorPin = A0;//13;



/*************************/
/**        SETUP        **/
/*************************/

void setup()
{
  delay(3000);
  
  Serial.begin(115200);

  int e;
  
  // Open serial communications and wait for port to open:
#if defined __SAMD21G18A__ && not defined ARDUINO_SAMD_FEATHER_M0 
  SerialUSB.begin(115200);
#else
  //Serial.begin(9600);  
#endif 

  // Print a start message
  PRINT_CSTSTR("%s","Simple LoRa ping-pong with the gateway\n");  

#ifdef ARDUINO_AVR_PRO
  PRINT_CSTSTR("%s","Arduino Pro Mini detected\n");  
#endif
#ifdef ARDUINO_AVR_NANO
  PRINT_CSTSTR("%s","Arduino Nano detected\n");   
#endif
#ifdef ARDUINO_AVR_MINI
  PRINT_CSTSTR("%s","Arduino MINI/Nexus detected\n");  
#endif
#ifdef ARDUINO_AVR_MEGA2560
  PRINT_CSTSTR("%s","Arduino Mega2560 detected\n");  
#endif
#ifdef ARDUINO_SAM_DUE
  PRINT_CSTSTR("%s","Arduino Due detected\n");  
#endif
#ifdef __MK66FX1M0__
  PRINT_CSTSTR("%s","Teensy36 MK66FX1M0 detected\n");
#endif
#ifdef __MK64FX512__
  PRINT_CSTSTR("%s","Teensy35 MK64FX512 detected\n");
#endif
#ifdef __MK20DX256__
  PRINT_CSTSTR("%s","Teensy31/32 MK20DX256 detected\n");
#endif
#ifdef __MKL26Z64__
  PRINT_CSTSTR("%s","TeensyLC MKL26Z64 detected\n");
#endif
#if defined ARDUINO_SAMD_ZERO && not defined ARDUINO_SAMD_FEATHER_M0
  PRINT_CSTSTR("%s","Arduino M0/Zero detected\n");
#endif
#ifdef ARDUINO_AVR_FEATHER32U4 
  PRINT_CSTSTR("%s","Adafruit Feather32U4 detected\n"); 
#endif
#ifdef  ARDUINO_SAMD_FEATHER_M0
  PRINT_CSTSTR("%s","Adafruit FeatherM0 detected\n");
#endif

// See http://www.nongnu.org/avr-libc/user-manual/using_tools.html
// for the list of define from the AVR compiler

#ifdef __AVR_ATmega328P__
  PRINT_CSTSTR("%s","ATmega328P detected\n");
#endif 
#ifdef __AVR_ATmega32U4__
  PRINT_CSTSTR("%s","ATmega32U4 detected\n");
#endif 
#ifdef __AVR_ATmega2560__
  PRINT_CSTSTR("%s","ATmega2560 detected\n");
#endif 
#ifdef __SAMD21G18A__ 
  PRINT_CSTSTR("%s","SAMD21G18A ARM Cortex-M0+ detected\n");
#endif
#ifdef __SAM3X8E__ 
  PRINT_CSTSTR("%s","SAM3X8E ARM Cortex-M3 detected\n");
#endif

  // Power ON the module
  PRINT_CSTSTR("%s"," tryin to put sx1272 ON\n");  
  sx1272.ON();
  PRINT_CSTSTR("%s","sx1272 is ON\n");  
  
  // Set transmission mode and print the result
  e = sx1272.setMode(loraMode);
  PRINT_CSTSTR("%s","Setting Mode: state ");
  PRINT_VALUE("%d", e);
  PRINTLN;

  // enable carrier sense
  sx1272._enableCarrierSense=true;
    
  // Select frequency channel
  e = sx1272.setChannel(DEFAULT_CHANNEL);
  PRINT_CSTSTR("%s","Setting Channel: state ");
  PRINT_VALUE("%d", e);
  PRINTLN;
  
  // Select amplifier line; PABOOST or RFO
#ifdef PABOOST
  sx1272._needPABOOST=true;
  // previous way for setting output power
  // powerLevel='x';
#else
  // previous way for setting output power
  // powerLevel='M';  
#endif

  // previous way for setting output power
  // e = sx1272.setPower(powerLevel); 

  e = sx1272.setPowerDBM((uint8_t)MAX_DBM); 
  PRINT_CSTSTR("%s","Setting Power: state ");
  PRINT_VALUE("%d", e);
  PRINTLN;
  
  // Set the node address and print the result
  e = sx1272.setNodeAddress(node_addr);
  PRINT_CSTSTR("%s","Setting node addr: state ");
  PRINT_VALUE("%d", e);
  PRINTLN;
  
  // Print a success message
  PRINT_CSTSTR("%s","SX1272 successfully configured\n");

  delay(500);
  
  // Microphone pin
  //pinMode(sensorPin, INPUT);

  //Grove
  gas.begin(0x04);//the default I2C address of the slave is 0x04
  gas.powerOn();
  
}

void loop()
{
  
  if (millis() > nextTransmissionTime) {
    
  long startSend;
  long endSend;
  
  //Serial.println("JE SUIS UN PRINT");
  boolean bogrove = true;
  boolean bogps = true; 
  boolean bomicrophone = true;
  char strpacket[201] = "";
  char resgrove[50] = "";
  char resgps[100] = "";
  char resmicro[50] = "";
  char tempstr[50] = "";
  char teststrlat[25] = "";
  char teststrlon[25] = "";
  char teststrdate[50] = "";
  float tempfloat = 0.0;
  int tempint = 0;

  uint8_t r_size;
  int e;
  sx1272.CarrierSense();
  sx1272.setPacketType(PKT_TYPE_DATA);
  
  //Variables grove
  float c = 0;
  //Variables microphone
  float ref_volt = float(readVcc())/1000.0;
  float dbValue;


  //Grove
  if(bogrove == true)
  {   
    c = gas.measure_CO();
    Serial.print("The concentration of CO is ");
    if(c>=0) {
      Serial.print(c);
      Serial.println(" ppm");
      
      tempfloat = c*1000;
      tempint = (int)tempfloat;
      sprintf(resgrove, "CO/%d/", tempint);
    }
    else Serial.print("invalid");
    
    c = gas.measure_NO2();
    Serial.print("The concentration of NO2 is ");
    if(c>=0)
    {
      Serial.print(c);
      Serial.println(" ppm");
      
      tempfloat = c*1000;
      tempint = (int)tempfloat;
      sprintf(tempstr, "NO2/%d/", tempint);
      strcat(resgrove, tempstr);
    }
    else Serial.print("invalid");
  }
  
  //Microphone
  /*int minimum = 1024;
  int maximum = 0; 
  int current_min = 0;
  int current_max = 0;
  int current_value = 0;
  if(bomicrophone == true){
    for(int indice = 0; indice < 50; indice ++)
    {
      current_value = analogRead(sensorPin);
      current_min = min(minimum, current_value);
      current_max = max(maximum, current_value);
    }
    dbValue = map(maximum-minimum, 0, 1023, 0, 200);//20*log10(analogRead(sensorPin));//*(5/2023));//(analogRead(sensorPin)/1024.0)*ref_volt*50.0; 
    Serial.print("Bruit : ");   
    Serial.print(dbValue);
    Serial.println(" db");
    
    tempfloat = dbValue*100;
    tempint = (int)tempfloat;
    sprintf(resmicro, "Son/%d", tempint);
  }*/

  sprintf(strpacket, "\\!");
  strcat(strpacket, resgrove);
  //strcat(strpacket, resmicro);
  strcat(strpacket, "\0");

  Serial.print("Packet final :");
  Serial.println(strpacket);

  r_size=sprintf((char*)message, strpacket);
  PRINT_CSTSTR("%s","Sending Bang Bang");  
  PRINTLN;
            

  startSend=millis();
  
  // this is the no-ack version
  e = sx1272.sendPacketTimeout(DEFAULT_DEST_ADDR, message, r_size);
  
  endSend=millis();
      
  Serial.print(F("LoRa pkt seq "));
  Serial.println(sx1272.packet_sent.packnum);
  Serial.print(F("LoRa Sent in "));
  Serial.println(endSend-startSend);
  Serial.print(F("LoRa Sent w/CAD in "));
  Serial.println(endSend-sx1272._startDoCad);
  Serial.print(F("Packet sent, state "));
  Serial.println(e);
            
  PRINT_CSTSTR("%s","Packet sent, state ");
  PRINT_VALUE("%d", e);
  PRINTLN;
  
  /*Delay*/
  //smartdelay(20000);
  //(20000);
  
  // 1 minutes    
  nextTransmissionTime=millis()+60000;
  }
}



//Microphone
// read voltage to ensure ADC converts properly
long readVcc() {
  // Read 1.1V reference against AVcc
  // set the reference to Vcc and the measurement to the internal 1.1V reference
  #if defined(__AVR_ATmega32U4__) || defined(__AVR_ATmega1280__) || defined(__AVR_ATmega2560__)
    ADMUX = _BV(REFS0) | _BV(MUX4) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  #elif defined (__AVR_ATtiny24__) || defined(__AVR_ATtiny44__) || defined(__AVR_ATtiny84__)
    ADMUX = _BV(MUX5) | _BV(MUX0);
  #elif defined (__AVR_ATtiny25__) || defined(__AVR_ATtiny45__) || defined(__AVR_ATtiny85__)
    ADMUX = _BV(MUX3) | _BV(MUX2);
  #else
    ADMUX = _BV(REFS0) | _BV(MUX3) | _BV(MUX2) | _BV(MUX1);
  #endif  

  delay(2); // Wait for Vref to settle
  ADCSRA |= _BV(ADSC); // Start conversion
  while (bit_is_set(ADCSRA,ADSC)); // measuring

  uint8_t low  = ADCL; // must read ADCL first - it then locks ADCH  
  uint8_t high = ADCH; // unlocks both

  long result = (high<<8) | low;

  result = 1125300L / result; // Calculate Vcc (in mV); 1125300 = 1.1*1023*1000
  return result; // Vcc in millivolts
  
}
