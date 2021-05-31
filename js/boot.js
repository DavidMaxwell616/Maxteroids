// var MAXENEMIES = 100;
// var MAXROCKS = 100;
// var BIGROCK = 50;
// var SMALLROCK = 20;
// var NumRocks = 5;
// var NumParticles = 5;
// var ShipExplodeCount = 100;
// var NumEnemies = 5;
// var ShipSize = 30;
var NumAsteroids = 4;
var gameOverText;
var gameOver = false;
let bullets=[];
let asteroids=[];
let score = 0;
let lives = 3;
let highScore;
let localStorageName = "Maxteroids";
let bulletIndex = 0;
// var RocksLeft;
// var ShipsLeft;
var gameStart = false;
var introTextSize = .01;
var introText;
var introText2;
var spaceKey;
var leftKey;
var rightKey;
var upKey;
var downKey;
var ship = {};
var isFiring = false;
var Level = 1;
var infoText2;
var bulletup = 1;
var ship = {};
  
var shipShape = [
  { x: 12,  y: 0},
  { x: -13, y: -8},
  { x: -10, y: -6},
  { x: -10, y: 6},
  { x: -13, y: 8},
  { x: 14,  y: 0}
]

const rockShapes=[
  [
  { x: -14,  y: -28},
  { x:  0,  y: -20},
  { x: 14,  y: -28},
  { x:  28,  y: -14},
  { x:  14,  y: -6},
  { x:  28,  y: 7},
  { x:  14,  y: 28},
  { x: -6,  y: 20},
  { x:  -14,  y: 28},
  { x: -28,  y: 14},
  { x: -28,  y: 0},
  { x: -28,  y: -14},
  { x: -14,  y: -28},
 ],
[
  { x:-14, y: -28 },
  {x:7,y:-28},
  {x:28, y: -13},
  {x:28, y: -6},
  {x:7,y: 0},
  {x: 28, y: 15},
  {x:14,y:28},
  {x: 7, y: 22},
  {x: -14, y: 28},
  {x: -28, y: 8},
  {x: -28, y: -13},
  {x: -7, y: -13},
  {x:-14, y: -28 }
],
[
  { x:-14, y: -28 },
  {x:0,y:-14},
  {x:14, y: -28},
  {x:28, y: -14},
  {x:18,y: 0},
  {x: 28, y: 15},
  {x:18,y:28},
  {x: 7, y: 28},
  {x: -28, y: 14},
  {x: -28, y: -14},
  {x:-14, y: -28 }
]
];

const  introTextString = "Rotate Right - Right Arrow \n" +
"Rotate Left - Left Arrow \n" +
"Thrust - Up Arrow \n" +
"Hyperspace - Down Arrow \n" +
"Fire - Space Bar \n" +
"Press Space Bar to Play";

   // Movement Directions
   var DOWN = 0,
   LEFT = -1,
   RIGHT = 1;

  var graphics;

  