# **Robot-web**
 
Robot-web is a project to control a robot with locomotion, camera and speech over the internet from a web page served form within the same raspberry-pi. It uses a python script and Flask library. Every action performed by the robot is a call to a REST API, this calls are send from the front end using ajax.

For example to send speech to Robot-web, the following call can be send from browser. In this example we assume that the ip address used by your rasp berry pi is 192.168.1.89, so change it to your rbpi ip address.

_http://192.168.1.89:5000/speach/how are you?_

To read the distance in meters form distance sensor:

[http://192.168.1.89:5000/distance](http://192.168.1.89:5000/distance)

For motion:

[http://192.168.1.89:5000/left\_side](http://192.168.1.89:5000/left_side)

[http://192.168.1.89:5000/right\_side](http://192.168.1.89:5000/right_side)

[http://192.168.1.89:5000/up\_side](http://192.168.1.89:5000/up_side)

[http://192.168.1.89:5000/down\_side](http://192.168.1.89:5000/down_side)

[http://192.168.1.89:5000/stop](http://192.168.1.89:5000/stop)

## **Camera movement:**

[**http://192.168.1.89:5000/cameraV/1500**](http://192.168.1.89:5000/cameraV/1500)

[**http://192.168.1.89:5000/cameraH/1500**](http://192.168.1.89:5000/cameraH/1500)

Where 1500 is the mid range of slide bar.

Min position is 1000 and  Max position is 2000.

To move camera to the max position in horizontal access use:

http://192.168.1.89:5000/cameraH/2000



## **Install text to speech:**

sudo apt-get install espeak

espeak &quot;Text you wish to hear back&quot; 2\&gt;/dev/null

## **Install omx, media player to play sounds:**

sudo apt-get install omxplayer

## **Install pigpio**

This library helps control the servos for the camera with less jitter, ideally raspberrypi shpuld use a servo vontroller dedicated card to avoid timig issues.

sudo apt-get update
sudo apt-get install pigpio python-pigpio python3-pigpio

## **install video streamer:**

Download the sources from this link:

- [mjpg-streamer.tar.gz](http://terzo.acmesystems.it/download/webcam/mjpg-streamer.tar.gz)

Save the file on the Acme board microSD then uncompress it by typing:

~# **tar -xvzf mjpg-streamer.tar.gz**

~# **cd mjpg-streamer**

~/mjpg-streamer#

Install  **make** ,  **libjpeg-dev**  and  **libv4l-dev**  libraries:

~/mjpg-streamer# **apt-get update**

~/mjpg-streamer# **apt-get install make**

~/mjpg-streamer# **apt-get install libjpeg-dev**

~/mjpg-streamer# **apt-get install libv4l-dev**

Now run the source compilation:

~/mjpg-streamer# **make**

After a while the mjpg-streamer executable will be ready.

## Kernel 3.11 troubleshooting

If you get this error:

    .. fatal error: linux/videodev.h: No such file or directory

Create a soft link to /usr/include/linux/videodev2.h

    ~/mjpg-streamer# **ln -s /usr/include/libv4l1-videodev.h /usr/include/linux/videodev.h**

Comment also the following line in the  **Makefile** :

    \# PLUGINS += input\_gspcav1.so

If at run time it still doesn&#39;t work verify, using  **make menuconfig**  that that the  **USB Video Class**  is enabled in the Kernel :

    Device Drivers 
    Multimedia support
    Media USB Adapters
    USB Video Class (UVC)

Now run the streaming server typing:

    ~/mjpg-streamer# **./mjpg\_streamer -i &quot;./input\_uvc.so -f 15 -r 640x480&quot; -o &quot;./output\_http.so -w ./www&quot;**

MJPG Streamer Version.: 2.0

       Using V4L2 device.: /dev/video0
       Desired Resolution: 640 x 480
        Frames Per Second.: 15
        Format............: MJPEG
        www-folder-path...: ./www/
        HTTP TCP port.....: 8080
        username:password.: disabled
        commands..........: enabled

**CONFIGURATION**

Under _&#39;/Home/pi&#39;_  location copy

Files: robotweb.py  and R2D2.mp3

Folders: Templates and all its content And static folder and its content.

Add following lines to _&quot;/etc/rc.local&quot;,_ this will help run robotweb up on raspberry pi after reboot reboot.

/home/pi/Templates/pigpio.sh &amp;

/home/pi/Templates/streamer.sh &amp;

python /home/pi/robotweb.py &amp;

exit 0

to control your robot go to:

[http://your\_raspberry\_pi\_ip\_address:5000](http://your_raspberry_pi_ip_address:5000)
