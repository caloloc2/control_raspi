import RPi.GPIO as GPIO
import time
import MySQLdb

GPIO.setmode(GPIO.BCM)
GPIO.setup(20, GPIO.IN) ## GPIO 20 como salida

def flujo():
    estado_flujo = 0
    estado_flujo = GPIO.input(20)
    
    db = MySQLdb.connect(host="34.223.215.43", user="root", passwd="385402292Mica_02", db="control_raspi")
    cur = db.cursor()
    cur.execute("UPDATE control SET nivel_agua='"+str(estado_flujo)+"'")
    db.commit()    

try:
	while True:
		flujo()
		time.sleep(0.2)
except KeyboardInterrupt:
	print "Script finalizado."
	db.close ()
	GPIO.cleanup()