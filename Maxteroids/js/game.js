var game = new Phaser.Game(800,
  600,
  Phaser.AUTO,
  'phaser-example',
  {create: create, update: update, render: render });

function create() {
  game.physics.startSystem(Phaser.Physics.ARCADE);

  game.stage.backgroundColor = '#000000';
  var style = { font: "72px Arial", fill: '#ff0000', align: "center" };
  introText = game.add.text(game.width / 2, game.height / 2, "MAXTEROIDS", style);
  introText.anchor.set(0.5);

  var introTextString = "Rotate Right - Right Arrow \n" +
      "Rotate Left - Left Arrow \n" +
      "Thrust - Up Arrow \n" +
      "Hyperspace - Down Arrow \n" +
      "Fire - Space Bar \n" +
      "Press Space to Start";
  introText2 = game.add.text(game.width / 2, game.height * .75, introTextString, {
      font: "24px Arial",
      fill: "#ff0000",
      align: "center"
  });
  introText2.anchor.set(0.5);
  introText2.visible = false;
  infoText2 = game.add.text(game.width / 2, 20, "", {
      font: "18px Arial",
      fill: "#ffffff",
      align: "left"
  });
  infoText2.anchor.set(0.5);
  infoText2.visible = false; spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
  spaceKey.onDown.add(Fire, this);
  leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
  game.input.keyboard.addKeyCapture(Phaser.Keyboard.LEFT);
  rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
  game.input.keyboard.addKeyCapture(Phaser.Keyboard.RIGHT);
  upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
  game.input.keyboard.addKeyCapture(Phaser.Keyboard.UP);
  downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
  game.input.keyboard.addKeyCapture(Phaser.Keyboard.DOWN);
  game.input.keyboard.onUpCallback = function (e) {
      if (e.keyCode == Phaser.Keyboard.UP) {
          MainShip.forward = false;
      }
  };


  MainShip = new Ship();
  ShipExplode = new Explosion();

  for (var x = 0; x < MAXENEMIES; x++)
  {
      Enemies[x] = new Ship();
      Enemies[x].active=false;
  }
  for (var x = 0; x < MAXROCKS; x++) { Rocks[x] = new Rock(); }
  RockNumStart = 4;
  NumRocks = RockNumStart;
  RocksLeft = NumRocks;
  initializeShip();
  initializeEnemies();
  initializeRocks();

  MainShip.speed = 1;
  ShipsLeft = 5;
  Level = 1;
  NumEnemy = 1;
  MainShip.shieldStrength = 255;
  MainShip.cx = game.width / 2;
  MainShip.cy = game.height / 2;
  MainShip.active = true;
  Enemies[0].active = false;
  MainShip.size = ShipSize;
  MainShip.da = 0;
  MainShip.db = 0;
  MainShip.forward = false;
}

function Reset(levelUp) {
  if (levelUp) {
      RockNumStart++;
      RocksLeft = RockNumStart;
      NumRocks = RocksLeft;
      initializeRocks();
  }
  MainShip.speed = 1;
  MainShip.shieldStrength = 255;
  MainShip.cx = game.width / 2;
  MainShip.cy = game.height / 2;
  MainShip.active = true;
  Enemies[0].active = false;
  MainShip.size = ShipSize;
  MainShip.da = 0;
  MainShip.db = 0;
  MainShip.forward = false;
  //console.log(RocksLeft);
  //initializeShip();
  //initializeEnemies();
}

function Ship() {
  this.active = true;
  this.color = 0;
  this.cx = 0;
  this.cy = 0;
  this.exploding = false;
  this.explodeSwitch = false;
  this.explodeCount = 0;
  this.firing = false;
  this.forward = false;
  this.oldCX = 0;
  this.oldCY = 0;
  this.x = [];
  this.y = [];
  this.speed = 0;
  this.shieldStrength = 0;
  this.shields = false;
  this.size = 0;
  this.xv = 0;
  this.yv = 0;
  this.Particles = [NumParticles];
  this.ParticleLine = [NumParticles];
  for (var i = 0; i <= NumParticles; i++) {
      this.Particles[i] = new Particle();
      this.ParticleLine[i] = new Phaser.Circle(0, 0, 10);
  }

}

function Rock() {
  this.active = true;
  this.cx = 0;
  this.cy = 0;
  this.rockDirection = 0;
  this.pointX = [];
  this.pointY = [];
  this.pointXDist = [];
  this.pointYDist = [];
  this.rotate = 0;
  this.size = 0;
  this.xv = 0;
  this.yv = 0;
  this.hit = 0;
  this.rockLine = [];
  this.exploding = false;
  this.Particles = [5];
  this.ParticleLine = [5];
  for (var i = 0; i <= 5; i++) {
      this.Particles[i] = new Particle();
      this.ParticleLine[i] = new Phaser.Circle(0, 0, 10);
  }
}

function Bullet() {
  this.active = false;
  this.x= 0;
  this.y= 0;
  this.xv = 0;
  this.yv = 0;
  this.direction = 0;
  this.dx = 0;
  this.dy = 0;
  this.counter = 0;
  this.speed = 10;
}

function Explosion() {
  this.BlowDirection = 0;
  this.exploding = false;
  this.explodeSwitch = false;
  this.explodeCount = 0;
  this.BlowX = [];
  this.BlowY = [];
  this.BlowCenterX = [];
  this.BlowCenterY = [];
  this.BlowVelocityX = [];
  this.shipBlastLine = [];
  this.BlowVelocityY = [];
  this.Size = 0;
  this.Color = 0;
  for (var i = 0; i <= 5; i++) {
      this.shipBlastLine[i] = new Phaser.Line(0, 0, 0, 0);
  }
}

function Particle() {
  this.active = false;
  this.cx = 0;
  this.cy = 0;
  this.xv = 0;
  this.yv = 0;
  this.direction = 0;
  this.counter = 0;
  this.speed = 10;
}

function initializeShip() {
  MainShip.cx = game.width / 2;
  MainShip.cy = game.height / 2;
  MainShip.direction = 0;
  MainShip.active = true;
  MainShip.da = 0;
  MainShip.db = 0;
  MainShip.forward = false;
  MainShip.shieldStrength = 200;
  for (var i = 0; i <= 6; i++) {
      shipLine[i] = new Phaser.Line(0, 0, 0, 0);
  }
  for (var i = 0; i < 5; i++) {
      Bullets[i] = new Bullet();
      bulletLine[i] = new Phaser.Circle(0, 0, 10);
      EnemyBullets[i] = new Bullet();
      enemyBulletLine[i] = new Phaser.Circle(0, 0, 10);
  }
}

function randomExcluded(min, max, excluded) {
  var n = Math.floor(Math.random() * (max - min) + min);
  if (n >= excluded) n++;
  return n;
}

function initializeEnemies() {
  var i, randomx;
  for (i = 0; i <= NumEnemies; i++) {
      Enemies[i].active == false;
          Enemies[i].cy = game.rnd.integerInRange(0, game.height);
          Enemies[i].size = 600 - (i * 50);
          if (randomExcluded(-5, 5, 0) < 0)
              Enemies[i].cx = game.width;
          else
              Enemies[i].cx = 0;
          if (Enemies[i].cx == 0)
              Enemies[i].xv = 15;
          else
              Enemies[i].xv = -15;
          Enemies[i].yv = randomExcluded(-15, 15, 0);
      for (var j = 0; j <= 6; j++) {
          enemyLine[j] = new Phaser.Line(0, 0, 0, 0);
      }
  }

  //Enemies[i].color = randomExcluded(1, 15, 0);
  //for (i = 0; i <= 100; i++)
  //  EnemyBullets[i].Active = false;
}
function Degrees(Number) {
  return (Number * Radians);
}

function UnDegrees(Number) {
  return (Number / Radians);
}
function Direction() {
  return Degrees(180);
}

function initializeRocks() {
  var i, j, randomx, randomy;
  for (i = 0; i < MAXROCKS; i++) {
      randomx = randomExcluded(-5, 5, 0);
      randomy = randomExcluded(-5, 5, 0);
      Rocks[i].xv = randomx;
      Rocks[i].yv = randomy;
      Rocks[i].size = BIGROCK;
      var chooser = randomExcluded(1, 4, 0);
      switch (chooser) {
          case 1:
              {
                  Rocks[i].cx = 0; // Int(Rnd * game.width)
                  Rocks[i].cy = randomExcluded(1, game.height, 0);
                  break;
              }

          case 2:
              {
                  Rocks[i].cx = game.width;
                  Rocks[i].cy = randomExcluded(1, game.height, 0);
                  break;
              }

          case 3:
              {
                  Rocks[i].cx = randomExcluded(1, game.width, 0);
                  Rocks[i].cy = 0; // Int(Rnd * game.height)
                  break;
              }

          case 4:
              {
                  Rocks[i].cx = randomExcluded(1, game.width, 0);
                  Rocks[i].cy = game.height;
                  break;
              }
      }

      for (j = 0; j <= 6; j++) {
          Rocks[i].pointX[j] = (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(j * 30))) * Rocks[i].size);
          Rocks[i].pointY[j] = (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(j * 30))) * Rocks[i].size);

          Rocks[i].rockLine[j] = new Phaser.Line(0, 0, 0, 0);
      }
      Rocks[i].active = (i <= NumRocks);
  }

}
function updateBullets() {
  for (i = 0; i < 5; i++) {
      if (Bullets[i].active) {
          if (Bullets[i].x> game.width)
              Bullets[i].x= 0;
          if (Bullets[i].x< 0)
              Bullets[i].x= game.width;
          if (Bullets[i].y> game.height)
              Bullets[i].y= 0;
          if (Bullets[i].y< 0)
              Bullets[i].y= game.height;
          Bullets[i].xv = ((Math.sin(Bullets[i].direction)) * Bullets[i].speed);
          Bullets[i].yv = ((Math.cos(Bullets[i].direction)) * Bullets[i].speed);
          Bullets[i].x+= Bullets[i].xv;
          Bullets[i].y+= Bullets[i].yv;
          bulletLine[i].setTo(Bullets[i].x, Bullets[i].y, 10);
          Bullets[i].counter++;
          if (Bullets[i].counter > 80) {
              Bullets[i].active = false;
              Bullets[i].counter = 0;
          }
      }

      // bullet/asteroid collision check
      for (j = 0; j <= NumRocks; j++) {
          if (Bullets[i].active &&
              Rocks[j].active &&
              CollisionTest(Bullets[i], Rocks[j]))
          {
            //  console.log('bullet hit rock!');
              Bullets[i].active = false;
              Rocks[j].exploding = true;
              Rocks[j].explodeSwitch = true;
              RockExplosion(Rocks[j]);

              if (Rocks[j].size == SMALLROCK) {
                  Rocks[j].active = false;
                  Score += 1000;
                  RocksLeft--;

              }
              else {
                  Rocks[j].size = SMALLROCK;
                  Rocks[j].xv = randomExcluded(-5, 5, 0);
                  Rocks[j].yv = randomExcluded(-5, 5, 0);
                  NumRocks++;
                  RocksLeft++;
                  Rocks[NumRocks].active = true;
                  Rocks[NumRocks].cx= Rocks[j].cx;
                  Rocks[NumRocks].cy= Rocks[j].cy;
                  Rocks[NumRocks].size = SMALLROCK;

                  Rocks[NumRocks].xv = randomExcluded(-5, 5, 0);
                  Rocks[NumRocks].yv = randomExcluded(-5, 5, 0);
                  Score += 500;
              }

              for (j = 0; j <= NumEnemies; j++) {
                  if (Bullets[i].active &&
                      Enemies[j].active &&
                      CollisionTest(Bullets[i], Enemies[j])) 
                  {
                     // console.log('bullet hit enemy!');
                      Enemies[j].exploding = true;
                      Bullets[i].active = false;
                  }
              }


          }
      }
  }
  for (i = 0; i < 5; i++) {
      if (EnemyBullets[i].active) {

          //activate heatseakers (level 8 and above)
          if (EnemyBullets[i].type == 2)
          {
              if (MainShip.cx > EnemyBullets[i].x) EnemyBullets[i].bulletxv++;
              else if (MainShip.cx < EnemyBullets[i].x) EnemyBullets[i].xv--;
              else if (MainShip.cy > EnemyBullets[i].y) EnemyBullets[i].yv++;
              else if (MainShip.cy > EnemyBullets[i].y) EnemyBullets[i].yv--;
          }
          else
          {
              EnemyBullets[i].xv = EnemyBullets[i].speed * Math.cos(EnemyBullets[i].direction);
              EnemyBullets[i].yv = EnemyBullets[i].speed * Math.sin(EnemyBullets[i].direction);
          }
          EnemyBullets[i].x+= EnemyBullets[i].xv;
          EnemyBullets[i].y+= EnemyBullets[i].yv;
          if (EnemyBullets[i].x> game.width)
              EnemyBullets[i].x= 0;
          if (EnemyBullets[i].x< 0)
              EnemyBullets[i].x= game.width;
          if (EnemyBullets[i].y> game.height)
              EnemyBullets[i].y= 0;
          if (EnemyBullets[i].y< 0)
              EnemyBullets[i].y= game.height;
          enemyBulletLine[i].setTo(EnemyBullets[i].x, EnemyBullets[i].y, 10);
          EnemyBullets[i].counter++;
          if (EnemyBullets[i].counter > 80) {
              EnemyBullets[i].active = false;
              EnemyBullets[i].counter = 0;
          }
      }
  }

}

function CollisionTest(object1, object2) {
  if (object1.x> object2.cx - object2.size/2 &&
  object1.x< object2.cx + object2.size / 2 &&
  object1.y> object2.cy - object2.size / 2 &&
  object1.y< object2.cy + object2.size / 2)
      return true;
  else
      return false;
}


function CollisionTest2(object1, object2) {
  //function Collision_Test(x1, y1, w1, h1,
  //   x2, y2, w2, h2) {
  // this function tests if the two rects overlap
  var x1=object1.cx;
  var y1=object1.cy;
  var w1=object1.size;
  var h1 = object1.size;
  var x2 = object2.cx;
  var y2 = object2.cy;
  var w2 = object2.size;
  var h2 = object2.size;
//      console.log('rockx ' + x1 + ' ' + 'rocksize ' + w1);
//     console.log('rocky ' + y1 + ' ' + 'rocksize ' + h1);
//     console.log('shipx ' + x2 + ' ' + 'shipsize ' + w2);
//     console.log('shipy ' + y2 + ' ' + 'shipsize ' + h2);

  // get the radi of each rect
  var width1 = (w1 >> 1) - (w1 >> 3);
  var height1 = (h1 >> 1) - (h1 >> 3);

  var width2 = (w2 >> 1) - (w2 >> 3);
  var height2 = (h2 >> 1) - (h2 >> 3);

  // compute center of each rect
  var cx1 = x1 + width1;
  var cy1 = y1 + height1;

  var cx2 = x2 + width2;
  var cy2 = y2 + height2;

  //console.log(object1);
  //console.log(cx1 + ', ' + cy2 + ', ' + cx2 + ', ' + cy2);

  // compute deltas
  var dx = Math.abs(cx2 - cx1);
  var dy = Math.abs(cy2 - cy1);

  // test if rects overlap
  if (dx < (width1 + width2) && dy < (height1 + height2))
      return true;
  else
      // else no collision
      return false;

} // end Collision_Test


function pad(num, size) {
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

function Fire() {
  if (!gameStart) {
      gameStart = true;
      introText.visible = false;
      introText2.visible = false;
      if(gameOverText!=undefined)
          gameOverText.visible = false;
      gameOver = false;
      ShipsLeft=5;
  }
  else {
      if (MainShip.active) {
          var newBullet = getFirstBullet();
          if (newBullet != undefined) {
              newBullet.active = true;
              newBullet.x = MainShip.cx;
              newBullet.y = MainShip.cy;
              newBullet.direction = MainShip.direction;
          }
      }
  }
}

function getFirstBullet() {
  for (i = 0; i < Bullets.length ; i++) {
      if (!Bullets[i].active) {
          return Bullets[i];
      }
  }
}

function update() {

  if (!gameStart) {

      introText.scale.x= introTextSize;
      introText.scale.y= introTextSize;

      if (introTextSize < 1)
          introTextSize += .01;
      else {
          introText2.visible = true;
      }
  }
  else {
      MainShip.cx += MainShip.da;
      MainShip.cy += MainShip.db;
      checkWrap();
      drawShip();
      drawRocks();
      drawInfo();
      updateExplosions();
      updateBullets();
      DrawEnemy();
      if(RocksLeft == 0)
      {
          RockNumStart ++;
          Level++;
          Reset(true);
      }

      if (MainShip.active && MainShip.exploding && MainShip.explodeSwitch)
      {
          MainShip.active = false
          MainShip.explodeSwitch = false;
          for (var i = 0; i<NumParticles;i++)
          {
              MainShip.Particles[i].xv = randomExcluded(-40, 40, 0);
              MainShip.Particles[i].yv = randomExcluded(-40, 40, 0);
              MainShip.Particles[i].cx = MainShip.cx;
              MainShip.Particles[i].cy = MainShip.cy;
              MainShip.Particles[i].size = game.rnd.integerInRange(1,10);
              MainShip.ParticleLine[i].setTo(MainShip.cx, MainShip.cy, 10);
          }
          for (var i = 0;i<5;i++)
          {
              ShipExplode.BlowCenterX[i] = MainShip.cx
              ShipExplode.BlowCenterY[i] = MainShip.cy
              ShipExplode.BlowVelocityX[i] = randomExcluded(-5, 5, 0)
              ShipExplode.BlowVelocityY[i] = randomExcluded(-5, 5, 0)
              ShipExplode.BlowX[i] = MainShip.x[i];
              ShipExplode.BlowY[i] = MainShip.y[i];
              // ShipExplode.BlowX[i + 4] = MainShip.x[i];
              // ShipExplode.BlowY[i + 4] = MainShip.y[i];
          }
      }
//               console.log(MainShip.explodeCount+' '+MainShip.active + ' ' + MainShip.exploding + ' ' + MainShip.explodeSwitch);
      if (!MainShip.active && MainShip.exploding) {

          Blowup();
      }

      if (!MainShip.active && !MainShip.exploding) {
          ShipsLeft--;
          Reset(false);
      }

      //GAME OVER ?
      if (ShipsLeft == 0) {
          // player is dead
          gameStart = false;
          gameOver = true;
          gameOverText = game.add.text(game.width / 2, game.height / 2, "G A M E    O V E R \n\r\n Hit Space to Play Again", {
              font: "32px Arial",
              fill: "#ff0000",
              align: "center"
          });
          gameOverText.anchor.set(0.5);
          gameOverText.visible = true;
      } // end if

      for (var i = 0; i < NumEnemies; i++) {
          if (game.rnd.integerInRange(0, 1000) == 900 && !Enemies[i].active && !Enemies[i].exploding) {
            Enemies[i].active = true;
             // console.log(Enemies[i]);
          }
      }

      //Keyboard Input
      if (leftKey.isDown) {
          MainShip.direction += Degrees(5);
      }
      else if (rightKey.isDown) {
          MainShip.direction -= Degrees(5);
      }
      else if (upKey.isDown) {
          MainShip.forward = true;
      }
      else if (downKey.isDown) {
          MainShip.cx = game.rnd.integerInRange(0, game.world.width);
          MainShip.cy = game.rnd.integerInRange(0, game.world.height);
      }

  }
  if (MainShip.direction == Degrees(360))
      MainShip.direction = Degrees(0);
  if (MainShip.direction < Degrees(0))
      MainShip.direction = Degrees(355);

  if (MainShip.forward) {
      MainShip.da += ((Math.sin(MainShip.direction)) * MainShip.speed);
      MainShip.db += ((Math.cos(MainShip.direction)) * MainShip.speed);
  }
}

function Blowup(){

  for (i = 0; i< 5;i++)
  {
      MainShip.Particles[i].cx += MainShip.Particles[i].xv;
      MainShip.Particles[i].cy += MainShip.Particles[i].yv;
      MainShip.ParticleLine[i].x+= MainShip.Particles[i].xv/5;
      MainShip.ParticleLine[i].y += MainShip.Particles[i].yv/5;
  }

  ShipExplode.BlowX[0] = (ShipExplode.BlowCenterX[0] + (Math.sin(ShipExplode.BlowDirection)) * ShipSize * .83);
  ShipExplode.BlowY[0] = (ShipExplode.BlowCenterY[0] + (Math.cos(ShipExplode.BlowDirection)) * ShipSize * .83);
  ShipExplode.BlowX[1] = (ShipExplode.BlowCenterX[0] + (Math.sin(ShipExplode.BlowDirection + Degrees(150))) * ShipSize);
  ShipExplode.BlowY[1] = (ShipExplode.BlowCenterY[0] + (Math.cos(ShipExplode.BlowDirection + Degrees(150))) * ShipSize);

  ShipExplode.BlowX[5] = (ShipExplode.BlowCenterX[1] + (Math.sin(ShipExplode.BlowDirection + Degrees(150))) * ShipSize);
  ShipExplode.BlowY[5] = (ShipExplode.BlowCenterY[1] + (Math.cos(ShipExplode.BlowDirection + Degrees(150))) * ShipSize);
  ShipExplode.BlowX[6] = (ShipExplode.BlowCenterX[1] + (Math.sin(ShipExplode.BlowDirection + Degrees(180))) * (ShipSize * .58));
  ShipExplode.BlowY[6] = (ShipExplode.BlowCenterY[1] + (Math.cos(ShipExplode.BlowDirection + Degrees(180))) * (ShipSize * .58));

  ShipExplode.BlowX[2] = (ShipExplode.BlowCenterX[2] + (Math.sin(ShipExplode.BlowDirection + Degrees(180))) * (ShipSize * .58));
  ShipExplode.BlowY[2] = (ShipExplode.BlowCenterY[2] + (Math.cos(ShipExplode.BlowDirection + Degrees(180))) * (ShipSize * .58));
  ShipExplode.BlowX[3] = (ShipExplode.BlowCenterX[2] + (Math.sin(ShipExplode.BlowDirection + Degrees(210))) * ShipSize);
  ShipExplode.BlowY[3] = (ShipExplode.BlowCenterY[2] + (Math.cos(ShipExplode.BlowDirection + Degrees(210))) * ShipSize);

  ShipExplode.BlowX[7] = (ShipExplode.BlowCenterX[3] + (Math.sin(ShipExplode.BlowDirection + Degrees(210))) * ShipSize);
  ShipExplode.BlowY[7] = (ShipExplode.BlowCenterY[3] + (Math.cos(ShipExplode.BlowDirection + Degrees(210))) * ShipSize);
  ShipExplode.BlowX[4] = (ShipExplode.BlowCenterX[3] + (Math.sin(ShipExplode.BlowDirection)) * ShipSize * .83);
  ShipExplode.BlowY[4] = (ShipExplode.BlowCenterY[3] + (Math.cos(ShipExplode.BlowDirection)) * ShipSize * .83);

  ShipExplode.shipBlastLine[0].setTo(ShipExplode.BlowX[0], ShipExplode.BlowY[0], ShipExplode.BlowX[1], ShipExplode.BlowY[1]);
  ShipExplode.shipBlastLine[1].setTo(ShipExplode.BlowX[5], ShipExplode.BlowY[5], ShipExplode.BlowX[6], ShipExplode.BlowY[6]);
  ShipExplode.shipBlastLine[2].setTo(ShipExplode.BlowX[2], ShipExplode.BlowY[2], ShipExplode.BlowX[3], ShipExplode.BlowY[3]);
  ShipExplode.shipBlastLine[3].setTo(ShipExplode.BlowX[7], ShipExplode.BlowY[7], ShipExplode.BlowX[4], ShipExplode.BlowY[4]);
 // console.log(ShipExplode.BlowX[0]);


  for (i = 0; i < 8; i++)
  {
      ShipExplode.BlowCenterX[i] += ShipExplode.BlowVelocityX[i];
      ShipExplode.BlowCenterY[i] += ShipExplode.BlowVelocityY[i];
   }
  ShipExplode.BlowDirection += Degrees(5);
  if (ShipExplode.BlowDirection = Degrees(360))
      ShipExplode.BlowDirection = Degrees(0);

  MainShip.explodeCount++;
 // console.log(MainShip.explodeCount);
  if (MainShip.explodeCount > ShipExplodeCount)
  {
      MainShip.exploding = false;
      MainShip.explodeCount = 0;
  }


}


function drawInfo() {
  // this function draws all the information at the top of the screen
  // build up score string
  infoText2.visible = true;
  var scoreText = pad(Score, 10);
  var info = "SCORE: " + scoreText + '     ';
  if (Score > HighScore)
      HighScore = Score;
  scoreText = (pad(HighScore, 10));
  info += "HIGH SCORE: " + scoreText + '     ';

  // Level
  info += "LEVEL: " + (Level) + '     ';

  // draw ships
  info += "SHIPS: " + ShipsLeft;
  infoText2.setText(info);

} // end Draw_Info

function drawShip() {
  var i, randomx, randomy;
  // body of ship
  MainShip.x[0] = (MainShip.cx + (Math.sin(MainShip.direction)) * ShipSize * .83);
  MainShip.y[0] = (MainShip.cy + (Math.cos(MainShip.direction)) * ShipSize * .83);
  MainShip.x[1] = (MainShip.cx + (Math.sin(MainShip.direction + Degrees(150))) * ShipSize);
  MainShip.y[1] = (MainShip.cy + (Math.cos(MainShip.direction + Degrees(150))) * ShipSize);
  MainShip.x[2] = (MainShip.cx + (Math.sin(MainShip.direction + Degrees(180))) * ShipSize * .58);
  MainShip.y[2] = (MainShip.cy + (Math.cos(MainShip.direction + Degrees(180))) * ShipSize * .58);
  MainShip.x[3] = (MainShip.cx + (Math.sin(MainShip.direction + Degrees(210))) * ShipSize);
  MainShip.y[3] = (MainShip.cy + (Math.cos(MainShip.direction + Degrees(210))) * ShipSize);
  // thruster
  MainShip.x[4] = (MainShip.cx + (Math.sin(MainShip.direction + Degrees(160))) * ShipSize * .91);
  MainShip.y[4] = (MainShip.cy + (Math.cos(MainShip.direction + Degrees(160))) * ShipSize * .91);
  MainShip.x[5] = (MainShip.cx + (Math.sin(MainShip.direction + Degrees(180))) * ShipSize * 1.22);
  MainShip.y[5] = (MainShip.cy + (Math.cos(MainShip.direction + Degrees(180))) * ShipSize * 1.22);
  MainShip.x[6] = (MainShip.cx + (Math.sin(MainShip.direction + Degrees(200))) * ShipSize * .91);
  MainShip.y[6] = (MainShip.cy + (Math.cos(MainShip.direction + Degrees(200))) * ShipSize * .91);


  shipLine[0].setTo(MainShip.x[0], MainShip.y[0], MainShip.x[1], MainShip.y[1]);
  shipLine[1].setTo(MainShip.x[1], MainShip.y[1], MainShip.x[2], MainShip.y[2]);
  shipLine[2].setTo(MainShip.x[2], MainShip.y[2], MainShip.x[3], MainShip.y[3]);
  shipLine[3].setTo(MainShip.x[3], MainShip.y[3], MainShip.x[0], MainShip.y[0]);

  shipLine[4].setTo(MainShip.x[4], MainShip.y[4], MainShip.x[5], MainShip.y[5]);
  shipLine[5].setTo(MainShip.x[5], MainShip.y[5], MainShip.x[6], MainShip.y[6]);

  /*
              // Shields
  if (MainShip.Shields & MainShip.ShieldStrength > 0) {
      Picture1.ForeColor = RGB(MainShip.ShieldStrength, MainShip.ShieldStrength, MainShip.ShieldStrength);
      MainShip.ShieldStrength = MainShip.ShieldStrength - 1;
      Picture1.Circle(MainShip.cx,
          MainShip.cy);
  }


  if (360 - UnDegrees(Direction) > 50)
      BaseStart = Direction + Degrees(50);
  else
      BaseStart = Direction + Degrees(50) - Degrees(360);

  if (360 - UnDegrees(Direction) > 130)
      BaseEnd = Direction + Degrees(130);
  else
      BaseEnd = Direction + Degrees(130) - Degrees(360);

  */
}

function DrawEnemy() {
  for (i = 0; i < NumEnemies; i++) {
      if (Enemies[i].active) {
          //Picture1.ForeColor = QBColor(Enemies[i].Color)
          Enemies[i].size = 60 - (i * 30);


          enemyLine[0].setTo(Enemies[i].cx - (Enemies[i].size / 2), Enemies[i].cy, Enemies[i].cx + (Enemies[i].size / 2), Enemies[i].cy);
          enemyLine[1].setTo(Enemies[i].cx + (Enemies[i].size / 2), Enemies[i].cy, Enemies[i].cx + Math.floor(Enemies[i].size * 0.25), Math.floor(Enemies[i].cy - Enemies[i].size * 0.25));
          enemyLine[2].setTo(Enemies[i].cx + Math.floor(Enemies[i].size * 0.25), Math.floor(Enemies[i].cy - Enemies[i].size * 0.25), Enemies[i].cx - Math.floor(Enemies[i].size * 0.25), (Enemies[i].cy - Math.floor(Enemies[i].size * 0.25)));
          enemyLine[3].setTo(Enemies[i].cx - Math.floor(Enemies[i].size * 0.25), Math.floor(Enemies[i].cy - Enemies[i].size * 0.25), Enemies[i].cx - (Enemies[i].size / 2), Enemies[i].cy);

          enemyLine[4].setTo(Enemies[i].cx - (Enemies[i].size / 2), Enemies[i].cy, Enemies[i].cx - Math.floor(Enemies[i].size * 0.25), (Enemies[i].cy + Math.floor(Enemies[i].size * 0.25)));
          enemyLine[5].setTo(Enemies[i].cx - Math.floor(Enemies[i].size * 0.25), (Enemies[i].cy + Math.floor(Enemies[i].size * 0.25)), Enemies[i].cx + Math.floor(Enemies[i].size * 0.25), (Enemies[i].cy + Math.floor(Enemies[i].size * 0.25)));
          enemyLine[6].setTo(Enemies[i].cx + Math.floor(Enemies[i].size * 0.25), (Enemies[i].cy + Math.floor(Enemies[i].size * 0.25)), Enemies[i].cx + (Enemies[i].size / 2), Enemies[i].cy);

          Enemies[i].cx += Enemies[i].xv;
          Enemies[i].cy += Enemies[i].yv;

         // console.log(Enemies[i]);

          //sometimes an enemy gets stuck in the corner
           //if (Enemies[i].cx == 0 && Enemies[i].cy == 0)
          // {
          //     Enemies[i].xv = -15;
          //     Enemies[i].yv = -15;
          // }

          //velocity check
          if (Math.abs(Enemies[i].xv) > 15)
              Enemies[i].xv = 15;
          if (Math.abs(Enemies[i].yv) > 15)
              Enemies[i].yv = 15;


          if (Enemies[i].cx < 0) {
              Enemies[i].active = false;
              Enemies[i].cx = game.width;
          }

          if (Enemies[i].cx > game.width) {
              Enemies[i].active = false;
              Enemies[i].cx = 0;
          }

          //verticle screenwrap
          if (Enemies[i].cy < 0)
              Enemies[i].cy = game.height;
          if (Enemies[i].cy > game.height)
              Enemies[i].cy = 0;

          //change direction
          if (i != 10) {
              if (game.rnd.integerInRange(1, 1000) == 800) {
                  Enemies[i].xv = randomExcluded(-14, 14, 0);
                  Enemies[i].yv = randomExcluded(-14, 14, 0);
              }
          }


          if (game.rnd.integerInRange(1, 1000) == 900) {
              for (var bulletup = 0; bulletup < 5; bulletup++) {
                  if (!EnemyBullets[bulletup].active) {
                      EnemyBullets[bulletup].active = true;
                      EnemyBullets[bulletup].cx= Enemies[i].cx;
                      EnemyBullets[bulletup].cy= Enemies[i].cy;
                      //give missile direction
                      if (Level < 8) {
                          EnemyBullets[bulletup].type = 1;
                      }
                      else {
                          EnemyBullets[bulletup].type = 2;
                      }

                      if (MainShip.cx < Enemies[i].cx)
                          EnemyBullets[bulletup].xv = -15;
                      if (MainShip.cx > Enemies[i].cx)
                          EnemyBullets[bulletup].xv = 15;
                      if (MainShip.cy < Enemies[i].cy)
                          EnemyBullets[bulletup].yv = -15;
                      if (MainShip.cy > Enemies[i].cy)
                          EnemyBullets[bulletup].yv = 15;

                      EnemyBullets[bulletup].dx = Enemies[i].cx- MainShip.cx;
                      EnemyBullets[bulletup].dy = Enemies[i].cy- MainShip.cy;
                      EnemyBullets[bulletup].direction = Math.atan2(EnemyBullets[i].dy, EnemyBullets[i].dx);
                  }
              }
          }
          //activate kamikazees
          if (Level == 10) {
              if (MainShip.cx > Enemies[i].cx)
                  Enemies[i].xv++;
              if (MainShip.cx < Enemies[i].cx)
                  Enemies[i]--;
              if (MainShip.cy > Enemies[i].cy)
                  Enemies[i].yv++;
              if (MainShip.cy > Enemies[i].cy)
                  Enemies[i].yv--;
          }

          //ship collision
          if (CollisionTest2(Enemies[i],MainShip))
          {
              //console.log('enemy hit ship!');
              MainShip.exploding = true;
              MainShip.explodeSwitch = true;
              Enemies[i].exploding = true;
              //MsgBox "collision"
          }
      }
  }
}

function drawRocks() {
  var i, j;
  for (i = 0; i <= NumRocks; i++) {
      //Picture1.ForeColor = Information.RGB(255, 255, 255);
      if (Rocks[i].active) {
          for (j = 0; j < 6; j++) {
              Rocks[i].pointX[0] =
                  (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(45))) * (Rocks[i].size)); // * 0.75))
              Rocks[i].pointY[0] =
                  (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(45))) * (Rocks[i].size)); // * 0.75))
              Rocks[i].pointX[1] = (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(90))) * Rocks[i].size);
              Rocks[i].pointY[1] = (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(90))) * Rocks[i].size);
              Rocks[i].pointX[2] =
                  (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(170))) * (Rocks[i].size)); // * 0.55))
              Rocks[i].pointY[2] =
                  (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(170))) * (Rocks[i].size)); // * 0.55))
              Rocks[i].pointX[3] =
                  (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(180))) * (Rocks[i].size)); // * 0.55))
              Rocks[i].pointY[3] =
                  (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(180))) * (Rocks[i].size)); // * 0.55))
              Rocks[i].pointX[4] = (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(200))) * Rocks[i].size);
              Rocks[i].pointY[4] = (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(200))) * Rocks[i].size);
              Rocks[i].pointX[5] = (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(270))) * Rocks[i].size);
              Rocks[i].pointY[5] = (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(270))) * Rocks[i].size);
              Rocks[i].pointX[6] = (Rocks[i].cx + (Math.sin(Rocks[i].rotate + Degrees(300))) * Rocks[i].size);
              Rocks[i].pointY[6] = (Rocks[i].cy + (Math.cos(Rocks[i].rotate + Degrees(300))) * Rocks[i].size);
              // Rocks[i].PointX(j) = (Rocks[i].cx + (Math.sin(Rocks[i].Rotate + Degrees(j * 30))) * Rocks[i].size)
              // Rocks[i].PointY(j) = (Rocks[i].cy + (Math.cos(Rocks[i].Rotate + Degrees(j * 30))) * Rocks[i].size)
              if (j < 6)
                  Rocks[i].rockLine[j].setTo(Rocks[i].pointX[j], Rocks[i].pointY[j], Rocks[i].pointX[j + 1], Rocks[i].pointY[j + 1]);
          }

          Rocks[i].rockLine[j].setTo(Rocks[i].pointX[6], Rocks[i].pointY[6], Rocks[i].pointX[0], Rocks[i].pointY[0]);
      }

      Rocks[i].cx += Rocks[i].xv;
      Rocks[i].cy += Rocks[i].yv;

      //(MainShip.Shields == false || MainShip.ShieldStrength == 0)
      // collision check
      if (Rocks[i].active &&
          CollisionTest2(Rocks[i], MainShip)) {
          //console.log('rock hit ship!');
          MainShip.explodeSwitch = true;
          MainShip.exploding = true;
      }

      for (j = 1; j <= NumEnemies; j++) {
          if (Rocks[i].active &&
          Enemies[j].active &&
              CollisionTest2(Rocks[i], Enemies[j])) {
              Enemies[j].exploding = true;
              //console.log('rock hit enemy!');
          }
      }


      // wrap Rocks
      if (Rocks[i].cx < 0)
          Rocks[i].cx = game.width;
      if (Rocks[i].cx > game.width)
          Rocks[i].cx = 0;
      if (Rocks[i].cy < 0)
          Rocks[i].cy = game.height;
      if (Rocks[i].cy > game.height)
          Rocks[i].cy = 0;

      Rocks[i].rotate += 0.01;

  }
}

function RockExplosion(rock) {
  var i = 0;
  //rock explosion
  if ((rock.exploding)) {
      if ((rock.explodeSwitch)) {
          for (i = 0; i < 5; i++) {
              rock.Particles[i].xv = randomExcluded(-10, 10, 0);
              rock.Particles[i].yv = randomExcluded(-10, 10, 0);
              rock.Particles[i].cx= rock.cx;
              rock.Particles[i].cy= rock.cy;
              rock.Particles[i].size = randomExcluded(2, 12, 0);
              rock.explodeCount = 0;
              rock.explodeSwitch = false;
              rock.ParticleLine[i].setTo(rock.cx, rock.cy, 10);
          }
      }

  }

}

function updateExplosions() {
  for (j = 0; j < NumRocks; j++) {
      if (Rocks[j].exploding && !Rocks[j].explodeSwitch) {
          for (i = 0; i < 5; i++) {
              Rocks[j].Particles[i].cx+= Rocks[j].Particles[i].xv;
              Rocks[j].Particles[i].cy+= Rocks[j].Particles[i].yv;

              Rocks[j].Particles[i].cy+= Rocks[j].Particles[i].yv;

              Rocks[j].ParticleLine[i].x= Rocks[j].Particles[i].cx;
              Rocks[j].ParticleLine[i].y= Rocks[j].Particles[i].cy;
              // Debug.Print("X: "+ rock.Particles[0].x.ToString() + " Y: " + rock.Particle[0].y.ToString());

              Rocks[j].explodeCount++;

              if (Rocks[j].explodeCount == 100) {
                  Rocks[j].explodeCount = 0;
                  Rocks[j].exploding = false;
              }
          }
      }
  }
}

function EnemyExplosion(enemy) {
  var i = 0;

  //enemy explosion

  if (enemy.exploding == true) {
      enemy.active = false;

      if (!enemy.explodeSwitch) {
          for (i = 0; i < NumParticles; i++) {
              enemy.Particle[i] = new Particle();
              enemy.Particle[i].xspeed = randomExcluded(-40, 40, 0);
              enemy.Particle[i].yspeed = randomExcluded(-40, 40, 0);
              enemy.Particle[i].cx = enemy.cx;
              enemy.Particle[i].cy = enemy.cy;
              enemy.Particle[i].size = 2 + game.rnd.integerInRange(1, 11);
              enemy.Particle[i].Color = enemy.Color;
              enemy.explodeCount = 0;
              enemy.explodeSwitch = true;

          }
      }

      enemy.explodeCount++;
      for (i = 0; i < NumParticles; i++) {

          enemy.Particle[i].cx+= enemy.Particle[i].xv;
          enemy.Particle[i].cy+= enemy.Particle[i].yv;
      }

      //setup next enemy
      if (enemy.explodeCount > 99) {
          enemy.explodeCount = 0;
          enemy.exploding = false;
          enemy.explodeSwitch = false;
          //enemy.color = Color.FromArgb(game.rnd.integerInRange(200, 255), game.rnd.integerInRange(200, 255), game.rnd.integerInRange(200, 255));
          enemy.size = 60 - (i * 40);

          if (game.rnd.integerInRange(-10, 10) < 0) {
              enemy.cx = game.Width;
              enemy.xv = -15;
          }
          else {
              enemy.cx = 0;
              enemy.xv = 15;
          }
      }
  }

}


function checkWrap() {
  if (MainShip.cy > game.height)
      MainShip.cy = 0;
  if (MainShip.cy < 0)
      MainShip.cy = game.height;
  if (MainShip.cx > game.width)
      MainShip.cx = 0;
  if (MainShip.cx < 0)
      MainShip.cx = game.width;
}

function render() {
  if (gameStart) {
      if (MainShip.active) {
          for (var i = 0; i <= 3; i++) {
              game.debug.geom(shipLine[i], '#FFFFFF');
              //game.debug.lineInfo(shipLine[i], 32, 32);
          }
      }

      if (MainShip.exploding) {
          for (j = 0; j < 5; j++) {
              //console.log(MainShip.ParticleLine[j]);
              game.debug.geom(MainShip.ParticleLine[j], '#FF0000');
              game.debug.geom(ShipExplode.shipBlastLine[j], '#FFFFFF');
          }
      }

      if (MainShip.forward && MainShip.active) {
          for (var i = 4; i <= 5; i++) {
              game.debug.geom(shipLine[i], '#FF0000');
          }
      }

      for (var i = 0; i < NumRocks; i++) {
          if (Rocks[i].active) {
              for (var j = 0; j <= 6; j++) {
                  game.debug.geom(Rocks[i].rockLine[j], '#FFFFFF');
              }
          }
      }
      for (var i = 0; i < NumRocks; i++) {
          if (Rocks[i].exploding) {
      for (j = 0; j < 5; j++) {
          game.debug.geom(Rocks[i].ParticleLine[j], '#FF0000');
      }

          }
      }
      for (var i = 0; i < NumEnemies; i++) {
          if (Enemies[i].active) {
              for (var j = 0; j < 7; j++) {
                  game.debug.geom(enemyLine[j], '#00FF00');
              }
          }

      }

      for (var i = 0; i < 5; i++) {
          if (Bullets[i].active) {
              game.debug.geom(bulletLine[i], '#FF0000');
          }
      }

      for (var i = 0; i < 5; i++) {
          if (EnemyBullets[i].active) {
              game.debug.geom(enemyBulletLine[i], '#00FF00');
          }
      }
      }
  }

