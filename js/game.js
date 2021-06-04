var game = new Phaser.Game(600, 600, 
  Phaser.CANVAS, 'phaser-example', 
  { 
    preload: preload,
    create: create, 
    update: update,
   });

function create ()
{
  graphics = game.add.graphics(0, 0);

  if (localStorage.getItem(localStorageName) == null)
    highScore = 0;
 else 
    highScore = localStorage.getItem(localStorageName);

showTitle();

shapeData = game.cache.getJSON('shapeData');

game.cursors = game.input.keyboard.createCursorKeys();
game.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
window.graphics = graphics;

}

function startGame(){
  gameOver = false;
  ShipsLeft=5;
  initShip();
  drawShip();
  
  for(let i = 0; i < NumAsteroids; i++){
  var asteroid = initAsteroid(true);
    asteroids.push(asteroid);
  }
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
ship.x = game.rnd.integerInRange(0, game.width);
ship.y = game.rnd.integerInRange(0, game.height);
}

function initBullet(bullet){
bullet.x = ship.x;
bullet.y = ship.y;
bullet.angle = ship.angle;
bullet.height = 2;
bullet.width = 2;
bullet.speed = 5;
bullet.color = 0xffffff;
bullet.life = 100;
bullet.shape= graphics.drawRect(bullet.x,bullet.y,bullet.width,bullet.height,bullet.color);
bullet.velX =  Math.cos(bullet.angle) * bullet.speed;
bullet.velY = Math.sin(bullet.angle) * bullet.speed;
}

 function updateBullet(bullet){
  if(bullet!=undefined && bullet.shape!=null)
  { 
    bullet.life--;
   bullet.x +=  bullet.velX;
   bullet.y +=bullet.velY;
  if (bullet.x < 0) bullet.x = game.width;
  if (bullet.x > game.width) bullet.x = 0;
  if(bullet.y < 0) bullet.y = game.height;
  if(bullet.y > game.height) bullet.y = 0;
  asteroids.forEach(asteroid => {
  if(Collision(bullet,asteroid))
    bulletHitAsteroid(bullet,asteroid);
});
graphics.drawRect(bullet.x,bullet.y,bullet.width,bullet.height,bullet.color);
if(bullet.life==0)
  bullets.splice(bullets.indexOf(bullet),1);
 }
}

function bulletHitAsteroid(bullet,asteroid){
  bullets.splice(bullets.indexOf(bullet),1);
  explosion(asteroid.x,asteroid.y);
 initAsteroid(false,asteroid.x,asteroid.y);
 initAsteroid(false,asteroid.x,asteroid.y);
 asteroids.splice(asteroids.indexOf(asteroid),1);
} 

function explosion(x,y){
for (let index = 0; index < 10; index++) {
}
}

function initAsteroid(start,x,y){
      var asteroid = {};
      asteroid.visible = true;
      asteroid.width = asteroid.height = 56;
      if(start)
        startingCoordinates(asteroid);
        else{
          asteroid.x =x;
          asteroid.y =y;
        }
      asteroid.speed = .3;
      asteroid.angle = game.rnd.integerInRange(0, 359);
      asteroid.velX = game.rnd.integerInRange(1, 3);
      asteroid.velY = game.rnd.integerInRange(1, 3);
      if(game.rnd.integerInRange(0, 1)==1)
      asteroid.velX*=-1;
      if(game.rnd.integerInRange(0, 1)==1)
      asteroid.velY*=-1;
      asteroid.strokeColor = 'white';
      asteroid.radius = 28;
      asteroid.rotateSpeed = game.rnd.integerInRange(1, 10)/100;
      var rockType = game.rnd.integerInRange(0, 2);
      var shape;
      switch (rockType) {
        case 0:
          shape = shapeData.rock1[0].shape;    
          break;
        case 1:
          shape = shapeData.rock2[0].shape;    
          break;
        case 2:
          shape = shapeData.rock3[0].shape;    
          break;
        default:
          break;
      }
      
      asteroid.shape = new Phaser.Polygon(shape);
      // Used to decide if this asteroid can be broken into smaller pieces
      asteroid.level = 1;  
      return asteroid;
  }

function startingCoordinates(asteroid){
    var tBLR = game.rnd.integerInRange(1, 4);
    switch (tBLR) {
      case 1:
        asteroid.x = game.rnd.integerInRange(0, game.width);
        asteroid.y=0;
      break;
      case 2:
        asteroid.x = game.rnd.integerInRange(0, game.width);
        asteroid.y=game.height;
      break;
      case 3:
       asteroid.x = 0;
      asteroid.y = game.rnd.integerInRange(0, game.height);
      break;
      case 4:
      asteroid.x = game.width;
      asteroid.y = game.rnd.integerInRange(0, game.height);
      break;
      default:
        break;
    }
  }

  function updateAsteroid(asteroid){
      asteroid.x += asteroid.velX;
      asteroid.y += asteroid.velY;
      if (asteroid.x < 0-asteroid.radius) {
          asteroid.x = game.width+asteroid.radius;
      }
      if (asteroid.x > game.width+asteroid.radius) {
          asteroid.x = 0-asteroid.radius;
      }
      if (asteroid.y < 0-asteroid.radius) {
          asteroid.y = game.height+asteroid.radius;
      }
      if (asteroid.y > game.height+asteroid.radius) {
          asteroid.y = 0-asteroid.radius;
      }
      
  }

function Collision(a, b){
  var rectA = new Phaser.Rectangle(a.x, a.y, a.width, a.height);
    var rectB = new Phaser.Rectangle(b.x, b.y, b.width, b.height);
    var intersects = Phaser.Rectangle.intersection(rectA, rectB);
    return (intersects.width+intersects.height>0);
  }

  // Handles drawing life ships on screen
function drawLives(){
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
  
    var i = 0;
    var x = rotx(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.x;
    var y = roty(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.y;
     graphics.moveTo(x, y);
     for (i = 1; i < asteroid.shape.points.length; i++) {
      x = rotx(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.x;
      y = roty(asteroid.shape.points[i].x, asteroid.shape.points[i].y, asteroid.angle) + asteroid.y;
        graphics.lineTo(x, y);
      }
  }
    
function rotx(x,y,angle) {
  return (x*Math.cos(angle)) - (y*Math.sin(angle));
}

function roty(x,y,angle) {
  return (x*Math.sin(angle)) + (y*Math.cos(angle));
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
  ship.shape = new Phaser.Polygon(shapeData.ship[0].shape);
 
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
  if (!gameStart) {
    introText.scale.x= introTextSize;
    introText.scale.y= introTextSize;
    if (introTextSize < 1){
      introText.y -= 3;
      introTextSize += .03;
    }
    else {
        introText2.visible = true;
    if (game.fireButton.isDown) {
      gameStart = true;
      introText.visible = false;
      introText2.visible = false;
      if(gameOverText!=undefined)
          gameOverText.visible = false;
          isFiring = true;
          startGame();
      }
    }
  }
else{
  graphics.clear();
  if (game.fireButton.isDown && !isFiring) {
    var bullet = {};
    initBullet(bullet);
    bullets.push(bullet);
      isFiring = true;
  }

  if (game.fireButton.isUp && isFiring) {
  isFiring = false;
  }
 
      updateShip();
      drawShip();
    
      bullets.forEach(bullet => {
        updateBullet(bullet);
      });

asteroids.forEach(asteroid => {
    updateAsteroid(asteroid);
    drawAsteroid(asteroid);
});

  //     if (asteroids.length !== 0) {
//       for(let j = 0; j < asteroids.length; j++){
//         updateAsteroid(asteroids[j]);
//         drawAsteroid(asteroids[j]);
//         if(PolygonsIntersect(asteroids[j].shape,ship.shape)){
//    // console.log('boom!');
//   }
// }
  if (game.cursors.left.isDown) Rotate(LEFT);
  if (game.cursors.right.isDown) Rotate(RIGHT);
  if (game.cursors.up.isDown) ship.movingForward = true;
  if (game.cursors.up.isUp) ship.movingForward = false;
  if (game.cursors.down.isDown) Hyperspace();
    }
  }

