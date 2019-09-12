// Exercise 0 - Spiritual Self-Portrait
// Pippin Barr
// 20 August 2018
//
// Uses p5's set of shape and colour functions to draw a head
// wearing a hat that Pippin claims is spiritually just like him.


// setup()
//
// Draws a beautiful face on the canvas and puts a hat on it!

function setup() {

  // Set up the canvas and give it a nice pink colour

  createCanvas(500,500);
  background(255,220,220);

  // Draw the head and body (or is it a chin?) in pink as well

  // No stroke because shapes look nicer without it I think
  noStroke();
  // Set the nice pink
  fill(255, 204, 102);
  // The ellipse mode will make it easier to align everything
  ellipseMode(CENTER);
  // Draw the head
  ellipse(250,250,200,200);
  // Draw the body
  ellipse(250,400,260,400);

  // Draw the googly eyes
  noFill();
  stroke(0);
  strokeWeight(3);
  ellipse(200,225,80,80);
  ellipse(300,225,80,80);
  // Draw the white backgrounds of the eyes
  noStroke();
  fill(255);
  ellipse(200,225,50,50);
  ellipse(300,225,50,50);

  // Draw the black pupils
  fill(0);
  ellipse(200,225,20,20);
  ellipse(300,225,20,20);

  // Draw the nose

  // Nose colour
  fill(255, 179, 26);
  // Main nose part
  ellipse(250,250,40,100);
  // The two nostril areas
  ellipse(235,275,40,50);
  ellipse(265,275,40,50);

  // Draw the mouth our of an ellipse and a dividing line

  // Lip colour
  fill(255,150,150);
  // Lips
  ellipse(250,320,80,25);
  // Lip divider colour and size
  stroke(255,100,120);
  strokeWeight(4);
  // Lip divider
  line(210,320,290,320);

  // Draw the hat as a main part, brim, and hat band

noStroke();
  // Hat colour
fill(0);
  // Hat brim
rect(115,160,270,11);
  // Main part of hat
rect();
rect(115,160,40,80);
rect(345,160,40,80);

fill(255,0,0);
rect(105,180,10,40);
rect(385,180,10,40);
  // Band colour
//  fill(100,100,100);
  // Hat band
//  rect(160,165,180,10);


}

// draw()
//
// Does nothing.

function draw() {
  // Nothing here for now.
}
