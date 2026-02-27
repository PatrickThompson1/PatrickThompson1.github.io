/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  
  // Game Item Objects


  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  const KEY = {
  ENTER: 13,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};
  var walker = {
    x: 0,
    y: 0,
    speedX: 0,
    speedY: 0
  };
  
  $(document).on("keydown", handleKeyDown);                          
  $(document).on("keyup", handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
   repositionGameItem();
   redrawGameItem();
   wallCollision();
  }
  
  function handleKeyDown(event) {
    console.log(event.which);
   if (event.which === 37) {          
    walker.speedX = -5;
  }

  if (event.which === 39) {          
    walker.speedX = 5;
  }

  if (event.which === 38) {          
    walker.speedY = -5;
  }

  if (event.which === 40) {          
    walker.speedY = 5;
  }

  function handleKeyUp(event) {
    if (event.which === 37 || event.which === 39) {
    walker.speedX = 0;
  }

  if (event.which === 38 || event.which === 40) {
    walker.speedY = 0;
  }
}
 }
   
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }

  function repositionGameItem() {
  walker.x = walker.x + walker.speedX;
  walker.y = walker.y + walker.speedY;
}
  
  function redrawGameItem() {
  $("#walker").css("left", walker.x + "px");
  $("#walker").css("top", walker.y + "px");
console.log("Walker position:", walker.x, walker.y);
}


  function wallCollision() {
  var boardWidth = $("#board").width();
  var boardHeight = $("#board").height();

  
  if (walker.x < 0) {
    walker.x = walker.x - walker.speedX;
  }

  
  if (walker.x > boardWidth - $("#walker").width()) {
    walker.x = walker.x - walker.speedX;
  }

  if (walker.y < 0) {
    walker.y = walker.y - walker.speedY;
  }

  
  if (walker.y > boardHeight - $("#walker").height()) {
    walker.y = walker.y - walker.speedY;
  }
}
}

