#include <AltSoftSerial.h>
AltSoftSerial BTserial; 

// Temp Values
int temppin = 4;
float temp;

// Speed values
float value=0;
float rev=0;
int rpm;
int rpmKM;
int oldtime=0;
int time;
int wheelRaduis=40;

// Finale Values
float finaleTemp;
int finaleSpeed;

void isr() //interrupt service routine
{
rev++;
}

void setup() {
  BTserial.begin(9600);
  attachInterrupt(digitalPinToInterrupt(3),isr,RISING);  //attaching the interrupt
}

void loop() {
  Temp();
  TachoMeter();

  delay(500);
  BTserial.print(finaleTemp);
  BTserial.print("-");
  BTserial.print(finaleSpeed);
  BTserial.println();
}

void Temp() {
  temp = analogRead(temppin);
  temp = (5.0*temp*100.0)/(1024*10);

  finaleTemp = temp;
  
  delay(500);
}

void TachoMeter() {
  detachInterrupt(digitalPinToInterrupt(3));           //detaches the interrupt
  time=millis()-oldtime;        //finds the time 
  rpm=(rev/time)*60000;         //calculates rpm
  oldtime=millis();             //saves the current time
  rev=0;

  attachInterrupt(digitalPinToInterrupt(3),isr,RISING);

  rpmKM = wheelRaduis * rpm * 0.001885;

  if (rpmKM <= 0) {
    return;
  } else {
    finaleSpeed = rpmKM;
  }

  delay(500);
}
