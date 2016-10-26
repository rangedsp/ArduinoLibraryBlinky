//const unsigned int LED_PIN = GPIO5;
//
//void setup()
//{
//    pinMode(LED_PIN, OUTPUT);
//}
//
//void loop()
//{
//    digitalWrite(LED_PIN, LOW);
//    delay(500);
//    digitalWrite(LED_PIN, HIGH);
//    delay(500);
//}



const int pingPin = GPIO14;

void setup() {
	pinMode(GPIO5, OUTPUT);
}

void loop() {
	long duration, inches, cm;
	
	pinMode(pingPin, OUTPUT);
	digitalWrite(pingPin, LOW);
	delayMicroseconds(2);
	digitalWrite(pingPin, HIGH);
	delayMicroseconds(5);
	digitalWrite(pingPin, LOW);

	pinMode(pingPin, INPUT);
	duration = pulseIn(pingPin, HIGH);

	cm = duration / 29 / 2;

	if (cm < 30)
	{
		digitalWrite(GPIO5, HIGH);
	}
	else {
		digitalWrite(GPIO5, LOW);
	}
}
