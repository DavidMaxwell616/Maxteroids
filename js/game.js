const game = new Phaser.Game(500, 500, Phaser.ARCADE, 'game', {
  create,
  update,
});


function create ()
{
  graphics = game.add.graphics(game.width, game.height);
  graphics.beginFill(0xFF3300);
  graphics.lineStyle(10, 0xffd900, 1);
  if (localStorage.getItem(localStorageName) == null)
    highScore = 0;
 else 
    highScore = localStorage.getItem(localStorageName);

showTitle();
game.cursors = game.input.keyboard.createCursorKeys();
game.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function startGame(){
  gameOver = false;
  ShipsLeft=5;
  initShip();
  drawShip();
  
  // for(let i = 0; i < 8; i++){
  // var asteroid = initAsteroid();
  //   asteroids.push(asteroid);
  // }
}


function showTitle() {
  var style = { font: "72px Arial", fontWeight: 'Bold', fontSize: 72, fill: '#ff0000', align: "center" };
  introText = game.add.text(game.width / 2, game.height / 2, "MAXTEROIDS", style);
  introText.anchor.setTo(0.5);
 
  style = { font: "72px Arial", fontWeight: 'Bold', fontSize: 24, fill: '#ff0000', align: "center" };
  introText2 = game.add.text(game.width / 2, game.height * .75, introTextString, style);
  introText2.anchor.setTo(0.5);
  introText2.visible = false;
  style = { font: "18px Arial", fontWeight: 'Bold', fontSize: 24, fill: '#ffffff', align: "center" };
  infoText2 = game.add.text(game.width / 2, 20, "", style);
  infoText2.anchor.setTo(0.5);
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
bullet.x = ship.x;
bullet.y = ship.y;
bullet.angle = ship.angle;
bullet.height = 4;
bullet.width = 4;
bullet.speed = 5;
bullet.color = 0xffffff;
bullet.life = 100;
bullet.shape= _scene.add.rectangle(bullet.x,bullet.y,bullet.width,bullet.height,bullet.color);
bullet.velX =  Math.cos(bullet.angle) * bullet.speed;
bullet.velY = Math.sin(bullet.angle) * bullet.speed;
}

 function updateBullet(bullet){
  bullet.life--;
  bullet.shape.x=bullet.x;
  bullet.shape.y=bullet.y;
  bullet.x +=  bullet.velX;
  bullet.y +=bullet.velY;
  if (bullet.x < 0)
    bullet.x = width;
  if (bullet.x > width)
    bullet.x = 0;
  if(bullet.y < 0)
    bullet.y = height;
  if(bullet.y > height)
    bullet.y = 0;
  asteroids.forEach(asteroid => {
  if(CircleCollision(bullet.x,bullet.y,bullet.radius,asteroid.x,asteroid.y,asteroid.radius))
  console.log('hit');
});
console.log(bullet.life)
  if(bullet.life==0){
    bullets.pop(bullet);
bullet=null;
  }
  }

function drawBullet(bullet){
  if(bullet!=undefined && bullet.shape!=null)
  {   
    bullet.shape.setStrokeStyle(1, bullet.color);
  }
}

function initAsteroid(){
      var asteroid = {};
      asteroid.visible = true;
      asteroid.x = Phaser.Math.Between(0, width);
      asteroid.y = Phaser.Math.Between(0, height);
      asteroid.speed = .3;
      asteroid.radius = 50;
      asteroid.angle = Math.floor(Math.random() * 359);
      asteroid.velX = Phaser.Math.Between(1, 3);
      asteroid.velY = Phaser.Math.Between(1, 3);
      if(Phaser.Math.Between(0, 1)==1)
      asteroid.velX*=-1;
      if(Phaser.Math.Between(0, 1)==1)
      asteroid.velY*=-1;
      asteroid.strokeColor = 'white';
      asteroid.collisionRadius = 46;
      asteroid.rotateSpeed = Phaser.Math.Between(1, 10)/100;
      asteroid.shape = new Phaser.Geom.Polygon(rockShape);
      // Used to decide if this asteroid can be broken into smaller pieces
      asteroid.level = 1;  
      return asteroid;
  }

function updateAsteroid(asteroid){
      asteroid.x += asteroid.velX;
      asteroid.y += asteroid.velY;
      if (asteroid.x < 0-asteroid.radius) {
          asteroid.x = width+asteroid.radius;
      }
      if (asteroid.x > width+asteroid.radius) {
          asteroid.x = 0-asteroid.radius;
      }
      if (asteroid.y < 0-asteroid.radius) {
          asteroid.y = height+asteroid.radius;
      }
      if (asteroid.y > height+asteroid.radius) {
          asteroid.y = 0-asteroid.radius;
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
      asteroid.angle+=asteroid.rotateSpeed;
      graphics.lineStyle(2, 0xffffff);
      graphics.beginPath();
  
    var i = 0;
    var x = rotx(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.x;
    var y = roty(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.y;
     graphics.moveTo(x, y);
     for (i = 1; i < asteroid.shape.points.length; i++) {
      x = rotx(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.x;
      y = roty(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.y;
        graphics.lineTo(x, y);
      }
  
      graphics.closePath();
      graphics.strokePath();
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

function PolygonsIntersect (a, b) {
  var polygons = [a, b];
  var minA, maxA, projected, i, i1, j, minB, maxB;
  for (i = 0; i < polygons.length; i++) {

      // for each polygon, look at each edge of the polygon, and determine if it separates
      // the two shapes
      var polygon = polygons[i];
      console.log(polygon.length);
      for (i1 = 0; i1 < polygon.length; i1++) {
          // grab 2 vertices to create an edge
          var i2 = (i1 + 1) % polygon.length;
          var p1 = polygon[i1];
          var p2 = polygon[i2];

          // find the line perpendicular to this edge
          var normal = { x: p2.y - p1.y, y: p1.x - p2.x };

          minA = maxA = undefined;
          // for each vertex in the first shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          for (j = 0; j < a.length; j++) {
              projected = normal.x * a[j].x + normal.y * a[j].y;
              if (isUndefined(minA) || projected < minA) {
                  minA = projected;
              }
              if (isUndefined(maxA) || projected > maxA) {
                  maxA = projected;
              }
          }

          // for each vertex in the second shape, project it onto the line perpendicular to the edge
          // and keep track of the min and max of these values
          minB = maxB = undefined;
          for (j = 0; j < b.length; j++) {
              projected = normal.x * b[j].x + normal.y * b[j].y;
              if (isUndefined(minB) || projected < minB) {
                  minB = projected;
              }
              if (isUndefined(maxB) || projected > maxB) {
                  maxB = projected;
              }
          }

          // if there is no overlap between the projects, the edge we are looking at separates the two
          // polygons, and we know there is no overlap
          if (maxA < minB || maxB < minA) {
              console.log("polygons don't intersect!");
              return false;
          }
      }
  }
  return true;
};

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


function updateShip(){
    if (ship.movingForward) {
        ship.velX += Math.cos(ship.angle) * ship.speed;
        ship.velY += Math.sin(ship.angle) * ship.speed;
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
      ship.velX *= 0.99;
      ship.velY *= 0.99;

      // Change value of x & y while accounting for
      // air friction    
      ship.x += ship.velX;
      ship.y += ship.velY;

  }

function update(){
  introText.scale.x = introTextSize;
  introText.scale.y = introTextSize;
  if (introTextSize < 1){
    introText.y -= 1;
    introTextSize += .01;
  }
  else {
      introText2.visible = true;
  }
}


function updateX(){
  graphics.clear();


  if(game.fireButton.isDown)
  {
   if (!gameStart) {
    gameStart = true;
    introText.visible = false;
    introText2.visible = false;
    if(gameOverText!=undefined)
        gameOverText.visible = false;
        startGame();
  }
  else
  {
    var bullet = {};
    initBullet(bullet);
    bullets.push(bullet);
  }
}

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
    updateShip();
      drawShip();
      if (bullets.length > 0) {
        for(let i = 0; i < bullets.length; i++){
            updateBullet(bullets[i]);
            drawBullet(bullets[i]);
        }
    }
    if (asteroids.length !== 0) {
      for(let j = 0; j < asteroids.length; j++){
        updateAsteroid(asteroids[j]);
        drawAsteroid(asteroids[j]);
        if(PolygonsIntersect(asteroids[j].shape,ship.shape)){
   // console.log('boom!');
  }
}
}
  if (game.cursors.left.isDown) Rotate(LEFT);
  if (game.cursors.right.isDown) Rotate(RIGHT);
  if (game.cursors.up.isDown) ship.movingForward = true;
  if (game.cursors.up.isUp) ship.movingForward = false;
  if (game.cursors.down.isDown) Hyperspace();
    }
  }