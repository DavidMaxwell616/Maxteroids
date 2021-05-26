const game = new Phaser.Game(500, 500, Phaser.ARCADE, 'game', {
  create,
  update,
});


function create ()
{
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = '#000000';
//showTitle();
var style = { font: "72px Arial", fill: '#ff0000', align: "center" };
game.add.text(game.width / 2, game.height / 3, "SNEAKERS", style);
}


function showTitle() {
  var style = {
    fontFamily: 'Arial',
    fontStyle: 'Bold',
    fontSize: 72,
    color: '#ff0000',
    align:'center'
  }
  introText = game.add.text(game.width / 2, game.height / 2, "MAXTEROIDS", style);
  introText.anchor.setTo(0.5);
 
  introText2 = game.add.text(game.width / 2, game.height * .75, introTextString, {
    fontFamily: 'Arial',
    fontStyle: 'Bold',
    fontSize: 24,
    color: '#ff0000',
    align:'center'
  });
  introText2.anchor.setTo(0.5);
  introText2.visible = true;
  infoText2 = game.add.text(game.width / 2, 20, "", {
    fontFamily: 'Arial',
    fontStyle: 'Bold',
    fontSize: 18,
    color: '#ffffff',
    align:'center'
  });
  infoText2.anchor.setTo(0.5);
  infoText2.visible = false; 
}

function update(){
  // console.log(introText.x,introText.y,introText.visible);
  // introText.scaleX= introTextSize;
  // introText.scaleY= introTextSize;
  // if (introTextSize < 1){
  //   introText.y -= 3;
  //   introTextSize += .03;
  // }
  // else {
  //     introText2.visible = true;
  // }
}


