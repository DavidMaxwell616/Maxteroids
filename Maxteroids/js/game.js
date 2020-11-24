var config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  parent: 'phaser-example',
  scene: {
      create: create,
      update: update
  }
};
var game = new Phaser.Game(config);
var _scene;
var width = game.config.width;
var height = game.config.height;

function create ()
{
  _scene = this;
  showTitle();
  graphics = _scene.add.graphics({ lineStyle: { width: 1, color: 0xffffff } });
  if (localStorage.getItem(localStorageName) == null) {
    highScore = 0;
} else {
    highScore = localStorage.getItem(localStorageName);
}
  _scene.input.keyboard.on('keydown_LEFT', function (event) {
    Rotate(LEFT);
  });

  _scene.input.keyboard.on('keydown_RIGHT', function (event) {
    Rotate(RIGHT);
  });

  _scene.input.keyboard.on('keydown_UP', function (event) {
    ship.movingForward = true;
  });

  _scene.input.keyboard.on('keyup_UP', function (event) {
    ship.movingForward = false;
     });
     
  _scene.input.keyboard.on('keydown_DOWN', function (event) {
Hyperspace();
  });

  _scene.input.keyboard.on('keydown_SPACE', function (event) {
  if (!gameStart) {
    gameStart = true;
    introText.visible = false;
    introText2.visible = false;
    if(gameOverText!=undefined)
        gameOverText.visible = false;
    gameOver = false;
    ShipsLeft=5;
    initShip();
    drawShip();
    
    for(let i = 0; i < 8; i++){
    var asteroid = initAsteroid();
      asteroids.push(asteroid);
  }
  }
  var bullet = {};
    initBullet(bullet);
    bullets.push(bullet);
});

}
function showTitle() {

  var style = {
    fontFamily: 'Arial',
    fontStyle: 'Bold',
    fontSize: 72,
    color: '#ff0000',
    align:'center'
  }
  introText = _scene.add.text(width / 2, height / 2, "MAXTEROIDS", style);
  introText.setOrigin(0.5,0.5);
 
  introText2 = _scene.add.text(width / 2, height * .75, introTextString, {
    fontFamily: 'Arial',
    fontStyle: 'Bold',
    fontSize: 24,
    color: '#ff0000',
    align:'center'
  });
  introText2.setOrigin(0.5,0.5);
  introText2.visible = false;
  infoText2 = _scene.add.text(game.width / 2, 20, "", {
    fontFamily: 'Arial',
    fontStyle: 'Bold',
    fontSize: 18,
    color: '#ffffff',
    align:'center'
  });
  infoText2.setOrigin(0.5,0.5);
  infoText2.visible = false; 
}

function Rotate(dir) {
  ship.angle += ship.rotateSpeed * dir;
}

function Hyperspace(){
ship.x = Phaser.Math.Between(0, width);
ship.y = Phaser.Math.Between(0, height);
}

function initBullet(bullet){
bullet.visible = true;
bullet.x = ship.x;
bullet.y = ship.y;
bullet.angle = ship.angle;
bullet.height = 4;
bullet.width = 4;
bullet.speed = 5;
bullet.velX = 0;
bullet.velY = 0;
  }

 function updateBullet(bullet){
      let radians = bullet.angle / Math.PI * 180;
      bullet.x -= Math.cos(radians) * bullet.speed;
      bullet.y -= Math.sin(radians) * bullet.speed;
  }

  function drawBullet(bullet){
      graphics.fillStyle = 'white';
      graphics.fillRect(bullet.x,bullet.y,bullet.width,bullet.height);
}

function initAsteroid(asteroid, x,y,radius,level,collisionRadius){
      asteroid.visible = true;
      asteroid.x = x || Phaser.Math.Between(0, width);
      asteroid.y = y || Phaser.Math.Between(0, height);
      asteroid.speed = 3;
      asteroid.radius = radius || 50;
      asteroid.angle = Math.floor(Math.random() * 359);
      asteroid.strokeColor = 'white';
      asteroid.collisionRadius = collisionRadius || 46;
      // Used to decide if this asteroid can be broken into smaller pieces
      asteroid.level = level || 1;  
  }

function updateAsteroid(asteroid){
      let radians = asteroid.angle / Math.PI * 180;
      asteroid.x += Math.cos(radians) * asteroid.speed;
      asteroid.y += Math.sin(radians) * asteroid.speed;
      if (asteroid.x < asteroid.radius) {
          asteroid.x = width;
      }
      if (asteroid.x > width) {
          asteroid.x = asteroid.radius;
      }
      if (asteroid.y < asteroid.radius) {
          asteroid.y = height;
      }
      if (asteroid.y > height) {
          asteroid.y = asteroid.radius;
      }
  }
// Handles drawing life ships on screen
function drawLifeShips(){
  let startX = 1350;
  let startY = 10;
  let points = [[9, 9], [-9, 9]];
  graphics.strokeStyle = 'white'; // Stroke color of ships
  // Cycle through all live ships remaining
  for(let i = 0; i < lives; i++){
      // Start drawing ship
      graphics.beginPath();
      // Move to origin point
      graphics.moveTo(startX, startY);
      // Cycle through all other points
      for(let j = 0; j < points.length; j++){
        graphics.lineTo(startX + points[j][0], 
              startY + points[j][1]);
      }
      // Draw from last point to 1st origin point
      graphics.closePath();
      // Stroke the ship shape white
      graphics.stroke();
      // Move next shape 30 pixels to the left
      startX -= 30;
  }
}
 function drawAsteroid(asteroid){
      graphics.beginPath();
      let vertAngle = ((Math.PI * 2) / 6);
      var radians = asteroid.angle / Math.PI * 180;
      for(let i = 0; i < 6; i++){
          ctx.lineTo(asteroid.x - asteroid.radius * Math.cos(vertAngle * i + radians), 
          asteroid.y - asteroid.radius * Math.sin(vertAngle * i + radians));
      }
      graphics.closePath();
      graphics.stroke();
  }

  function CircleCollision(p1x, p1y, r1, p2x, p2y, r2){
    let radiusSum;
    let xDiff;
    let yDiff;
 
    radiusSum = r1 + r2;
    xDiff = p1x - p2x;
    yDiff = p1y - p2y;
 
    if (radiusSum > Math.sqrt((xDiff * xDiff) + (yDiff * yDiff))) {
        return true;
    } else {
        return false;
    }
}


function degtorad(angle) {
  return 3.1415926 * angle / 180;
}
    
function rotx(x,y,angle) {
  return (x*Math.cos(angle)) - (y*Math.sin(angle));
}

function roty(x,y,angle) {
  return (x*Math.sin(angle)) + (y*Math.cos(angle));
}

function initShip(){
  ship.x = width/2;
  ship.y = height/2;  
  ship.movingForward = false;
  ship.speed = 0.1;
  ship.velX = 0;
  ship.velY = 0;
  ship.rotateSpeed = 0.1;
  ship.radius = 15;
  ship.angle = 0;
  ship.shape = new Phaser.Geom.Polygon(shipShape);
 
}

function drawShip(){
    graphics.lineStyle(2, 0xffffff);
    graphics.beginPath();

  var i = 0;
  var x = rotx(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.x;
  var y = roty(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.y;
   graphics.moveTo(x, y);
   for (i = 1; i < ship.shape.points.length; i++) {
    x = rotx(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.x;
    y = roty(ship.shape.points[i].x, ship.shape.points[i].y, ship.angle) + ship.y;
      graphics.lineTo(x, y);
    }

    graphics.closePath();
    graphics.strokePath();
}

// function Thrust(){
//   ship.movingForward = true;
// }

function updateShip(){
        let radians = ship.angle / Math.PI * 180;
 
        if (ship.movingForward) {
            ship.velX += Math.cos(radians) * ship.speed;
            ship.velY += Math.sin(radians) * ship.speed;
        }

        if (ship.x < ship.radius) {
            ship.x = width;
        }
        if (ship.x > width) {
            ship.x = ship.radius;
        }
        if (ship.y < ship.radius) {
            ship.y = height;
        }
        if (ship.y > height) {
            ship.y = ship.radius;
        }

         // Slow ship speed when not holding key
         this.velX *= 0.99;
         this.velY *= 0.99;
  
         // Change value of x & y while accounting for
         // air friction    
         this.x -= this.velX;
         this.y -= this.velY;
        drawShip();

      }

function update(){
 
    if (!gameStart) {
        introText.scaleX= introTextSize;
        introText.scaleY= introTextSize;
        if (introTextSize < 1){
          introText.y -= 3;
          introTextSize += .03;
        }
        else {
            introText2.visible = true;
        }
    }
    else{
      graphics.clear();
      updateShip();
      if (bullets.length > 0) {
        console.log(bullets.length);
        for(let i = 0; i < bullets.length; i++){
            updateBullet(bullets[i]);
            drawBullet(bullets[i]);
        }
    }
    if (asteroids.length !== 0) {
      for(let j = 0; j < asteroids.length; j++){
          updateAsteroid(asteroid[j]);
          drawAsteroid(asteroid[j]);
      }
}
}
}