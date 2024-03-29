// Surviving in the Wild!
// by Timothy Serrano
//
// Creates 2 predators that two seperate players control. Chase and east all the other animals!
// The tiger chases the prey using the arrow keys and consumes them.
// The cat chases the prey using W,A,S,D and consumes them.
// Both predators have a sprint feature. Tiger uses SHIFT, cat uses Q.
// The predators loses health over time, so must keep eating to survive.

// Our predators
let tiger;
let cat;

// The three prey
let antelope;
let zebra;
let bee;

//images
let tigerImg;
let catImg;
let antelopeImg;
let zebraImg;
let beeImg;
let ladyImg;

//backgrounds
let bgImg;
let endImg;
let overImg;
let welcomeImg;
let tigerLose;
let catLose;

//sounds
let bgSound;
let bite;

//ARRAY STUFF
let numPrey = 35;
let prey = [];

//game states

let state = "WELCOME";
// setup()
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  tiger = new Predator(200, 200, 5, 80, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, tigerImg, SHIFT, false);
  cat = new Predator(150, 150, 7, 80, 87, 83, 65, 68, catImg, 81, false);

  //Prey
  antelope = new Prey(100, 100, 10, 200, antelopeImg);
  zebra = new Prey(100, 100, 8, 200, zebraImg);
  bee = new Prey(100, 100, 13, 50, beeImg);

  //moss array
  for (let i = 0; i < numPrey; i++) {
    let preyX = random(0, width);
    let preyY = random(0, height);
    let preyColor = ladyImg;
    let preyRadius = random(40, 60);
    let newPrey = new moss(preyX, preyY, preyColor, preyRadius);
    // Add the new Prey object to the END of our array using push()
    prey.push(newPrey);
  }
}

function preload() {
  tigerImg = loadImage("assets/images/tiger.png");
  catImg = loadImage("assets/images/cat.png");
  antelopeImg = loadImage("assets/images/antelope.png");
  zebraImg = loadImage("assets/images/zebra.png");
  beeImg = loadImage("assets/images/bee.png");
  ladyImg = loadImage("assets/images/lady.png");

  //background
  bgImg = loadImage("assets/images/bg.jpg");

  //welcome screen
  welcomeImg = loadImage("assets/images/welcomebg.png");

  //ending screen
  endImg = loadImage("assets/images/end.jpg");
  tigerLose = loadImage("assets/images/tigerlose.jpg");
  catLose = loadImage("assets/images/catlose.png");

  //loss screen
  overImg = loadImage("assets/images/lose.png");

  //background music
  bgSound = new Audio("assets/sounds/bg.mp3");
  //eating sound
  bite = new Audio("assets/sounds/bite.mp3")

  //bgSound.currentTime = 0;
  //bgSound.play();
}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (state === "WELCOME"){
    welcomePage(); //shows our welcome screen
  }

  else if (state === "GAME"){
    mainGame(); //loads in the main game once left mouse click
  }

  if (state === "END"){
    endPage();//will bring up the victory screen once all prey are eaten
  }

  if (state === "TIGERLOSE"){
    tigerLoss();//enables the loss screen for the tiger dying
  }

  if (state === "CATLOSE"){
    catLoss();//enables the loss screen for if the cat dies first
  }
}

//MAIN GAME STATE SWITCH - The controller that controls what state the current game is in, between the welcome screen and the main game
function mousePressed() {
  if (state === "WELCOME") {
    // If we were on the title we need to switch to instructions
    state = "GAME";
  }
  else if (state === "GAME") {
    // If we were on the instructions we need to switch to the game itself
    state = "GAME";
  }


}


//THE ENTIRE MAIN GAME - Game state switches over from welcome screen to here when left mouse is clicked
function mainGame() {
  background(bgImg);

  textSize(25);
  fill(255, 0, 0);
  text ("How many prey you've eaten: " + eaten, windowWidth/2-150, 30);


//controller to allow our tiger and cat to interract with our arracy objects
for (let i = 0; i < prey.length; i++) {
  // Again, we refer to prey[i] to get the current Prey object as we
  // count through the array one by one
  tiger.handleEating(prey[i]);
  cat.handleEating(prey[i]);

}
  // Handle input for the predators
  tiger.handleInput();
  cat.handleInput();

  // Move all the "animals"
  tiger.move();
  cat.move();
  antelope.move();
  zebra.move();
  bee.move();

  // Handle the predators eating any of the prey
  tiger.handleEating(antelope);
  tiger.handleEating(zebra);
  tiger.handleEating(bee);

  cat.handleEating(antelope);
  cat.handleEating(zebra);
  cat.handleEating(bee);

  // Display all the "animals"
  tiger.display();
  cat.display();
  antelope.display();
  zebra.display();
  bee.display();

  //we need to tell each moss that gets produced, to actually show itself
  for (let i = 0; i < prey.length; i++) {
    // And again we ask prey[i] to display itself because i gives us the current
    // element we are counting through in the loop
    prey[i].display();
  }

  //win conditions
  if (eaten >= 10) {
    state = "END";
  }

  //lose conditions, will differ based on who dies out first

  if (tiger.health <= 3) {
    state = "TIGERLOSE";

  }

  if (cat.health <= 3) {
    state = "CATLOSE";

  }
}

// Our welcome page with instructions on how to play the game! Left mojuse click to switch states into the main game
function welcomePage() {
  background (welcomeImg);


}

function endPage() {
  background(endImg);
  fill(255);
  textSize(20);
  text("You have eaten them all!", windowWidth/2, windowHeight-30);

}

function tigerLoss(){
  background(tigerLose);

}

function catLoss(){
  background(catLose);

}
