const debugDraw = true;
// var MAXENEMIES = 100;
// var MAXROCKS = 100;
// var BIGROCK = 50;
// var SMALLROCK = 20;
const BIGROCK = 56;
// var NumRocks = 5;
// var NumParticles = 5;
// var ShipExplodeCount = 100;
// var NumEnemies = 5;
// var ShipSize = 30;
const infoY = 20;
var NumAsteroids = 4;
var gameOverText;
var gameOver = false;
let bullets=[];
let asteroids=[];
let particles = [];
let score = 0;
let lives = 3;
let highScore;
let localStorageName = "Maxteroids";
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
var shapeData;
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

  