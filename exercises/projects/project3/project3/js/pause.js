//The Pause Button.
//The main role of the pause button is to
//protect its buddy, the Play button from the menacing Mutes.
//This character can be controlled by a 2nd player, or at the same time
//as the main player.
//Controls are simply your mouse cursor movement.

class Pause {
  constructor (x, y, pauseImg, radius) {

    this.x = x;
    this.y = y;
    this.pauseImg = pauseImg;
    this.radius = radius;

  }

move(){
  this.x = mouseX;
  this.y = mouseY;
}

  //display our pause button
  display() {
    push();
    noStroke();
    image(this.pauseImg, this.x, this.y, 50, 50);

    pop();
  }



handleEating(enemy) {

  // Calculate distance from this predator to the prey
  let d = dist(this.x, this.y, enemy.x, enemy.y);
  // Check if the distance is less than their two radii (an overlap)
  if (d < (this.radius + enemy.radius)) {
    //if collided, erase, and reset prey position
    enemy.reset();
    console.log(enemy.trigger);
  }



}

}
