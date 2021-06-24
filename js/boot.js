const debugDraw = false;
const BIGROCK = 56;
const infoY = 20;
var NumAsteroids = 4;
var gameOverText;
var gameOver = false;
var shipDestroyed = false;
let bullets=[];
let enemyBullets=[];
let asteroids=[];
let particles = [];
let enemies = [];
let ship = {};
let score = 0;
let lives = 3;
let highScore;
let level = 1;
let reSpawnTime = 100;
let localStorageName = "Maxteroids";
var gameStart = false;
var gameRestart = false;
var introTextSize = .01;
var introText;
var introText2;
var spaceKey;
var leftKey;
var rightKey;
var upKey;
var downKey;
var isFiring = false;
var infoText2;
var shapeData;
const introTextString = "Rotate Right - Right Arrow \n" +
"Rotate Left - Left Arrow \n" +
"Thrust - Up Arrow \n" +
"Hyperspace - Down Arrow \n" +
"Fire - Space Bar \n" +
"Press Space Bar to Play";

const gameOverTextString = 'G A M E    O V E R \n\n Press spacebar play again';

// Movement Directions
   var DOWN = 0,
   LEFT = -1,
   RIGHT = 1;

  var graphics;

  