// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let tiger;

//Player TWOOOOO
let cat;

// The three prey
let antelope;
let zebra;
let bee;

//background image
let bgimg;
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, color(200, 200, 0), 40, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW);
  //This is our player 2, using keycodes to map our movement to WASD keys
  cat = new Predator(150, 150, 7, color(150, 150, 150), 40, 87, 83, 65, 68);
  antelope = new Prey(100, 100, 10, color(255, 100, 10), 50);
  zebra = new Prey(100, 100, 8, color(255, 255, 255), 60);
  bee = new Prey(100, 100, 20, color(255, 255, 0), 10);
}

//preloading our assets
function preload() {
  bgimg = loadImage("assets/images/bg.jpg");
}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  // Clear the background to black
  background(bgimg);

  // Handle input for the tiger
  tiger.handleInput();

  // Controls for Cat aka player TWOOOO
  cat.handleInput();
  // Move all the "animals"
  tiger.move();
  cat.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the tiger eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  //handle the cat eating any of the prey
  cat.handleEating(antelope);
  cat.handleEating(zebra);
  cat.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  cat.display();
  antelope.display();
  zebra.display();
  bee.display();
}
