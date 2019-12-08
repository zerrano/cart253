// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

//My version of the prey controls the "Music notes".
//They move linearly from right to left, and will spawn in a new
//location when they reach the left side of the canvas.

class Prey {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, preyImg, trigger,soundChoice) {
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
    this.preyImg = preyImg;
    this.radius = 70;
    this.soundChoice = soundChoice;

    //each instrument is attached to a number. Everytime a note is consumed, a random number will generate, and will play the respective instrument
    if(this.soundChoice ==1){
      this.noteSound = Kick();

    }
    if(this.soundChoice ==2){
        this.noteSound = EDrums('x*o*x*o-');
        this.noteSound.stop();
    }
    if (this.soundChoice ==3) {
        this.noteSound = Clave();

    }
    if (this.soundChoice ==4) {
      this.noteSound = Hat();

    }
    //this.noteSound = noteSound;
  }

  // move
  //
  // Sets velocity based on the noise() function and the Prey's speed
  // Moves based on the resulting velocity and handles wrapping
  move() {
    // Set velocity
    this.vx = constrain(this.tx, 0, 6);
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
      this.reset(); //Will spawn in a new Y-Axis lane when they touch
    }               //the left side of the screen.
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
    image(this.preyImg, this.x, this.y, 70, 70);
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
