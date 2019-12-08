// Predator
//
// A class that represents a simple predator
// controlled by the arrow keys. It can move around
// the screen and consume Prey objects to maintain its health.


class Predator {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, upKey, downKey, predatorImg, shiftKey, radius, drums) {
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
    this.health = 700; // Must be AFTER defining this.maxHealth
    this.healthLossPerMove = 1.3;
    // Display properties
    this.predatorImg = predatorImg;
    // Input properties
    this.upKey = upKey;
    this.downKey = downKey;
    //instruments
    this.drums = drums;
    //sprint function
    this.shiftKey = shiftKey;
  }

  // handleInput
  //
  // Checks if an arrow key is pressed and sets the predator's
  // velocity appropriately.
  handleInput() {

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
      this.speed = this.speed + 0.8;
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
    this.health = constrain(this.health, 0, 700);
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
    if (d < this.maxHealth + prey.radius) {
      //if collided, erase, and reset prey position
      prey.trigger = false;

      this.health += 60;
      console.log(prey.trigger);

      // Check if the prey died and reset it, also plays a simple snare beat when eaten
      if (prey.trigger === false ) {

        //Each intrument is tied to a number. Each time you strike a note, a random number will generate, and every number is tied to an instrument.
        if(prey.soundChoice ===1){
          console.log("note 1")
            prey.noteSound.play( 55, 1/4 );
        }
        if(prey.soundChoice ===2){
          console.log("note 2")
            prey.noteSound.play( "o" );
        }
        if (prey.soundChoice ===3) {
            prey.noteSound.play(Rndf(1500, 5000), 1/16);
          console.log("note3");
        }
        if (prey.soundChoice ===4) {
            prey.noteSound.play(Rndi(1000, 11025), 1/8);
          console.log("note4");
        }
        prey.reset();
      //  this.drums.play("o");
        background(255);
        console.log("Eaten!");


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
    image(this.predatorImg, this.x, this.y, 70, 70);

    pop();
  }
}
