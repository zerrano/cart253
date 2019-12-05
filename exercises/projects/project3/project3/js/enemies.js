// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Enemy {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, enemyImg, trigger) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    // Time properties for noise() function
    this.tx = 5; // To make x and y noise different
    this.ty = 0; // we use random starting values
    // Health properties
    this.trigger =true;
    // this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.enemyImg = enemyImg;
    this.radius = 70;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity via noise()
    this.vx = constrain(this.tx, 0, 5.1);
    this.vy = constrain(this.ty, 0, 0);
    // Update position
    this.x -= this.vx;
    this.y += this.vy;
    // Update time properties
    this.tx += 0.05;
    this.ty += 0.01;
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the prey has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
      this.reset();
    }
    else if (this.x > width) {
      this.x -= width;
    }
  }

  // display
  //
  // Draw the prey as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    // this.health = true;
    image(this.enemyImg, this.x, this.y, 70, 70);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    if(this.trigger ===false){
        point = point + 1;

    }

    // Random position
    this.x = random(800, 1000);
    this.y = random(0, height);
    // Default health
     this.trigger = true;
    // Default radius
    this.radius = 70;
  }
}
