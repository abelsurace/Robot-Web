#!/usr/bin/env python3

from flask import Flask
from flask import render_template, request
from subprocess import call
import RPi.GPIO as GPIO
import subprocess
from gpiozero import DistanceSensor
import pigpio
import time
from time import sleep
try:
    import RPi.GPIO as GPIO;
except RuntimeError:
    print ("Error importing RPI.GPIO")

app = Flask(__name__, template_folder='Templates/robothtml/')
#video stream run /usr/local/bin/mjpg_streamer -i "/usr/local/lib/input_uvc.so" -o "/usr/local/lib/output_http.so -w /usr/local/www -p 5002"
#initialize GPIO to control servos by PWM
#espeak -s 180 -g5 -ves+30 "yo soy un robode que no no no me quiero callar" 2>/dev/null

cmd_beg= 'espeak -s 200 -g5 '
cmd_lang='-ven+30 '
cmd_end= ' 2>/dev/null' # To dump the std errors to /dev/null

leftpin=19 #35
rightpin=13 #33
camhpin=6 #5
camvpin=5 #6
MIN_PW = 1000
MID_PW = 1500
MAX_PW = 2000
pi = pigpio.pi()
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False);
GPIO.setup(leftpin, GPIO.OUT)
GPIO.setup(rightpin, GPIO.OUT)

pwmL=GPIO.PWM(leftpin, 50)
pwmR=GPIO.PWM(rightpin, 50)

pwmL.start(0)
pwmR.start(0)
distance=0
speed = 80
camHVal=int(1500)
GPIO.output(leftpin, True);
GPIO.output(rightpin, True);
pi.set_servo_pulsewidth(camhpin, MID_PW)
pi.set_servo_pulsewidth(camvpin, MAX_PW)
ultrasonic = DistanceSensor(echo=24, trigger=23, max_distance=20)
print ("Done")

def SetAngleL(angle):
    duty = angle / 18 + 2.0;
    return duty

def SetAngleR(angle):
    duty = (180-angle) / 18 + 2.0;
    return duty
@app.route('/')
def index():
     return render_template('robot.html');
    
@app.route('/distance')
def distance():
    distance=ultrasonic.distance
    return str(distance)

@app.route('/left_side')
def left_side():
    data1="LEFT"
    angle=90+speed
    pwmL.ChangeDutyCycle(SetAngleR(angle))
    pwmR.ChangeDutyCycle(SetAngleR(angle))
    return 'true'

@app.route('/right_side')
def right_side():
   data1="RIGHT"
   angle=90+speed
   pwmL.ChangeDutyCycle(SetAngleL(angle))
   pwmR.ChangeDutyCycle(SetAngleL(angle))
   return 'true'

@app.route('/up_side')
def up_side():
   data1="FORWARD"
   angle=90+speed
   pwmL.ChangeDutyCycle(SetAngleR(angle))
   pwmR.ChangeDutyCycle(SetAngleL(angle))
   return 'true'

@app.route('/down_side')
def down_side():
   data1="BACK"
   angle=90+speed
   pwmL.ChangeDutyCycle(SetAngleL(angle))
   pwmR.ChangeDutyCycle(SetAngleR(angle))
   return 'true'

@app.route('/stop')
def stop():
   data1="STOP"
   pwmL.ChangeDutyCycle(0);
   pwmR.ChangeDutyCycle(0);
   return  'true'

@app.route('/cameraH/<value>')
def cameraH(value):
   x=3000-int(value)
   pi.set_servo_pulsewidth(camhpin, x)
   return  'true'

@app.route('/cameraV/<value>')
def cameraV(value):
   x=3000-int(value)
   pi.set_servo_pulsewidth(camvpin, x)
   return  'true'

@app.route('/speach/<value>')
def speach(value):
    global cmd_beg
    global cmd_lang
    global cmd_end
    speachtext=value
    call([cmd_beg+cmd_lang + '"'+ speachtext+'"'+cmd_end], shell=True)
    print("Text: "+cmd_beg+cmd_lang + '"'+ speachtext+'"'+cmd_end)
    return  'true'

@app.route('/language/<value>')
def language(value):
    global cmd_lang
    languageVal=value
    if (languageVal=="spanish"):
        cmd_lang='-ves+30 '
    else:
        cmd_lang='-ven+30 '
    print("Language: "+languageVal)
    return  'true'

@app.route('/R2D2')
def R2D2():
    call(["omxplayer -o local /home/pi/R2D2.mp3"], shell=True)
    return  'true'

@app.route('/phrases.html')
def phrases():
    return render_template('phrases.html');#return redirect(url_for('phrases.html'))


if __name__ == "__main__":
 print ("Start...")
 speach("ready")
 #subprocess.Popen(['/home/pi/Templates/streamer.sh'], shell=True)
try:
      app.run(host='0.0.0.0', port=5000)
except KeyboardInterrupt:
     print("...stoping");
     pwm.stop();
     pwm2.stop();
     GPIO.output(leftpin, False);
     GPIO.output(rightpin, False);
     pwmL.ChangeDutyCycle(0);
     pwmL.ChangeDutyCycle(0);
     GPIO.cleanup();     
