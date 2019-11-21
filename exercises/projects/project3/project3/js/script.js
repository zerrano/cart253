// Pop Stream!
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

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  play = new Predator(100, 100, 5, playImg, 40);
  antelope = new Prey(random(0, 1000), random(0, 100), noteImg, 50);
  zebra = new Prey(random(0, 1000), random(0, 100), noteImg, 60);
  bee = new Prey(random(0, 1000), random(0, 100), noteImg, 10);

}

function preload(){
  playImg = loadImage("assets/images/play.png");
  noteImg = loadImage("assets/images/note.png");
}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(0);

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
