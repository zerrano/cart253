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

//avatar images
let tigerImg;
let catImg;
let antImg;
let zebraImg;
let beeImg;

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(100, 100, 5, 70, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, tigerImg, SHIFT);
  //This is our player 2, using keycodes to map our movement to WASD keys
  cat = new Predator(150, 150, 7, 60, 87, 83, 65, 68, catImg, 81);
  antelope = new Prey(100, 100, 10, 70, antImg);
  zebra = new Prey(100, 100, 8, 60, zebraImg);
  bee = new Prey(100, 100, 20, 30, beeImg);
}

//preloading our assets
function preload() {
  bgimg = loadImage("assets/images/bg.jpg");
  tigerImg = loadImage("assets/images/tiger.png");
  catImg = loadImage("assets/images/cat.png");
  antImg = loadImage("assets/images/antelope.png");
  zebraImg = loadImage("assets/images/zebra.png");
  beeImg = loadImage("assets/images/bee.png");
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
