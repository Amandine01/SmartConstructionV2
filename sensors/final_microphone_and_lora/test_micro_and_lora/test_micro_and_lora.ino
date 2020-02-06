/*
 * Authors: CondugPham,
 *          Student Team: Manar Aggoun, Solène Consten, Amandine Ducruet, Martin le Mintier de la Motte Basse, Aurelio Rognetta, Agetha Sugunaparajan, Marie Yahiaoui
 */



/***************************************
**         USEFULL LIBRARIES          **
***************************************/


#include <LowPower.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <SPI.h>
#include "SX1272.h"



/*****************************************
**         CONFIGURATIONS LORA          **
*****************************************/


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



/******************************
**      INITIALIZATIONS      **
******************************/


// Clock time of next transmission
unsigned long nextTransmissionTime=0L;
// Buffer in which we want to write the message
uint8_t message[200];
// LoRa mode
int loraMode  = LORAMODE;
// Input for getting microphone values
int sensorPin = A0;



/*************************/
/**        SETUP        **/
/*************************/


void setup()
{
  // 30 seconds delay
  delay(3000);
  // Begin serial with 38400
  Serial.begin(38400);
  // Variable which will receive result when trying LoRa operations
  int e;
  
  // Open serial communications and wait for port to open:
#if defined __SAMD21G18A__ && not defined ARDUINO_SAMD_FEATHER_M0 
  SerialUSB.begin(38400);
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

  // Setting output power
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

  // 0.5 seconds delay
  delay(500);
  
  // Microphone pin
  pinMode(sensorPin, INPUT);
}




/*******************************
**         MAIN LOOP          **
*******************************/


void loop()
{
  // Wait until "next transmission time" is reach in order to control the period of sending
  if (millis() > nextTransmissionTime)
  {
    // Initializations 
    long startSend;
    long endSend;
    float dbValue;
    char strpacket[201] = "";
    char resmicro[50] = "";
    char tempstr[50] = "";
    char teststrlat[25] = "";
    char teststrlon[25] = "";
    char teststrdate[50] = "";
    float tempfloat = 0.0;
    int tempint = 0;
    uint8_t r_size;
    int e;

    // LoRa configurations
    sx1272.CarrierSense();
    sx1272.setPacketType(PKT_TYPE_DATA);
    
    // Get value from Microphone
    dbValue = 20*log10(analogRead(sensorPin));// other tries: //map(maximum-minimum, 0, 1023, 0, 200);//*(5/2023));//(analogRead(sensorPin)/1024.0)*ref_volt*50.0; 
    // Print for user
    Serial.print("Bruit : ");   
    Serial.print(dbValue);
    Serial.println(" db");
    // Parse in Integer, keeping the accuracy by multiplying by 100
    tempfloat = dbValue*100;
    tempint = (int)tempfloat;
    
    // Respect the desired format
    sprintf(resmicro, "Son/%d", tempint);
    sprintf(strpacket, "\\!");
    strcat(strpacket, resmicro);
    strcat(strpacket, "\0");

    // Print final packet for user
    Serial.print("Packet final :");
    Serial.println(strpacket);

    // Put packet in the buffer
    r_size=sprintf((char*)message, strpacket);

    // Tell user packet will be send now
    PRINT_CSTSTR("%s","Sending Packet");  
    PRINTLN;
    // Get current clock time
    startSend=millis();
    // Try to send packet (e=0 means OK, else it means an error occured)
    e = sx1272.sendPacketTimeout(DEFAULT_DEST_ADDR, message, r_size);
    // Get current time clock
    endSend=millis();

    // Print information to the user
    Serial.print(F("LoRa pkt seq "));
    Serial.println(sx1272.packet_sent.packnum);
    Serial.print(F("LoRa Sent in "));
    Serial.println(endSend-startSend);
    Serial.print(F("LoRa Sent w/CAD in "));
    Serial.println(endSend-sx1272._startDoCad);
    Serial.print(F("Packet sent, state "));
    Serial.println(e);

    // Next transmission time will be in 20 seconds from now
    nextTransmissionTime=millis()+20000;
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
