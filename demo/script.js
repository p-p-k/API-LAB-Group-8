
class Sound {
    constructor(context) {
        this.context = context;
    }
    init() {
        this.oscillator = this.context.createOscillator();
        this.gainNode = this.context.createGain();

        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.context.destination);
        // this.oscillator.type = 'sine';
    }
    play(value, time) {
        this.init();

        this.oscillator.type = value;
        // this.oscillator.frequency.value = value;
        this.gainNode.gain.setValueAtTime(1, this.context.currentTime);

        this.oscillator.start(time);
        this.stop(time);
    }
    stop(time) {
        this.gainNode.gain.exponentialRampToValueAtTime(0.001, time + 5);
        this.oscillator.stop(time + 5);
        
    }

}


// create audio context
var context = new (window.AudioContext || window.webkitAudioContext)();

var note = new Sound(context);
var now = context.currentTime;

var cardOne;
var cardTwo;
var noteOne;
var noteTwo;

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


// make cards clickable
sine.addEventListener('click', function () { flipCard(sine, "sine") });
sine_02.addEventListener('click', function () { flipCard(sine_02, "sine") });
square.addEventListener('click', function () { flipCard(square, "square") });
square_02.addEventListener('click', function () { flipCard(square_02, "square") });
triangle.addEventListener('click', function () { flipCard(triangle, "triangle") });
triangle_02.addEventListener('click', function () { flipCard(triangle_02, "triangle") });
sawtooth.addEventListener('click', function () { flipCard(sawtooth, "sawtooth") });
sawtooth_02.addEventListener('click', function () { flipCard(sawtooth_02, "sawtooth") });
noise.addEventListener('click', function () { flipCard(noise) });
noise_02.addEventListener('click', function () { flipCard(noise_02) });
sound.addEventListener('click', function () { flipCard(sound) });
sound_02.addEventListener('click', function () { flipCard(sound_02) });


// flip card, play audio sample and check for match
function flipCard(card, sample) {
    if (cardOne == undefined) {
        card.style.backgroundColor = "white";
        cardOne = card;
        note.play(sample, now)
        noteOne = sample;
        console.log("flipped");
    } else if (cardTwo == undefined) {
        card.style.backgroundColor = "white";
        cardTwo = card;
        note.play(sample, now);
        noteTwo = sample;
        checkMatch();
    }
}

function checkMatch() {
    if (noteOne == noteTwo) {
        cardOne.style.visibility = "hidden";
        cardTwo.style.visibility = "hidden";
        cardOne = undefined;
        cardTwo = undefined;
        noteOne = undefined;
        noteTwo = undefined;
    // } else {
    //     cardOne.style.backgroundColor = "#40e2ff";
    //     cardTwo.style.backgroundColor = "#40e2ff";
    }
}