const video = document.getElementById('video');
const button = document.getElementById('btn_flip');
const snapshot=document.getElementById('btn_snap');
const close=document.getElementById('btn_close');
const canvas = document.getElementById('canvas');
const canvas2 = document.getElementById('canvas2');
const cbtnd = document.getElementById('cbtn');
const no1=document.getElementById('no1');
var  ctx = canvas.getContext('2d');
var  ctx2 = canvas2.getContext('2d');
let cameras=[];
let index=-1;
let currentStream;

//var imported = document.createElement('script');
//imported.src = './build/qrcode-decoder.min.js';
//document.head.appendChild(imported);


function stopMediaTracks(stream) {
  stream.getTracks().forEach(track => {
    track.stop();
  });
}

function gotDevices(mediaDevices) {
  //select.innerHTML = '';
  //select.appendChild(document.createElement('option'));
  //let count = 1;
  cameras=[];
  mediaDevices.forEach(mediaDevice => {
    if (mediaDevice.kind === 'videoinput') {
      //const option = document.createElement('option');
      //option.value = mediaDevice.deviceId;
      //const label = mediaDevice.label || `Camera ${count++}`;
      //const textNode = document.createTextNode(label);
      //option.appendChild(textNode);
      cameras.push(mediaDevice.deviceId)
    }
  });
  //console.log("camras.length =" + cameras.length);
}

button.addEventListener('click', event => {
  if (typeof currentStream !== 'undefined') {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  if (index == -1) {
    videoConstraints.facingMode = 'environment';
    index++;
  } else {
    videoConstraints.deviceId = { exact: cameras[index]};
    index++;
    if(index>=cameras.length)
    {
      index=0;
    }
  }
  //console.log(cameras[index]);
  //console.log("index = "+index);
  const constraints = {
    video: videoConstraints,
    audio: false
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(stream => {
      currentStream = stream;
      video.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch(error => {
      console.error(error);
    });
});

snapshot.addEventListener('click',event=>{
  
  var cw =  video.videoWidth;
  var ch = video.videoHeight;
  canvas.width=document.getElementById('cbtn').clientWidth;
  canvas.height=ch*canvas.width/cw;
  
  ctx.drawImage(video, 0,0,canvas.width,canvas.height);
 
  cbtnd.style.visibility="visible";
  no1.style.visibility="visible";
});
close.addEventListener('click',event=>{
  no1.style.visibility="hidden";
  cbtnd.style.visibility="hidden";
});

video.addEventListener('play',event=>{
  var cw =  video.videoWidth;
  var ch = video.videoHeight;
  canvas2.width=document.getElementById('cbtn').clientWidth;
  canvas2.height=ch*canvas2.width/cw;

ctx2.fillStyle = "rgba(96,255,144,0.4)";
ctx2.fillRect((canvas2.width)*0.15, (canvas2.height)*0.15, (canvas2.width)*0.7, (canvas2.height)*0.7);

});

navigator.mediaDevices.enumerateDevices().then(gotDevices);
//ctx.fillStyle = "rgb(0,0,255)";
//ctx.fillRect(50, 25, 150, 100);
document.getElementById("btn_flip").click();
(function () {
  'use strict';
  var qr = new QCodeDecoder();
  if (!(qr.isCanvasSupported() && qr.hasGetUserMedia())) {
    alert('Your browser doesn\'t match the required specs.');
    throw new Error('Canvas and getUserMedia are required');
  }
  //var video = document.querySelector('video');
  //var reset = document.querySelector('#reset');
  //var stop = document.querySelector('#stop');
  function resultHandler (err, result) {
    if (err)
      return console.log(err.message);
    checkcode(result);
  }
  // prepare a canvas element that will receive
  // the image to decode, sets the callback for
  // the result and then prepares the
  // videoElement to send its source to the
  // decoder.
  var scope = (qr.stop(),qr);
  scope.video=video;
  scope.stream=video.srcObject;
  scope.videoDimensions = false;

  setTimeout(function () {
    scope._captureToCanvas.call(scope, video, resultHandler);
  }, 500);
  // attach some event handlers to reset and
  // stop whenever we want.
  //reset.onclick = function () {
  //  qr.decodeFromCamera(video, resultHandler);
  //};
  //stop.onclick = function () {
  //  qr.stop();
  //};
})();