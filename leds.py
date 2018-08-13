import RPi.GPIO as GPIO
import time
GPIO.setmode(GPIO.BCM)
GPIO.setup(26, GPIO.OUT) ## GPIO 17 como salida
GPIO.setup(19, GPIO.OUT) ## GPIO 27 como salida
GPIO.setup(13, GPIO.OUT) ## GPIO 27 como salida
GPIO.setup(6, GPIO.OUT) ## GPIO 27 como salida

try:
	while(True)
		GPIO.output(26, True)
		time.sleep(1)
		GPIO.output(19, True)
		time.sleep(1)
		GPIO.output(13, True)
		time.sleep(1)
		GPIO.output(6, True)
		time.sleep(1)
		GPIO.output(26, False)
		GPIO.output(19, False)
		GPIO.output(13, False)
		GPIO.output(6, False)
		time.sleep(1)
except KeyboardInterrupt:
	print "Script finalizado."
	GPIO.cleanup();