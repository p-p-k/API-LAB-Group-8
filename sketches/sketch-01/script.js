
// create audio context
var context = new (window.AudioContext || window.webkitAudioContext)();

var sine = document.getElementById("sine");
var square = document.getElementById("square");
var triangle = document.getElementById("triangle");
var sawtooth = document.getElementById("sawtooth");

var cursorX = 0;

// create oscillator
var oscillator = context.createOscillator();

// map frequency to mouse movement along the x-axis
document.body.onmousemove = function (event) {
    cursorX = event.pageX;
    oscillator.frequency.value = (cursorX / window.innerWidth) * 400 + 200;
    oscillator.connect(context.destination);
    oscillator.start();
};

// change waveform when mouse enters corresponding area
sine.onmouseenter = function (){
    oscillator.type = 'sine';
    oscillator.connect(context.destination);
};
square.onmouseenter = function (){
    oscillator.type = 'square';
    oscillator.connect(context.destination);
};
triangle.onmouseenter = function (){
    oscillator.type = 'triangle';
    oscillator.connect(context.destination);
};
sawtooth.onmouseenter = function (){
    oscillator.type = 'sawtooth';
    oscillator.connect(context.destination);
};