// Exercise 1 - Movement
// Pippin Barr
//
// Starter code for exercise 1.
// Draws a moving square and circle that intersect
// in the middle of the canvas.


// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 100;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 100;

// Shrek's attributes, he'll be flying from the bottom left of the screen
let shrek;
let shrekX;
let shrekY;
let shrekSize = 100;

//adding another shrek image.... just because. he'll be coming from the bottom right
let shrek2;
let shrek2X;
let shrek2Y;
let shrek2Size = 100;

//add some saucy text
let tim="tim is sexy";

// preload()
//

// Abstract function to be overriden; should return the type.

// pre-loading shrek

function preload() {
  shrek = loadImage('../assets/images/shrek.png');
  shrek2 = loadImage('../assets/images/shrek.jpg');
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  //loading our sexy shrek image at the bottom left, divide by two since we'll draw from the center
  shrekX = -shrekSize/2;
  shrekY = height + shrekSize/2;

  //loading our sexy shrek image at the bottom right, divide by two since we'll draw from the center
  shrek2X = shrek2Size/2+600;
  shrek2Y = height + shrek2Size/2;

  //images start from the center
  imageMode(CENTER);

}


// draw()

function draw() {
  // We don't fill the background so we get a drawing effect
  //text properties for tim text, it will always be on cursor
  fill(0,0,255);
  textSize(30);
  text(tim, mouseX, mouseY);
  // adding a background to eliminate trailing
  background (100, 300, 100, 100);

  //shrek will be gracefully moving to the top right
  shrekX += 0.7;
  shrekY -= 0.7;
  image (shrek, shrekX, shrekY, shrekSize, shrekSize);

  //shrek will be gracefully flying to the top left
  shrek2X -= 0.7;
  shrek2Y -= 0.7;
  image (shrek2, shrek2X, shrek2Y, shrek2Size, shrek2Size);
}
