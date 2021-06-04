var game = new Phaser.Game(600, 600, 
  Phaser.AUTO, 'phaser-example', { create: create, update: update });

function create() {

    graphics = game.add.graphics(100, 100);
    initShip();
    drawShip();
 

    window.graphics = graphics;

}

function initShip(){
  ship.x = game.width/2;
  ship.y = game.height/2;  
  ship.movingForward = false;
  ship.speed = 0.1;
  ship.velX = 0;
  ship.velY = 0;
  ship.rotateSpeed = 0.1;
  ship.radius = 15;
  ship.angle = 0;
  ship.shape = new Phaser.Polygon(shipShape);
 
}
function drawShip(){
  graphics.lineStyle(2, 0xffffff);

var i = 0;
var x = rotx(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.x;
var y = roty(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.y;
graphics.moveTo(x, y);
 for (i = 1; i < ship.shape.points.length; i++) {
  x = rotx(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.x;
  y = roty(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.y;
  graphics.lineTo(x, y);
  }
}

function rotx(x,y,angle) {
  return (x*Math.cos(angle)) - (y*Math.sin(angle));
}

function roty(x,y,angle) {
  return (x*Math.sin(angle)) + (y*Math.cos(angle));
}
function updateShip(){
  if (ship.movingForward) {
      ship.velX += Math.cos(ship.angle) * ship.speed;
      ship.velY += Math.sin(ship.angle) * ship.speed;
  }

  if (ship.x < ship.radius) {
      ship.x = game.width;
  }
  if (ship.x > game.width) {
      ship.x = ship.radius;
  }
  if (ship.y < ship.radius) {
      ship.y = game.height;
  }
  if (ship.y > game.height) {
      ship.y = ship.radius;
  }

    // Slow ship speed when not holding key
    ship.velX *= 0.99;
    ship.velY *= 0.99;

    // Change value of x & y while accounting for
    // air friction    
    ship.x += ship.velX;
    ship.y += ship.velY;
  }

function update(){
  graphics.clear();
  updateShip();
  drawShip();
 
}