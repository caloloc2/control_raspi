import RPi.GPIO as GPIO
import time
import MySQLdb

GPIO.setmode(GPIO.BCM)
GPIO.setup(26, GPIO.OUT) ## GPIO 26 como salida
GPIO.setup(19, GPIO.OUT) ## GPIO 19 como salida
GPIO.setup(13, GPIO.OUT) ## GPIO 13 como salida
GPIO.setup(6, GPIO.OUT) ## GPIO 6 como salida

def lectura():
	db = MySQLdb.connect(host="34.223.215.43", user="root", passwd="385402292Mica_02", db="control_raspi")
	cur = db.cursor()
	cur.execute("SELECT * FROM control LIMIT 1")
	for row in cur.fetchall() :
		estados = (str(row[8])).split('*')		
		audio_activo = row[9]

		if (audio_activo==1):
			for linea in estados:
				# obtiene el estado de los pines
				valor = linea.split('-')

				# led 1
				if (valor[0]=='1'):
					GPIO.output(26, True)
				else:
					GPIO.output(26, False)
				# led 2
				if (valor[1]=='1'):
					GPIO.output(19, True)
				else:
					GPIO.output(19, False)
				# led 3
				if (valor[2]=='1'):
					GPIO.output(13, True)
				else:
					GPIO.output(13, False)
				# led 4
				if (valor[3]=='1'):
					GPIO.output(6, True)
				else:
					GPIO.output(6, False)

				time.sleep(0.2)
		else:
			# led 1
			if (row[1]==1):
				GPIO.output(26, True)
			else:
				GPIO.output(26, False)
			# led 2
			if (row[2]==1):
				GPIO.output(19, True)
			else:
				GPIO.output(19, False)
			# led 3
			if (row[3]==1):
				GPIO.output(13, True)
			else:
				GPIO.output(13, False)
			# led 4
			if (row[4]==1):
				GPIO.output(6, True)
			else:
				GPIO.output(6, False)
			time.sleep(0.5)
	cur.close()
	db.close ()

try:
	while True:
		lectura()
		time.sleep(0.2)
except KeyboardInterrupt:
	print "Script finalizado."
	GPIO.cleanup()