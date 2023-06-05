/**********************************************************************
  Filename    : Combination Lock
  Description : Make a simple combination lock.
  Auther      : www.freenove.com
  Modification: 2020/07/11
**********************************************************************/
#include <Keypad.h>
#include <ESP32Servo.h>
#include "DHT.h"
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <Arduino.h>
#include <WiFi.h>
#include <Firebase_ESP_Client.h>
//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

// Insert your network credentials
#define WIFI_SSID "Madeirinha"
#define WIFI_PASSWORD "vicas123"

// Insert Firebase project API Key
#define API_KEY "AIzaSyAngjAnqhIPt4nLpfeyu4xVnEwO9DVmmUE"

// Insert RTDB URLefine the RTDB URL */
#define DATABASE_URL "https://esp32-smartbathroom-default-rtdb.europe-west1.firebasedatabase.app/"

#define DHTPIN 4    
#define DHTTYPE DHT11  

//lcd
#define SDA 15                    //Define SDA pins
#define SCL 13                    //Define SCL pins

//desembacador
#define DESEMBACADORPIN 23
#define AQUECEDORPIN 22

LiquidCrystal_I2C lcd(0x27,16,2);
DHT dht(DHTPIN, DHTTYPE);

const byte ROWS = 4; //four rows
const byte COLS = 3; //three columns

// define the symbols on the buttons of the keypad
char keys[ROWS][COLS] = {
  {'1','2','3'},
  {'4','5','6'},
  {'7','8','9'},
  {'*','0','#'}
};

byte rowPins[ROWS] = {14, 32, 33, 26}; //connect to the row pinouts of the keypad
byte colPins[COLS] = {27, 12, 25}; //connect to the column pinouts of the keypad

// initialize an instance of class NewKeypad
Keypad myKeypad = Keypad(makeKeymap(keys), rowPins, colPins, ROWS, COLS);

Servo  myservo;     // Create servo object to control a servo
int servoPin = 19;  // Define the servo pin
int buzzerPin = 18; // Define the buzzer pin

char passWord[] = {"1234"}; // Save the correct password


//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;
bool signupOK = false;

void setup() {
  myservo.setPeriodHertz(50);           // standard 50 hz servo
  myservo.attach(servoPin, 500, 2500);  // attaches the servo on servoPin to the servo object
                                        // set the high level time range of the servo motor for an accurate 0 to 180 sweep
  myservo.write(0);                     // Set the starting position of the servo motor
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
  Wire.begin(SDA, SCL);           // attach the IIC pin
  if (!i2CAddrTest(0x27)) {
    lcd = LiquidCrystal_I2C(0x3F, 16, 2);
  }
  lcd.init();                     // LCD driver initialization
  lcd.backlight();                // Open the backlight
  dht.begin();
  pinMode(DESEMBACADORPIN, OUTPUT); 
  pinMode(AQUECEDORPIN, OUTPUT); 

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();
  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);

  //firebase
  setWc();

}

void loop() {

  float h = dht.readHumidity();
  // Read temperature as Celsius (the default)
  float t = dht.readTemperature();

  lcd.setCursor(0,0);             // Move the cursor to row 0, column 0
  lcd.print("Temp: ");
  lcd.print(t);
  lcd.write(223);
  lcd.print("C");
  lcd.setCursor(0,1);             // Move the cursor to row 0, column 0
  lcd.print("Humidade: ");
  lcd.print(h);
  lcd.print("%");

  Firebase.RTDB.setFloat(&fbdo, "wc1/temp", t);
  Firebase.RTDB.setFloat(&fbdo, "wc1/humidade", h);

  if(h > 70){
    digitalWrite(DESEMBACADORPIN, HIGH);
    Firebase.RTDB.setBool(&fbdo, "wc1/desembacador", true);
  }
  else{
    digitalWrite(DESEMBACADORPIN, LOW);
    Firebase.RTDB.setBool(&fbdo, "wc1/desembacador", false);
  }

  static char keyIn[4];     // Save the input character
  static byte keyInNum = 0; // Save the the number of input characters
  char keyPressed = myKeypad.getKey();  // Get the character input
  //Serial.println(keyPressed);
  // Handle the input characters
  if (keyPressed) {
    // Make a prompt tone each time press the key
    Serial.println(keyPressed);
    digitalWrite(buzzerPin, HIGH);
    delay(100);
    digitalWrite(buzzerPin, LOW);
    // Save the input characters
    keyIn[keyInNum++] = keyPressed;
    // Judge the correctness after input
    if (keyInNum == 4) {
      bool isRight = true;            // Save password is correct or not
      for (int i = 0; i < 4; i++) {   // Judge each character of the password is correct or not
        if (keyIn[i] != passWord[i])
          isRight = false;            // Mark wrong passageword if there is any wrong character.
      }
      if (isRight) {                  // If the input password is right
        myservo.write(90);           // Open the switch
        Firebase.RTDB.setBool(&fbdo, "wc1/locked", false);
        delay(5000);                  // Delay a period of time
        myservo.write(0);            // Close the switch
        Firebase.RTDB.setBool(&fbdo, "wc1/locked", true);
        Serial.println("passWord right!");
      }
      else {                          // If the input password is wrong
        digitalWrite(buzzerPin, HIGH);// Make a wrong password prompt tone
        delay(1000);
        digitalWrite(buzzerPin, LOW);
        Serial.println("passWord error!");
      }
      keyInNum = 0; // Reset the number of the input characters to 0
    }
  }

  
  //aquecedor casa de banho
  Firebase.RTDB.getBool(&fbdo, "/wc1/aquecedor");
  bool aquecedor = fbdo.boolData();
  if(aquecedor){
    digitalWrite(AQUECEDORPIN, HIGH);
  }
  else{
    digitalWrite(AQUECEDORPIN, LOW);
  }
  
}

bool i2CAddrTest(uint8_t addr) {
  Wire.begin();
  Wire.beginTransmission(addr);
  if (Wire.endTransmission() == 0) {
    return true;
  }
  return false;
}

void setWc(){
  Firebase.RTDB.setBool(&fbdo, "wc1/locked", true);
  Firebase.RTDB.setString(&fbdo, "wc1/code", "1234");
  Firebase.RTDB.setBool(&fbdo, "wc1/desembacador", false);
  Firebase.RTDB.setBool(&fbdo, "wc1/aquecedor", false);
  Firebase.RTDB.setFloat(&fbdo, "wc1/temp", 0.0);
  Firebase.RTDB.setFloat(&fbdo, "wc1/humidade", 0.0);
  
  Firebase.RTDB.setBool(&fbdo, "wc2/locked", true);
  Firebase.RTDB.setString(&fbdo, "wc2/code", "0000");
  Firebase.RTDB.setBool(&fbdo, "wc2/desembacador", false);
  Firebase.RTDB.setBool(&fbdo, "wc2/aquecedor", false);
  Firebase.RTDB.setFloat(&fbdo, "wc2/temp", 0.0);
  Firebase.RTDB.setFloat(&fbdo, "wc2/humidade", 0.0);

  Firebase.RTDB.setBool(&fbdo, "wc3/locked", true);
  Firebase.RTDB.setString(&fbdo, "wc3/code", "0000");
  Firebase.RTDB.setBool(&fbdo, "wc3/desembacador", false);
  Firebase.RTDB.setBool(&fbdo, "wc3/aquecedor", false);
  Firebase.RTDB.setFloat(&fbdo, "wc3/temp", 0.0);
  Firebase.RTDB.setFloat(&fbdo, "wc3/humidade", 0.0);

  Firebase.RTDB.setBool(&fbdo, "wc4/locked", true);
  Firebase.RTDB.setString(&fbdo, "wc4/code", "0000");
  Firebase.RTDB.setBool(&fbdo, "wc4/desembacador", false);
  Firebase.RTDB.setBool(&fbdo, "wc4/aquecedor", false);
  Firebase.RTDB.setFloat(&fbdo, "wc4/temp", 0.0);
  Firebase.RTDB.setFloat(&fbdo, "wc4/humidade", 0.0);
}
