// var MAXENEMIES = 100;
// var MAXROCKS = 100;
// var BIGROCK = 50;
// var SMALLROCK = 20;
// var NumRocks = 5;
// var NumParticles = 5;
// var ShipExplodeCount = 100;
// var NumEnemies = 5;
// var ShipSize = 30;
var gameOverText;
var gameOver = false;
let bullets = [];
let asteroids = [];
let score = 0;
let lives = 3;
let highScore;
let localStorageName = "Maxteroids";
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
// var Enemies = [];
// var Explosion = [];
// var Particles = [];
// var Rocks = [];
// var Bullets = [];
// var EnemyBullets = [];
// var shipLine = [];
// var bulletLine = [];
//  var enemyBulletLine = [];
// var enemyLine = [];
// var ShipsLeft = 5;
// var RockNumStart = 4;
var Level = 1;
var infoText2;
var bulletup = 1;
var ship = {};

var shipShape = [
  { x: 18,  y: 0},
  { x: -18, y: -12},
  { x: -10, y: -8},
  { x: -10, y: 8},
  { x: -18, y: 12},
]

const rockShape = [
  { x: 0,  y: 25},
  { x:  13,  y: 9},
  { x:  22,  y: 12},
  { x:  22,  y: 0},
  { x:  41,  y: 8},
  { x:  50,  y: 27},
  { x:  43,  y: 43},
  { x:  33,  y: 50},
  { x:  13,  y: 44},
  { x:  8,  y: 35},
  { x:  16,  y: 28}
]

const  introTextString = "Rotate Right - Right Arrow \n" +
"Rotate Left - Left Arrow \n" +
"Thrust - Up Arrow \n" +
"Hyperspace - Down Arrow \n" +
"Fire - Space Bar \n" +
"Press Space to Start";



   // Movement Directions
   var DOWN = 0,
   LEFT = -1,
   RIGHT = 1;

  var graphics;

  