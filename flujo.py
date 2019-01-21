import RPi.GPIO as GPIO
import time
import MySQLdb

GPIO.setmode(GPIO.BCM)
GPIO.setup(20, GPIO.IN) ## GPIO 20 como salida

def flujo():
    estado_flujo = 0
    print(GPIO.input(20))
    if GPIO.input(20) == 1:
        estado_flujo = 1
    else:
        estado_flujo = 0
    
    db = MySQLdb.connect(host="34.223.215.43", user="root", passwd="385402292Mica_02", db="control_raspi")
    cur = db.cursor()
    cur.execute("UPDATE control SET nivel_agua='"+str(estado_flujo)+"' WHERE id_control=1")
    cur.close()
	#db.close ()

try:
	while True:
		flujo()
		time.sleep(0.2)
except KeyboardInterrupt:
	print "Script finalizado."
	GPIO.cleanup()