
// create audio context
var context = new (window.AudioContext || window.webkitAudioContext)();

var cardOne;
var cardTwo;
var noteOne;
var noteTwo;

var audioDuration = 2; // audio sample duration in seconds

var score = document.getElementById("score"); // grab scoreboard from html
var scoreCount = 0;
score.innerHTML = scoreCount;

// grab cards from html
var sine = document.getElementById("sine");
var sine_02 = document.getElementById("sine_02");
var square = document.getElementById("square");
var square_02 = document.getElementById("square_02");
var triangle = document.getElementById("triangle");
var triangle_02 = document.getElementById("triangle_02");
var sawtooth = document.getElementById("sawtooth");
var sawtooth_02 = document.getElementById("sawtooth_02");
var noise = document.getElementById("noise");
var noise_02 = document.getElementById("noise_02");
var sound = document.getElementById("sound");
var sound_02 = document.getElementById("sound_02");


/* make cards clickable and assign each card
an oscillator waveform and frequency */
sine.addEventListener('click', function () { flipCard(sine, "sine", 440) });
sine_02.addEventListener('click', function () { flipCard(sine_02, "sine", 440) });
square.addEventListener('click', function () { flipCard(square, "square", 440) });
square_02.addEventListener('click', function () { flipCard(square_02, "square", 440) });
triangle.addEventListener('click', function () { flipCard(triangle, "triangle", 440) });
triangle_02.addEventListener('click', function () { flipCard(triangle_02, "triangle", 440) });
sawtooth.addEventListener('click', function () { flipCard(sawtooth, "sawtooth", 440) });
sawtooth_02.addEventListener('click', function () { flipCard(sawtooth_02, "sawtooth", 440) });
noise.addEventListener('click', function () { flipCard(noise, "sawtooth", 100) });
noise_02.addEventListener('click', function () { flipCard(noise_02, "sawtooth", 100) });
sound.addEventListener('click', function () { flipCard(sound, "sine", 600) });
sound_02.addEventListener('click', function () { flipCard(sound_02, "sine", 600) });


// flip card and play audio sample
function flipCard(card, type, value) {
    if (cardOne == undefined) {
        card.style.backgroundColor = "white";
        card.style.backgroundImage = "url(images/note_01.png)";
        cardOne = card;
        noteOne = type + value;
        play(type, value);
    } else if (cardTwo == undefined && card != cardOne) {
        card.style.backgroundColor = "white";
        card.style.backgroundImage = "url(images/note_01.png)";
        cardTwo = card;
        noteTwo = type + value;
        play(type, value);
    }
}
// remove cards if audio samples match, else flip cards back
function checkMatch() {
    if (noteOne == noteTwo) {
        cardOne.style.visibility = "hidden";
        cardTwo.style.visibility = "hidden";
        cardOne = undefined;
        cardTwo = undefined;
        noteOne = undefined;
        noteTwo = undefined;
        } else {
        cardOne.style.backgroundImage = "none";
        cardTwo.style.backgroundImage = "none";
        cardOne.style.backgroundColor = "#40e2ff";
        cardTwo.style.backgroundColor = "#40e2ff";
        cardOne = undefined;
        cardTwo = undefined;
        noteOne = undefined;
        noteTwo = undefined;
        scoreCount += 2; // add two points if cards don't match
        score.innerHTML = scoreCount;

    }
}

function play(type, value) {

    // create oscillator and volume nodes
    var note = context.createOscillator();
    var volume = context.createGain();

    var now = context.currentTime;

    volume.connect(context.destination); // connect volume to destination
    note.frequency.value = value;
    note.type = type;
    note.connect(volume); // connect oscillator to volume 
    volume.gain.setValueAtTime(1, context.currentTime);
    note.start();
    volume.gain.exponentialRampToValueAtTime(0.001, now + audioDuration); // fade out audio
    note.stop(now + audioDuration);

    // if two cards are flipped, check for match when audio stops
    if (cardTwo != undefined) {
        note.onended = function () {
            checkMatch();
        }
    }

}