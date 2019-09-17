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

//attemptted to add text
let tim = "tim is awesome";


//**new shape
let rectangleX;
let rectangleY;
let rectangleSize = 100;

//**new shape part 2
let circle2X;
let circle2Y;
let circle2Size = 100;
// preload()
//
// Nothing here

function preload() {

}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);
  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  //rectangle will start on the left side of the screen
  rectangleX = rectangleSize*2;
  rectangleY = rectangleSize*2;
  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = width + squareSize/2;
  squareY = height + squareSize/2;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();
}


// draw()
//
// Change the circle and square's positions so they move
// Draw the circle and square on screen

function draw() {
  // We don't fill the background so we get a drawing effect
  //text properties for tim
  fill(0,0,255);
  textSize(30);
  text(tim, width/2, height/2);
  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0,10);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);

  rectangleX += 2;
  rectangleY -= 2;
  // Make the circle transparent red
  fill(200,55,5,10);
  // Display the circle
  rect(rectangleX+70,rectangleY+70,rectangleSize+40,rectangleSize+40);

  // Move square up and to the left
  squareX -= 1;
  squareY -= 1;
  // Make the square transparent blue
  fill(0,0,255,10);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);
}
