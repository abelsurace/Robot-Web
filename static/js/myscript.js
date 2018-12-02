        var enableSpeachBool=false;
        var init = function() {
          window.addEventListener("keydown", onKeyDown, false);
          window.addEventListener("keyup", onKeyUp, false);
        
          keyW = false;
          keyA = false;
          keyS = false;
          keyD = false;

          oldrequest = ""
//****START TOUCH LISTENERS*************
 // Get a reference to our touch-sensitive element
 var btnF = document.getElementById("btnF");
  // Add an event handler for the touchstart event
  btnF.addEventListener("touchstart", btnFStart, false);
  btnF.addEventListener("mousedown", btnFStart, false);
  var btnL = document.getElementById("btnL");
  btnL.addEventListener("touchstart", btnLStart, false);
  btnL.addEventListener("mousedown", btnLStart, false);
  var btnR = document.getElementById("btnR");
  btnR.addEventListener("touchstart", btnRStart, false);
  btnR.addEventListener("mousedown", btnRStart, false);
 // var btnX = document.getElementById("btnX");
//  btnX.addEventListener("touchstart", btnXStart, false);
var btnB = document.getElementById("btnB");
btnB.addEventListener("touchstart", btnBStart, false);
btnB.addEventListener("mousedown", btnBStart, false);
  //***************END TOUCH LISTENERS*****************
  btnF.addEventListener("touchend", btnFEnd, false);
  btnF.addEventListener("mouseup", btnFEnd, false);
  btnL.addEventListener("touchend", btnLEnd, false);
  btnL.addEventListener("mouseup", btnLEnd, false);
  btnR.addEventListener("touchend", btnREnd, false);
  btnR.addEventListener("mouseup", btnREnd, false);
 // btnX.addEventListener("touchend", btnXEnd, false);
 btnB.addEventListener("touchend", btnBEnd, false);
 btnB.addEventListener("mouseup", btnBEnd, false);
}
var touchCode;
var touchEvent;
function btnFStart(){
  touchCode=87;
  touchEvent=true;
  onTouch(touchCode, touchEvent);
}
function btnBStart(){
  touchCode=83;
  touchEvent=true;
  onTouch(touchCode, touchEvent);
}
function btnLStart(){
  touchCode=65;
  touchEvent=true;
  onTouch(touchCode, touchEvent);
}
function btnRStart(){
  touchCode=68;
  touchEvent=true;
  onTouch(touchCode, touchEvent);
}
function btnFEnd(){
  touchCode=87;
  touchEvent=false;
  onTouch(touchCode, touchEvent);
}
function btnBEnd(){
  touchCode=83;
  touchEvent=false;
  onTouch(touchCode, touchEvent);
}
function btnLEnd(){
  touchCode=65;
  touchEvent=false;
  onTouch(touchCode, touchEvent);
}
function btnREnd(){
  touchCode=68;
  touchEvent=false;
  onTouch(touchCode, touchEvent);
}

function onTouch(touchCode, action) {
  switch (touchCode) {
    case 68: //d
    keyD = action;
    break;
    case 83: //s
    keyS = action;
    break;
    case 65: //a
    keyA = action;
    break;
    case 87: //w
    keyW = action;
    break;
  }
  sendToRobot();
}

function onKeyDown(event) {
  onKey(event, true);
}

function onKeyUp(event) {
  onKey(event, false);
}

function onKey(event, action) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 39: //d
    keyD = action;
    break;
    case 40: //s
    keyS = action;
    break;
    case 37: //a
    keyA = action;
    break;
    case 38: //w
    keyW = action;
    break;
  }
  sendToRobot();
}

function sendToRobot() {
  var request = "";
  if (!keyW && !keyS && !keyA && !keyD) {
    request = "stop";
  }
  if ( keyW && !keyS && !keyA && !keyD) {
    request = "up_side";
  }
  if (!keyW &&  keyS && !keyA && !keyD) {
    request = "down_side";
  }
  if (!keyW && !keyS &&  keyA && !keyD) {
    request = "left_side";
  }
  if (!keyW && !keyS && !keyA &&  keyD) {
    request = "right_side";
  }

    if (oldrequest != request) {
      console.log(request);
      get(request, function(data) {
        console.log(data);
      });
      oldrequest = request;
    }
}

setInterval(readDistance,1000);

function readDistance()
  {
  get("/distance", function(data) {
     console.log("/distance");
     console.log(data);
     document.getElementById("distance").innerHTML=Math.round(data*100);
  });
  }

function get(uri, callback) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
      var state = xmlhttp.status;
      if ((state >= 200) || (state < 300)) {
        callback(xmlhttp.responseText);
      } else {
        callback(null);
      }
    }
  }
  xmlhttp.open("GET", uri, true);
  xmlhttp.send();
}


function sendText(textmessage)
{
if (textmessage!="")
 {var xmlhttp;

 xmlhttp=new XMLHttpRequest();
 xmlhttp.open("GET","speach/"+textmessage,true);
 xmlhttp.send();}
}

function R2D2()
{
 var xmlhttp;
 xmlhttp=new XMLHttpRequest();
 xmlhttp.open("GET","R2D2",true);
 xmlhttp.send();
}

function sendLanguage()
{
 var isEnglish=document.getElementById("eng");
 var language="spanish"
 if (isEnglish.checked){
 language="english"
 }

 xmlhttp=new XMLHttpRequest();
 xmlhttp.open("GET","language/"+language,true);
 xmlhttp.send();
}


function showValueH(newValue)
{
 var xmlhttp;

 xmlhttp=new XMLHttpRequest();

 document.getElementById("hCam").innerHTML=newValue;
 xmlhttp.open("GET","cameraH/"+newValue,true);
 xmlhttp.send();
}

function showValueV(newValue)
{
 var xmlhttp;

 xmlhttp=new XMLHttpRequest();

 document.getElementById("vCam").innerHTML=newValue;
 xmlhttp.open("GET","cameraV/"+newValue,true);
 xmlhttp.send();
}


$('#hCam').slider({
  formatter: function(value) {
    return value;
  }
});

$("#vCam").slider({
  reversed : true
});