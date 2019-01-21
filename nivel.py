import RPi.GPIO as GPIO
import time
import MySQLdb

GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.IN, pull_up_down = GPIO.PUD_UP) ## GPIO 22 como salida

global count
count = 0

def contador_pulso(channel):
   global count
   if start_counter == 1:
      count = count+1
      print count
      flow = count / (60 * 7.5)
      print(flow)

def guardar_dato(nivel):
    db = MySQLdb.connect(host="34.223.215.43", user="root", passwd="385402292Mica_02", db="control_raspi")
    cur = db.cursor()
    cur.execute("UPDATE control SET nivel_flujo='"+str(nivel)+"'")
    db.commit()

GPIO.add_event_detect(22, GPIO.FALLING, callback=contador_pulso) 

try:
	while True:
		start_counter = 1
        time.sleep(1)
        start_counter = 0
        flow = (count * 60 * 2.25 / 1000)
        print "The flow is: %.3f Liter/min" % (flow)
        count = 0
        time.sleep(5)
except KeyboardInterrupt:
	print "Script finalizado."	
	GPIO.cleanup()