var gameStart = false;
var cursors;
var MaxRocks = 100;
var BigRock = 500;
var SmallRock = 200;
var NumParticles = 10;
var ShipExplodeCount = 250;
var DebugMode = false;

var Score;
var RocksLeft;
var ShipsLeft;
var BulletsLoose;
var da;
var db;
var Pie;
var bulletup;
var TurnLeft = false;
var TurnRight = false;
var Firing = false;
var ReallyFiring = false;
var RefreshWin = false;
var Radians;
var BaseStart;
var BaseEnd;
var Direction;
var Level;
var NumEnemy;
//Ship
var MainShip;
var Enemy = [];
var Explosion = [];
var Particles = [];
var rocks = [];
var bullet = [];
var NumRocks, RockNumStart;

var Score;
var RocksLeft;
var ShipsLeft;
var BulletsLoose;
var da;
var db;
var Pie;
var bulletup;
var TurnLeft = false;
var TurnRight = false;
var Firing = false;
var ReallyFiring = false;
var RefreshWin = false;
var Radians;
var BaseStart;
var BaseEnd;
var Direction;
var Level;
var NumEnemy;


function Ship() {
  this.Active = true;
  this.Color = 0;
  this.cx = 0;
  this.cy = 0;
  this.exploding = false;
  this.explodeSwitch = false;
  this.explodeCount = 0;
  this.Firing = false;
  this.Forward = false;
  this.OldCX = 0;
  this.OldCY = 0;
  this.x = [];
  this.Y = [];
  this.Speed = 0;
  this.ShieldStrength = 0;
  this.Shields = false;
  this.Size = 0;
  this.xv = 0;
  this.yv = 0;
  this.ParticleX = [];
  this.ParticleY = [];
  this.ParticleXSpeed = [];
  this.ParticleYSpeed = [];
  this.ParticleSize  = [];
  this.ParticleColor = [];
  //Dim ShipParticle(NumParticles) As Particle
  //Dim RockParticle(NumParticles) As Particle
  //Dim EnemyParticle(NumParticles) As Particle
}

function Explosion() {
  this.BlowDirection = 0;
  this.exploding = false;
  this.explodeSwitch = false;
  this.ExplodeCount = 0;
  this.BlowX = [];
  this.BlowY = [];
  this.BlowCenterX = [];
  this.BlowCenterY = [];
  this.BlowVelocityX = [];
  this.BlowVelocityY = [];
  this.Size = 0;
  this.Color = 0;
}

function Particle() {
  this.x = 0;
  this.Y = 0;
  this.xspeed = 0;
  this.yspeed = 0;
  this.Size = 0;
  this.Color = 0;
}
/*
Private Type Rock
Active As Boolean
X As Double
Y As Double
RockDirection As Double
PointX(12) As Integer
PointY(12) As Integer
PointXDist(12) As Integer
PointYDist(12) As Integer
Rotate As Double
Size As Integer
xv As Integer
yv As Integer
Hit As Integer
End Type
Private Type BulletData
Active As Boolean
DistanceMoved As Integer
bulletx As Double
bullety As Double
bulletxv As Double
bulletyv As Double
BulletDirection As Double
Counter As Integer
Pulse As Integer
type As Integer
End Type
*/