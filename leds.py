import RPi.GPIO as GPIO
import time
import MySQLdb

GPIO.setmode(GPIO.BCM)
GPIO.setup(26, GPIO.OUT) ## GPIO 17 como salida
GPIO.setup(19, GPIO.OUT) ## GPIO 27 como salida
GPIO.setup(13, GPIO.OUT) ## GPIO 27 como salida
GPIO.setup(6, GPIO.OUT) ## GPIO 27 como salida

def Lectura():
	db = MySQLdb.connect(host="34.223.215.43", user="root", passwd="385402292Mica_02", db="control_raspi")
	cur = db.cursor()
	cur.execute("SELECT * FROM control LIMIT 1")
	for row in cur.fetchall() :
		print row
	cur.close()
	db.close ()

try:
	while True:
		Lectura()
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