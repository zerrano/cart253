// Beat Saver!
// by Timothy Serrano
//
// Welcome to Pop Stream! The game where you save the lost musical notes!
// The game will consist of Musical notes (prey) that will fly across the screen from right to left
// and it is up to you, the PLAY button (predator) to save them! Colliding with a music note as the play button
// will "consume/save" them while playing the music stored in them as well. Just beware of the red notes that will try to stop you!

// I will be working off of the predator/prey code that we worked on in class for this project.


// Our predator
let play;

// The three prey
let antelope;
let zebra;
let bee;

//our predator images

let playImg;
let noteImg;

//welcome screen image
let welcomeImg;

//gibber music
let mainTheme;
let kicker;
let drums;
let follow;
let rhodes;

let state = "WELCOME";
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  //instruments

  //clave/knee slapper instrument
  mainTheme = Clave().play( Rndf(1500, 5000), 1/16 );
  //kicker
  kicker = Kick().play( 55, 1/4 );
  //synth chords
  rhodes = Synth( 'rhodes', {amp:.35} )
    .chord.seq( Rndi(0,6,3), 1 )
    .fx.add( Delay() )

  drums = EDrums('x*o*x*o-');
  drums.stop();
  follow = Follow( kicker);
  play = new Predator(100, 100, 5, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, playImg, SHIFT, 40, drums);
  antelope = new Prey(random(0, 1000), random(0, 100), noteImg, 50);
  zebra = new Prey(random(0, 1000), random(0, 100), noteImg, 60);
  bee = new Prey(random(0, 1000), random(0, 100), noteImg, 10);

}

function preload(){
  playImg = loadImage("assets/images/play.png");
  noteImg = loadImage("assets/images/note.png");
  welcomeImg = loadImage("assets/images/welcome.png");
}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (state === "WELCOME"){
    welcomePage(); //shows our welcome screen
  }

  else if (state === "GAME"){
    mainGame(); //loads in the main game once left mouse click
  }

}

//Our switch controller for starting the game from left mouse clicking on the greeting screen
function mousePressed() {
  if (state === "WELCOME") {
    // If we were on the title we need to switch to instructions
    state = "GAME";
  }
  else if (state === "GAME") {
    // If we were on the instructions we need to switch to the game itself
    state = "GAME";
  }
}

//our greeting screen
function welcomePage() {
  background (welcomeImg);

  
}

function mainGame() {
  // Clear the background to black
  background(follow.getValue() * 255,0,0);

  // Handle input for the tiger
  play.handleInput();

  // Move all the "animals"
  play.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  play.handleEating(antelope);
  play.handleEating(zebra);
  play.handleEating(bee);

  // Display all the "animals"
  play.display();
  antelope.display();
  zebra.display();
  bee.display();

}
