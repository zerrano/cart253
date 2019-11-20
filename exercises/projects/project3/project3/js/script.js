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

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  play = new Predator(100, 100, 5, color(200, 200, 0), 40);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);

  drums = EDrums('x*o*x*o-')
  follow = Follow( drums )
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(follow.getValue() * 255);

  // Handle input for the tiger
  play.handleInput();

  // Move all the "animals"
  play.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  play.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  // Display all the "animals"
  play.display();
  antelope.display();
  zebra.display();
  bee.display();
}
