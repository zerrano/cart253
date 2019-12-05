// Beat Saver!
// by Timothy Serrano
//
// Welcome to Pop Stream! The game where you save the lost musical notes!
// The game will consist of Musical notes (prey) that will fly across the screen from right to left
// and it is up to you, the PLAY button (predator) to save them! Colliding with a music note as the play button
// will "consume/save" them while playing the music stored in them as well. Just beware of the red notes that will try to stop you!

// I will be working off of the predator/prey code that we worked on in class for this project.


// Our play button
let play;

// The notes
let note1;
let note2;
let note3;
let note4;

//our predator images

let playImg;
let noteImg;

//welcome screen image
let welcomeImg;

//gibber music
let mainTheme;
let kicker;
let drums;
let follow;
let rhodes;

let soundPlaying = false;
let soundPlaying2 = false;
let soundPlaying3 = false;

let point = 0;
//what screen the game will start on when first opened on a browser
let state = "WELCOME";
// setup()
//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);

  //Unused Instruments
  //Pluck().play( Rndi(100,1000), 1/8 )
  //Mono('easyfx')
  //.note.seq( Rndi(0,12), [1/4,1/8,1/2,1,2].rnd( 1/8,4 ) )
  //Mono('bass').note.seq( [0,7], 1/8 )
  //FM().play( Rndi(100,1000), 1/4 )
  //Pluck().play( Rndi(100,1000), 1/4 )
  //Tom().play( Rndf(50, 300), 1/8 )
  //Cowbell().play( Rndf(1500, 14100), 1/2 )
  //clave/knee slapper instrument
  //mainTheme = Clave().play( Rndf(1500, 5000), 1/16 );
  //kicker
  //kicker = Kick().play( 55, 1/4 );
  //kicker = Kick();
  //synth chords

  Hat().play(Rndi(1000, 11025), 1 / 8)

  FM('bass')
    .note.seq([0, 0, 0, 7, 14, 13].rnd(), [1 / 8, 1 / 16].rnd(1 / 16, 2))

  rhodes = Synth('rhodes', {
      amp: .45
    })
    .chord.seq(Rndi(0, 6, 3), 1)
    .fx.add(Delay())

  drums = EDrums('x*o*x*o-');
  follow = Follow(drums);
  play = new Predator(100, 100, 5, UP_ARROW, DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, playImg, SHIFT, 40, drums);
  note1 = new Prey(random(800, 1000), random(0, 100), noteImg, 80, 1);
  note2 = new Prey(random(800, 1000), random(0, 100), noteImg, 80, 2);
  note3 = new Prey(random(800, 1000), random(0, 100), noteImg, 80, 3);
  note4 = new Prey(random(800, 1000), random(0, 100), noteImg, 80, 4);
}

function preload() {
  playImg = loadImage("assets/images/play.png");
  noteImg = loadImage("assets/images/note.png");
  welcomeImg = loadImage("assets/images/welcome.png");
  gameOverImg = loadImage("assets/images/gameover.jpg");
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

  if (state === "GAMEOVER")
    gameOver(); //loads in defeat screen

}
//Our switch controller for starting the game from left mouse clicking on the greeting screen
function mousePressed() {
  if (state === "WELCOME") {
    // If we were on the title we need to switch to instructions
    state = "GAME";
  } else if (state === "GAME") {
    // If we were on the instructions we need to switch to the game itself
    state = "GAME";
  }
}

//boolean for our Click to Start button
let start = 0;
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
  fill(255);
  textSize(20);
  text("You are the all-mighty play button. You are on a mission to save all lost music notes!", width / 2 - 350, 600);
  text("Everytime you strike a note, you consume it, and release the music trapped inside.", width / 2 - 350, 620);
  text("Press SHIFT to speed up. String together a musical masterpiece! **THERE IS SOUND**", width / 2 - 370, 640);
}

function gameOver() {
  background(245, 90, 66);
  text("GAME OVER!!", windowWidth/2, windowHeight/2);
}

function mainGame() {
  // Clear the background to black
  background(follow.getValue() * 255, 0, 0);

  //This will act as the player's healthbar
  rect(0,30,play.health,10);

  if (play.health === 0) {
    state = "GAMEOVER"
  }

  // Handle input for the tiger
  play.handleInput();

  // Move all the "animals"
  play.move();
  note1.move();
  note2.move();
  note3.move();
  note4.move();

  // Handle the tiger eating any of the prey
  play.handleEating(note1);
  play.handleEating(note2);
  play.handleEating(note3);
  play.handleEating(note4);

  // Display all the "animals"
  play.display();
  note1.display();
  note2.display();
  note3.display();
  note4.display();

  //point system
  text("You saved "+ point+ " notes!", windowWidth/2, 50);

  console.log(point);

  if (note1.health <= 10) {
    point = point + 1;
    console.log("note1 score!");
  }

  if (note2.health <= 10){
     point = point +1;
     console.log("note2 score!");
   }

   if(note3.health <= 10 ){
     point = point +1;
     console.log("note3 score!");
   }

   if(note4.health <= 10){
     point = point +1;
     console.log("note4 score!");
   }
  //If you score more than 20 points, throw in a new beat
  if (point >= 20 && soundPlaying === false) {
    soundPlaying = true;
    console.log("in side");
    Mono('bass').note.seq([0, 7], 1 / 8)
  }

  //if you score more than 40 points, throw in ANOTHER beat
  if (point >= 40 && soundPlaying2 === false) {
    soundPlaying2 = true;
    console.log("in side");
    Pluck().play( Rndi(100,1000), 1/4 )
  }

  //if you score more than 60 points, throw in ANOTHER beat
  if (point >= 60 && soundPlaying3 === false) {
    soundPlaying3 = true;
    console.log("in side");
    Mono('easyfx')
    .note.seq( Rndi(0,12), [1/4,1/8,1/2,1,2].rnd( 1/8,4 ) )
  }

}
