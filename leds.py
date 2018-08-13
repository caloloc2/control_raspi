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
		# led 1
		if (row[1]==1):
			GPIO.output(26, True)
		else:
			GPIO.output(26, False)
		# led 1
		if (row[2]==1):
			GPIO.output(19, True)
		else:
			GPIO.output(19, False)
		# led 1
		if (row[3]==1):
			GPIO.output(13, True)
		else:
			GPIO.output(13, False)
		# led 1
		if (row[4]==1):
			GPIO.output(9, True)
		else:
			GPIO.output(9, False)
	cur.close()
	db.close ()

try:
	while True:
		Lectura()
		time.sleep(1)
except KeyboardInterrupt:
	print "Script finalizado."
	GPIO.cleanup();