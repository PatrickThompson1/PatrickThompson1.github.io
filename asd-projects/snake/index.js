/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// Game Variables
var score = 0;
var started = false;
var colors = ["red", "orange", "yellow", "green", "blue", "purple"];
var currentColorIndex = 0;
var colorChangeInterval = 5;
var colorChangeCounter = 0;
var scoreSinceLastColorChange = 0;
var isReversed = false;
// Apple & Snake
var apple = {};
const snake = {};

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;

var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

var updateInterval;
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

$("body").on("keydown", handleKeyDown);
init();

function init() {
  board.empty();
  clearInterval(updateInterval);

  snake.body = [];
  snake.direction = "right";

  makeSnakeSquare(10, 10);
  makeSnakeSquare(10, 9);
  makeSnakeSquare(10, 8);

  snake.head = snake.body[0];
  snake.tail = snake.body[snake.body.length - 1];
  snake.head.direction = "right";

  makeApple();

  score = 0;
  scoreElement.text("Score: " + score);
  started = false;

  updateInterval = setInterval(update, 100);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function update() {
  if (!started) return;

  moveSnake();

  if (hasHitWall() || hasCollidedWithSnake()) {
    endGame();
    return;
  }

  if (hasCollidedWithApple()) {
    handleAppleCollision();
  }
}

function checkForNewDirection() {
  if (!activeKey) return;

  var current = snake.head.direction;

  if (activeKey === KEY.LEFT && current !== "right") snake.head.direction = "left";
  if (activeKey === KEY.RIGHT && current !== "left") snake.head.direction = "right";
  if (activeKey === KEY.UP && current !== "down") snake.head.direction = "up";
  if (activeKey === KEY.DOWN && current !== "up") snake.head.direction = "down";
}

function moveSnake() {
  for (var i = snake.body.length - 1; i > 0; i--) {
    moveBodyAToBodyB(snake.body[i], snake.body[i - 1]);
    repositionSquare(snake.body[i]);
  }

  checkForNewDirection();

  if (snake.head.direction === "left") snake.head.column--;
  if (snake.head.direction === "right") snake.head.column++;
  if (snake.head.direction === "up") snake.head.row--;
  if (snake.head.direction === "down") snake.head.row++;

  repositionSquare(snake.head);
}

function moveBodyAToBodyB(bodyA, bodyB) {
  bodyA.row = bodyB.row;
  bodyA.column = bodyB.column;
  bodyA.direction = bodyB.direction;
}

function hasHitWall() {
  return (
    snake.head.row < 0 ||
    snake.head.row >= ROWS ||
    snake.head.column < 0 ||
    snake.head.column >= COLUMNS
  );
}

function hasCollidedWithApple() {
  return (
    snake.head.row === apple.row &&
    snake.head.column === apple.column
  );
}

function handleAppleCollision() {
  score++;
  scoreElement.text("Score: " + score);

  apple.element.remove();
  makeApple();

  makeSnakeSquare(snake.tail.row, snake.tail.column);
}

function hasCollidedWithSnake() {
  for (var i = 1; i < snake.body.length; i++) {
    if (
      snake.head.row === snake.body[i].row &&
      snake.head.column === snake.body[i].column
    ) {
      return true;
    }
  }
  return false;
}

function endGame() {
  clearInterval(updateInterval);
  started = false;

  board.empty();

  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  setTimeout(init, 500);
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function makeApple() {
  apple.element = $("<div>").addClass("apple").appendTo(board);

  var pos = getRandomAvailablePosition();
  apple.row = pos.row;
  apple.column = pos.column;

  repositionSquare(apple);
}

function makeSnakeSquare(row, column) {
  var snakeSquare = {};

  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);
  snakeSquare.row = row;
  snakeSquare.column = column;
  snakeSquare.direction = snake.direction;

  repositionSquare(snakeSquare);

  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }

  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}

function handleKeyDown(event) {
  activeKey = event.which;

  if (
    event.which === KEY.LEFT ||
    event.which === KEY.RIGHT ||
    event.which === KEY.UP ||
    event.which === KEY.DOWN
  ) {
    started = true;
  }
}

function repositionSquare(square) {
  var buffer = 20;
  square.element.css("left", square.column * SQUARE_SIZE + buffer);
  square.element.css("top", square.row * SQUARE_SIZE + buffer);
}

function getRandomAvailablePosition() {
  var position = {};
  var valid = false;

  while (!valid) {
    position.row = Math.floor(Math.random() * ROWS);
    position.column = Math.floor(Math.random() * COLUMNS);
    valid = true;

    for (var i = 0; i < snake.body.length; i++) {
      if (
        snake.body[i].row === position.row &&
        snake.body[i].column === position.column
      ) {
        valid = false;
        break;
      }
    }
  }

  return position;
}

function calculateHighScore() {
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;
}

