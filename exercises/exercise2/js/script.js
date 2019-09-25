/******************************************************

Game - The Artful Dodger
Pippin Barr

A simple dodging game with keyboard controls

******************************************************/

// The position and size of our avatar circle
let avatarX;
let avatarY;
let avatarSize = 50;

// The speed and velocity of our avatar circle
let avatarSpeed = 10;
let avatarVX = 0;
let avatarVY = 0;

// The position and size of the enemy circle
let enemyX;
let enemyY;
let enemySize = 70;

// The speed and velocity of our enemy circle
let enemySpeed = 5;
let enemyVX = 5;

//shows total amount of dodges
let dodgesScore;
// How many dodges the player has made
let dodges = 0;

//setting up the message that displays when you get height
let hit = "HIT!";

//player avatar
let student;

//enemy avatar
let books;
//background images
let bgimg;
let bgimg2;
let bgimg3;
//death counter
let counter = 0;

// setup()
//
// Make the canvas, position the avatar and anemy
function setup() {
  // Create our playing area
  createCanvas(800,500);
  imageMode(CENTER);
  bgimg=loadImage("assets/images/background.jpg");
  bgimg2=loadImage("assets/images/background0.jpg");
  bgimg3=loadImage("assets/images/background2.jpeg");
  student=loadImage("assets/images/you.png");
  books=loadImage("assets/images/books.png");
  // Put the avatar in the centre
  avatarX = width/2;
  avatarY = height/2;

  // Put the enemy to the left at a random y coordinate within the canvas
  enemyX = 0;
  enemyY = random(0,height);

  // No stroke so it looks cleaner
  noStroke();
}

// draw()
//
// Handle moving the avatar and enemy and checking for dodges and
// game over situations.
function draw() {
  // A pink background
  image(bgimg2, 400, 250)

  // Default the avatar's velocity to 0 in case no key is pressed this frame
  avatarVX = 0;
  avatarVY = 0;

  // Check which keys are down and set the avatar's velocity based on its
  // speed appropriately

  // Left and right
  if (keyIsDown(LEFT_ARROW)) {
    avatarVX = -avatarSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    avatarVX = avatarSpeed;
  }

  // Up and down (separate if-statements so you can move vertically and
  // horizontally at the same time)
  if (keyIsDown(UP_ARROW)) {
    avatarVY = -avatarSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    avatarVY = avatarSpeed;
  }

  // Move the avatar according to its calculated velocity
  avatarX = avatarX + avatarVX;
  avatarY = avatarY + avatarVY;

  // The enemy always moves at enemySpeed
  enemyVX = enemySpeed;
  // Update the enemy's position based on its velocity
  enemyX = enemyX + enemyVX;

  // Check if the enemy and avatar overlap - if they do the player loses
  // We do this by checking if the distance between the centre of the enemy
  // and the centre of the avatar is less that their combined radii
  if (dist(enemyX,enemyY,avatarX,avatarY) < enemySize/2 + avatarSize/2) {
    // Reset the enemy's position
    enemyX = 0;
    enemyY = random(0,height);
    // Reset the avatar's position
    avatarX = width/2;
    avatarY = height/2;
    // Reset the dodge counter
    dodges = 0;
  }

  // Check if the avatar has gone off the screen (cheating!)
  if (avatarX < 0 || avatarX > width || avatarY < 0 || avatarY > height) {
    // If they went off the screen they lose in the same way as above.
    console.log("YOU LOSE!");
    enemyX = 0;
    enemyY = random(0,height);
    avatarX = width/2;
    avatarY = height/2;
    dodges = 0;
  }

  // Check if the enemy has moved all the way across the screen
  if (enemyX > width) {
    // This means the player dodged so update its dodge statistic
    dodges = dodges + 1;
    // Tell them how many dodges they have made
    console.log(dodges + " DODGES!");
    // Reset the enemy's position to the left at a random height
    enemyX = 0;

    //changed the spawn location of a successful dodge to make it so the enemy will spawn at the avatar's current Y position.... It will ALWAYS go after you!
    enemyY = avatarY;

    //Enemy size will increase according to how many successful dodges there are
    enemySize = 70+dodges*10;

    //enemy speed will multiply according to how many successful dodges there are
    enemySpeed = 5+dodges;
  }

//background will change if dodge score reachs 5..... or more (if you avoid more than 10, you're going to hell)

  if(dodges>=5){
    image(bgimg3, 400,250);
  }

  if(dodges>=10){
    image(bgimg, 400, 250);
  }

//will display total number of dodges when the enemy's speed = 0, aka when it resets (amount of responsibilities avoided)
  if(enemySpeed===0){

      }
   else{dodgesScore="# of responsibilities you have avoided: " + dodges;}
      textSize(15+dodges);
      fill(255); //white font
      text(dodgesScore,20,50);

  // Display the number of successful dodges in the console
  console.log(dodges);

  // The player is a student
  image(student,avatarX,avatarY,avatarSize,avatarSize);

  // The enemy is are books.... responsibilities
  image(books,enemyX,enemyY,enemySize,enemySize);

}
