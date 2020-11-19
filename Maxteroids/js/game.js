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
 Thrust();
  });

  _scene.input.keyboard.on('keydown_DOWN', function (event) {
Hyperspace();
  });

  _scene.input.keyboard.on('keydown_SPACE', function (event) {
Fire();
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

 

function Thrust(direction){
  player.shape.points.forEach(point => {
    point.x += ((Math.sin(direction)) );
    point.y += ((Math.cos(direction)) );
  });
}

function Rotate(dir) {
  player.angle += player.rotateSpeed * dir;
}

function Fire(){
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
  }
}

function initShip(){
  player.x = width/2;
  player.y = height/2;  
  player.movingForward = false;
  player.speed = 0.1;
  player.velX = 0;
  player.velY = 0;
  player.rotateSpeed = 0.001;
  player.radius = 15;
  player.angle = 0;
}

function drawShip(){
  var shape = new Phaser.Geom.Polygon(playerShape);
    graphics.lineStyle(2, 0xffffff);
    graphics.beginPath();
   let radians = player.angle / Math.PI * 180;
       
   graphics.moveTo(player.x+shape.points[0].x* Math.cos(radians), player.y+shape.points[0].y*Math.sin(radians));
   for (var i = 1; i < shape.points.length; i++)
    {
        graphics.lineTo(player.x+shape.points[i].x* Math.cos(radians), player.y+shape.points[i].y*Math.sin(radians));
    }

  //   for (let i = 0; i < 3; i++) {
  //     ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + radians), this.y - this.radius * Math.sin(vertAngle * i + radians));
  // }
    graphics.closePath();
    graphics.strokePath();
    player.shape = shape;
}

function UpdatePlayer(){
        let radians = player.angle / Math.PI * 180;
 
        if (player.movingForward) {
            player.velX += Math.cos(radians) * player.speed;
            player.velY += Math.sin(radians) * player.speed;
        }

        if (player.x < player.radius) {
            player.x = width;
        }
        if (player.x > canvas.width) {
            player.x = radius;
        }
        if (player.y < player.radius) {
            player.y = height;
        }
        if (player.y > canvas.height) {
            player.y = radius;
        }

        player.velX *= 0.99;
        player.velY *= 0.99;
 
        player.x -= player.velX;
        player.y -= player.velY;
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
      UpdatePlayer();
    //   player.shape.points.forEach(point => {
    //   point.x += player.direction;
    //   point.y += player.direction;
    //       });
    //player.shape.setTo(player.points);
}
}