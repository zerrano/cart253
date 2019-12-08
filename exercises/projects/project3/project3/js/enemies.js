//The Mute button. The arch nemesis of the play button.
//Touching the mute button means certain death for the player.
//The mute button will only spawn after a set amount of points have been collected by the player.
//Colliding with the mute button will immediately kill the player, so beware.

class Enemy {

  // constructor
  //
  // Sets the initial values for the Mute's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, enemyImg, trigger) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    // Time properties
    this.tx = 5; // To make x and y noise different
    this.ty = 0; // we use random starting values
    // Health properties
    this.trigger = true;
    // this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.enemyImg = enemyImg;
    this.radius = 70;
  }

  // move
  //
  // Sets velocity
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
    } else if (this.x > width) {
      this.x -= width;
    }
  }

  // display
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
    if (this.trigger === false) {
      state = "GAMEOVER";

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
