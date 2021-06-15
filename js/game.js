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
    asteroids.push(initAsteroid());
  }
}
function getDigit(number, n) {
  return Math.floor((number / Math.pow(10, n - 1)) % 10);
}

function drawNumber(x,digit){
  var numberData = shapeData.numbers[digit][0].shape;
graphics.moveTo(x+numberData[0], infoY+numberData[1]);
for (i = 2; i < numberData.length-1; i+=2) {
graphics.lineTo(x+numberData[i], infoY+numberData[i+1]);
}
}

function updateScore(){
  graphics.lineStyle(2, 0xffffff);
  for (let index = 1; index < 5; index++) {
    var x = 200-(index*20); 
    digit = getDigit(score,index);
    drawNumber(x,digit);   
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
  score+= 50 * asteroid.level;
  bullets.splice(bullets.indexOf(bullet),1);
  explosion(asteroid.x,asteroid.y);
  if(asteroid.level==1){
    asteroids.push(initAsteroid(asteroid));
    asteroids.push(initAsteroid(asteroid));
    }
  asteroids.splice(asteroids.indexOf(asteroid),1);
} 

function explosion(x,y){
for (let index = 0; index < 6; index++) 
  addParticle(x,y);
}

function addParticle(x,y){
  var particle = {};
particle.x = x;
particle.y = y;
particle.angle = game.rnd.integerInRange(0, 359);
particle.height = 2;
particle.width = 2;
particle.speed = 5;
particle.color = 0xffffff;
particle.life = 50;
particle.shape= graphics.drawRect(particle.x,particle.y,particle.width,particle.height,particle.color);
particle.velX =  Math.cos(particle.angle) * particle.speed;
particle.velY = Math.sin(particle.angle) * particle.speed;
particles.push(particle);
}

function moveParticle(particle){
  if(particle!=undefined && particle.shape!=null)
  { 
     particle.life--;
    particle.x += particle.velX;
    particle.y += particle.velY;
  if (particle.x < 0) particle.x = game.width;
  if (particle.x > game.width) particle.x = 0;
  if(particle.y < 0) particle.y = game.height;
  if(particle.y > game.height) particle.y = 0;
  graphics.drawRect(particle.x,particle.y,particle.width,particle.height,particle.color);
  if(particle.life==0)
  particles.splice(particles.indexOf(particle),1);
 }
}

function initAsteroid(asteroid){
      if(asteroid==null){
        var asteroid = {};
        AsteroidSpawnPosition(asteroid);
        asteroid.level=1;
      }
      else{
        var newAsteroid = {};
          newAsteroid.x =asteroid.x;
          newAsteroid.y =asteroid.y;
          newAsteroid.level=2;
          asteroid = newAsteroid;
        }
      asteroid.width = asteroid.height = asteroid.level==1 ? 56 : 28;
      asteroid.speed = .3;
      asteroid.angle = game.rnd.integerInRange(0, 359);
      asteroid.velX = game.rnd.integerInRange(1, 3);
      asteroid.velY = game.rnd.integerInRange(1, 3);
      if(game.rnd.integerInRange(0, 1)==1)
      asteroid.velX*=-1;
      if(game.rnd.integerInRange(0, 1)==1)
      asteroid.velY*=-1;
      asteroid.strokeColor = 'white';
      asteroid.radius = asteroid.width*2;
      asteroid.rotateSpeed = game.rnd.integerInRange(1, 10)/100;
      var rockType = game.rnd.integerInRange(0, 2);
      var shape = shapeData.rocks[rockType][0].shape;    
      var rockSize =  asteroid.level==1 ? 1.5 : .5;
      const map = shape.map(x => x * rockSize);
      asteroid.shape = new Phaser.Polygon(map);  
     // var width = Math.min(...asteroid.shape) 
      return asteroid;
  }

function AsteroidSpawnPosition(asteroid){
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

      if (asteroid.x < 0) {
          asteroid.x = game.width;
      }
      if (asteroid.x > game.width) {
          asteroid.x = 0;
      }
      if (asteroid.y < 0) {
          asteroid.y = game.height;
      }
      if (asteroid.y > game.height) {
          asteroid.y = 0;
      }
      
  }

function Collision(a, b){
  var rectA = new Phaser.Rectangle(a.x, a.y, a.width, a.height);
    var rectB = new Phaser.Rectangle(b.x, b.y, b.width, b.height);
    var intersects = Phaser.Rectangle.intersection(rectA, rectB);
    return (intersects.width+intersects.height*intersects.width+intersects.width>0);
  }

  // Handles drawing life ships on screen
function drawLives(){
  let startX = game.width*.75;

  graphics.lineStyle(2, 0xffffff);
  points = [0,-12,-8,12,-6,10,6,10,8,12,0,-12];
    for(let i = 0; i < lives; i++){
      var x = startX+i*20;
      for(let j = 0; j < points.length; j+=2){
        if(j==0)
          graphics.moveTo(x+points[j],infoY+points[j+1]);
        else
        graphics.lineTo(x+points[j],infoY+points[j+1]);
      }
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
      
  if(debugDraw) graphics.drawRect(asteroid.x-asteroid.shape.width/2, 
                                    asteroid.y-asteroid.shape.height/2, 
                                    asteroid.shape.width,asteroid.shape.height);
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
  updateScore();
  drawLives();
  particles.forEach(particle => {
     moveParticle(particle);
  });

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

