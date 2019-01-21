import RPi.GPIO as GPIO
import time
import MySQLdb

GPIO.setmode(GPIO.BCM)
#GPIO.setup(22, GPIO.IN, pull_up_down = GPIO.PUD_UP) ## GPIO 22 como entrada
GPIO.setup(22, GPIO.IN) ## GPIO 22 como entrada

global count
count = 0

def guardar_dato(nivel):
    db = MySQLdb.connect(host="34.223.215.43", user="root", passwd="385402292Mica_02", db="control_raspi")
    cur = db.cursor()
    cur.execute("UPDATE control SET nivel_flujo='"+str(nivel)+"'")
    db.commit()

def contador_pulso():
    global count
    for x in range(0, 60):
        if GPIO.input(22) == 1:
            count = count + 1            
            time.sleep(0.0001)
    print(count)
    flow = (count * 60 * 2.25 / 1000)
    print "Flujo: %.3f L/m" % (flow)
    guardar_dato(flow)

#GPIO.add_event_detect(22, GPIO.FALLING, callback=contador_pulso) 

try:
    while True:
        time.sleep(1)
        contador_pulso()
        count = 0
        time.sleep(1)

except KeyboardInterrupt:
	print "Script finalizado."	
	GPIO.cleanup()