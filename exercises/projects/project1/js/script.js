"use strict";

/******************************************************

Game - Chaser
Pippin Barr

A "simple" game of cat and mouse. The player is a circle and can move with keys,
if they overlap the (randomly moving) prey they "eat it" by sucking out its life
and adding it to their own. The player "dies" slowly over time so they have to keep
eating to stay alive.

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 25;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 200;

// Prey position, size, velocity
let preyX;
let preyY;
let preyRadius = 25;
let preyVX;
let preyVY;
let preyMaxSpeed = 5;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 0;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

//noise values
let noiseX = 0;
let noiseY = 0;

//added instructions on the game rules!
let instructions = "Press shift to sprint! CAREFUL, you will die faster, and bacteria will shrink when sprinting! ";
let instructions2 = "Eat up all that GREEN bacteria, before they kill your host!";

let bigText = 32;

//sound effects and switch for when you eat bacteria
let splat;
let eat = false;

//background music on loop, RETRO!
let pacman;

//variable holding our background
let bgImg;
// setup()
//

function preload() {
  //background music
  pacman = loadSound("assets/sounds/pacman.wav");

}
// Sets up the basic elements of the game
function setup() {
  createCanvas(500, 500);
  //adding a background
  bgImg=loadImage("assets/images/background.jpg");
  //preloading sound
  splat = loadSound("assets/sounds/splat.mp3");
  noStroke();
  pacman.loop();
  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}



// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
  image(bgImg, 0, 0)
  text(instructions, 10, 470);
  text(instructions2, 100, 490);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
}


// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }

  //added a sprint functionality whenever SHIFT is pressed, max speed value is constraint to a value of 4
  if (keyIsDown(SHIFT)) {
    playerMaxSpeed = playerMaxSpeed+0.05;
    playerMaxSpeed = constrain(playerMaxSpeed, 2, 4)
  }
  else {
    playerMaxSpeed = 2;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health

  //added increased health decay during sprint, made the penalty threshhold to a minimum boosted speed of 2.8, so that theres atleast some kind of advantage to sprinting
  if (playerMaxSpeed > 2.8) {
    playerHealth = playerHealth - 0.9;
  }

  playerHealth = playerHealth - 0.5;
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);



  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}


// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap

  splat.stop();
  if (d < playerRadius + preyRadius) {

    //adding an on switch for our noise
    splat.play();
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);
    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      preyX = random(0, width);
      preyY = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    }
  }
}

// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames
  if (random() < 0.05) {
    // Set velocity based on random values to get a new direction
    // and speed of movement
    //
    // Use map() to convert from the 0-1 range of the random() function
    // to the appropriate range of velocities for the prey

    //rearranged random, to use noise instead
    preyVX = map(noise(noiseX), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    preyVY = map(noise(noiseY), 0, 1, -preyMaxSpeed, preyMaxSpeed);
    noiseX = noiseX + 2;
    noiseY = noiseY + 3;
  }

  // Update prey position based on velocity

  //added a noise multiplier
  preyX = noise(noiseX)+preyX + noise(noiseX)+preyVX;
  preyY = noise(noiseY)+preyY + noise(noiseY)+preyVY;

  noiseX = noiseX + 0.05;
  noiseY = noiseY + 0.05;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}



// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  fill(preyFill,preyFill+200, preyHealth);
  ellipse(preyX, preyY, preyRadius * 2);
  ellipse (preyX, preyY, preyRadius * 2.5);

//added in a new rule where if you sprint, the enemy will shrink! The enemy will go back to normal size the moment you let go of sprint
  if (playerMaxSpeed > 2) {
    preyRadius = preyRadius-0.05;
    preyRadius = constrain(preyRadius, 8, preyRadius);
  }

  else if (playerMaxSpeed = 2){
    preyRadius = preyRadius+0.05;
    preyRadius = constrain(preyRadius, 25, 25);
  }
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  fill(playerFill, playerHealth);
  ellipse(playerX, playerY, playerRadius * 2);
  ellipse(playerX, playerY, playerRadius * 2.5);

}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  // Set up the font

  //made the text grow obnoxiously big, to remind you that you, have failed.
  bigText = bigText + 0.1;
  textSize(bigText);
  textAlign(CENTER, CENTER);
  fill(random(0, 255));
  // Set up the text to display
  let gameOverText = "GAME OVER\n"; // \n means "new line"
  gameOverText = gameOverText + "You ate " + preyEaten + " bacteria\n";
  gameOverText = gameOverText + "before your host died."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);

  //makes the instructions dissapear during the game over screen
  fill(232, 86, 72, 0);
  text(instructions, 70, 600);
}
