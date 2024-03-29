// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.

//score counter; will trigger victory screen when a score is met
let eaten = 0;

class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, radius, upKey, downKey, leftKey, rightKey, predatorImg, shiftKey) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    this.oSpeed = speed;
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 0.1;
    this.healthGainPerEat = 1;
    // Display properties
    this.radius = this.health; // Radius is defined in terms of health
    this.predatorImg = predatorImg; // our predator avatar
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    this.leftKey = leftKey;
    this.rightKey = rightKey;

    //sprint function
    this.shiftKey = shiftKey;


  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {
    // Horizontal movement
    if (keyIsDown(this.leftKey)) {
      this.vx = -this.speed;
    }
    else if (keyIsDown(this.rightKey)) {
      this.vx = this.speed;
    }
    else {
      this.vx = 0;
    }
    // Vertical movement
    if (keyIsDown(this.upKey)) {
      this.vy = -this.speed;
    }
    else if (keyIsDown(this.downKey)) {
      this.vy = this.speed;
    }
    else {
      this.vy = 0;
    }
    //sprint feature
    if (keyIsDown(this.shiftKey)) {
      this.speed = this.speed + 0.2;
      this.speed = constrain(this.speed, this.oSpeed, this.oSpeed+11);
    }
    else {
      this.speed = this.oSpeed;
    }

  }

  // move
  //
  // Updates the position according to velocity
  // Lowers health (as a cost of living)
  // Handles wrapping
  move() {
    // Update position
    this.x += this.vx;
    this.y += this.vy;
    // Update health
    this.health = this.health - this.healthLossPerMove;
    this.health = constrain(this.health, 3, this.maxHealth);

    //controller to detect whether or not our pre are dead or alive
    if (this.health === 3) {
      this.lost = true;
    }

    else if (this.health > 3) {
      this.lost = false;
    }
    // Handle wrapping
    this.handleWrapping();
  }

  // handleWrapping
  //
  // Checks if the predator has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // handleEating
  //
  // Takes a Prey object as an argument and checks if the predator
  // overlaps it. If so, reduces the prey's health and increases
  // the predator's. If the prey dies, it gets reset.


  handleEating(prey) {
    // Calculate distance from this predator to the prey
    let d = dist(this.x, this.y, prey.x, prey.y);
    // Check if the distance is less than their two radii (an overlap)
    if (d < this.radius + prey.radius) {
      // Increase predator health and constrain it to its possible range
      this.health += prey.healthGainPerEat; // changed this.healthGainPerEat to prey.healthGainPerEat since we want health to drain whenever the player gets near moss
      this.health = constrain(this.health, 3, this.maxHealth);
      // Decrease prey health by the same amount
      prey.health -= this.healthGainPerEat;

      // Check if the prey died and reset it if so
      if (prey.health < 3) {
        eaten = eaten + 1;
        console.log("eaten!");
        prey.reset();

        bite.currentTime = 0;
        bite.play();
      }
    }
  }


  // display
  //
  // Draw the predator as an ellipse on the canvas
  // with a radius the same size as its current health.
  display() {
    push();
    noStroke();
    this.radius = this.health;
    image(this.predatorImg, this.x, this.y, 100, 100);
    fill(255, 0, 0);
    rect(this.x,this.y-20,this.health,8);
    pop();
  }
}
