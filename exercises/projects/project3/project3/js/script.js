// Beat Saver!
// by Timothy Serrano
//
// Welcome to Pop Stream! The game where you save the lost musical notes!
// The game will consist of Musical notes (prey) that will fly across the screen from right to left
// and it is up to you, the PLAY button (predator) to save them! Colliding with a music note as the play button
// will "consume/save" them while playing the music stored in them as well. Just beware of the red notes that will try to stop you!

// I will be working off of the predator/prey code that we worked on in class for this project.


// Our play/pause button
let play;
let pause;
let pauseImg;

// The notes
let note1;
let note2;
let note3;
let note4;

//our predator images

let playImg;
let noteImg;

//our enemy image
let enemyImg;

//welcome/instructions/victory/gameover screen image
let welcomeImg;
let gameOverImg;
let victoryImg;
let instructionsImg;

//gibber music
let mainTheme;
let kicker;
let drums;
let follow;
let rhodes;

//milestone music players
let soundPlaying = false;
let soundPlaying2 = false;
let soundPlaying3 = false;

//notes array
let notes = [];
let mute = [];

//boolean for our Click to Start button
let start = 0;
let point = 0;
//what screen the game will start on when first opened on a browser
let state = "WELCOME";

// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);

  //Instruments from the gibber library

  //Percussion beat
  Hat().play(Rndi(1000, 11025), 1 / 8)

  //High pitched bass beats
  FM('bass')
    .note.seq([0, 0, 0, 7, 14, 13].rnd(), [1 / 8, 1 / 16].rnd(1 / 16, 2))

  //Synth beats
  Synth('rhodes', {
      amp: .45
    })

  //Extended chords
  .chord.seq(Rndi(0, 6, 3), 1)
  .fx.add(Delay())

  //Drums
  drums = EDrums('x*o*x*o-');

  //Tracker to get value from drum beats, and change background accordingly
  follow = Follow(drums);

  //Player
  play = new Predator(50, 50, 12, UP_ARROW, DOWN_ARROW, playImg, SHIFT, 30, drums);
  pause = new Pause (mouseX, mouseY, pauseImg, 30);
  //our enemy array
  mute[0] = new Enemy(random(900, 1000), random(0, 100), enemyImg, true);
  mute[1] = new Enemy(random(900, 1000), random(0, 100), enemyImg, true);
  mute[2] = new Enemy(random(900, 1000), random(0, 100), enemyImg, true);
  //our notes array
  notes[0] = new Prey(random(800, 1000), random(0, 100), noteImg, true, 1);
  notes[1] = new Prey(random(800, 1000), random(0, 100), noteImg, true, 2);
  notes[2] = new Prey(random(800, 1000), random(0, 100), noteImg, true, 3);
  notes[3] = new Prey(random(800, 1000), random(0, 100), noteImg, true, 4);
}

//Preloading all of our image/sound assets
function preload() {
  //images
  playImg = loadImage("assets/images/play.png");
  noteImg = loadImage("assets/images/note.png");
  welcomeImg = loadImage("assets/images/welcome.png");
  instructionsImg = loadImage("assets/images/instructions.png");
  gameOverImg = loadImage("assets/images/gameover.jpg");
  victoryImg = loadImage("assets/images/victory.jpg");
  enemyImg = loadImage("assets/images/mute.png");
  pauseImg = loadImage ("assets/images/pause.png")

}
// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {

  if (state === "WELCOME") {
    welcomePage(); //shows our welcome screen
  } else if (state === "GAME") {
    mainGame(); //loads in the main game once left mouse click
  }

  if (state === "INSTRUCTIONS"){
    instructions();//loads in the instructions page
  }

  if (state === "GAMEOVER") {
    gameOver(); //loads in defeat screen
  }

  if (state === "VICTORY") {
    victory(); //loads in the victory screen
  }
}
//Our switch controller for starting the game from left mouse clicking on the greeting screen
function mousePressed() {
  if (state === "WELCOME") {
    // If we were on the title we need to switch to instructions
    state = "INSTRUCTIONS";
  } else if (state === "INSTRUCTIONS") {
    // If we were on the instructions we need to switch to the game itself
    state = "GAME";
  }


}

function instructions () {

  background(instructionsImg);

  image(playImg, windowWidth/2-250, 200, 90, 90);
  image(pauseImg, windowWidth - 250, 200, 90, 90);
  fill(255);
  textSize(20);
  text("THERE IS SOUND. PLEASE WEAR HEADPHONES OR EARPLUGS. Might be loud!", width / 2 - 350, windowHeight/2);
  text("You are the Play button and Pause button. You're both on a mission to save up to 60 notes!", width / 2 - 350, windowHeight/2 + 50);
  text("Everytime you strike a note, you consume it, and release the music trapped inside.", width / 2 - 350, windowHeight/2 + 80);
  text("The job of the Pause button is to protect the Play button from the evil Mutes by touching them!", width / 2 - 350, windowHeight/2 + 110);
  text("Press SHIFT to speed up Play. Move Play with the UP Arrow and DOWN Arrow!", width / 2 - 310, windowHeight/2 + 140);
  text("Beware of the dreaded MUTE buttons! They are out to kill Play!", width / 2 - 300, windowHeight/2 + 170);
  text("The more notes you save, the more background music gets added in!", width / 2 - 300, windowHeight/2 + 200);
  text("Control the Pause button with mouse controls.", width / 2 - 200, windowHeight/2 + 230);
}

//our greeting screen
function welcomePage() {
  background(welcomeImg);

  //simple boolean to make our Click to Play button, blink
  start = start + 1;

  if (start % 10 === 0) {
    fill(255);
    textSize(40);
    text("Click to Start!", width / 2 - 100, 400);
  } else {
    fill(0, 0, 255);
    textSize(40);
    text("Click to Start!", width / 2 - 100, 400);
  }
}

//game over screen when player runs out of health
function gameOver() {
  background(gameOverImg);
}


//victory screen for when the player reaches 60 points
function victory() {
  background(victoryImg);
}


//Where all the magic happens
function mainGame() {
  //background color will pulse according to the values coming from our EDrums
  background(follow.getValue() * 255, 0, 0);

  //This will act as the player's healthbar
  rect(5, windowHeight -50, play.health, 30);

  //On screen instructions
  fill(255);
  textSize(30);
  text("↑", 10, 50);
  text ("↓", 10, 600);
  //Lose conditions
  if (play.health === 0) {
    state = "GAMEOVER";
  }

  // Handle input for the player
  play.handleInput();

  // Move all the notes
  play.move();
  pause.move();

  //array for the notes
  for (let i = 0; i < notes.length; i++) {
    notes[i].move();
    play.handleEating(notes[i]);
    notes[i].display();
  }

  // Handle the tiger eating any of the prey


  // Display all the players
  play.display();
  pause.display();


  //point system
  textSize(20);
  text("You saved " + point + " notes!", windowWidth / 2, 50);

  console.log("POINTS:: " + point);

  if (play.x >= mute.x) {
    state = "GAMEOVER";
  }

  //if the player hits points, spawn in the mute buttons
  if (point >= 10) {
    for (let i = 0; i < mute.length; i++) {
      mute[i].move();
      play.handleEating(mute[i]);
      pause.handleEating(mute[i]);
      mute[i].display();
    }
  }

  if (point >= 40) {
    for (let i = 0; i < mute.length; i++) {
      mute[i].move();
      play.handleEating(mute[i]);
      pause.handleEating(mute[i]);
      mute[i].display();
    }
  }

  //If you score more than 15 points, throw in a new beat
  if (point >= 15 && soundPlaying === false) {
    soundPlaying = true;
    console.log("remix2!");

    Mono('bass').note.seq([0, 7], 1 / 8)

  }

  //if you score more than 35 points, throw in ANOTHER beat
  if (point >= 35 && soundPlaying2 === false) {
    soundPlaying2 = true;
    console.log("remix3!");
    Pluck().play(Rndi(100, 1000), 1 / 4)

  }

  //if you score more than 50 points, throw in ANOTHER beat
  if (point >= 50 && soundPlaying3 === false) {
    soundPlaying3 = true;
    console.log("remix4!");
    Mono('easyfx')
      .note.seq(Rndi(0, 12), [1 / 4, 1 / 8, 1 / 2, 1, 2].rnd(1 / 8, 4))


  }

  if (point >= 60) {
    state = "VICTORY"
  }

}
