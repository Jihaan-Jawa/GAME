
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count=0

var backedground,ground,player,rand,groundimg,playerimg,backedgroundimg,gameoverimg,gameover,restart,count,obstaclesGroup,live1,live2,live3,live4,liveimg;
var invisibleground,obstacleimg,restartimg;

function preload(){
  groundimg=loadImage("ground.png")
 liveimg=loadImage("live.png")
  backedgroundimg=loadImage("bg3.jpg")
  obstacleimg=loadImage("obstacle4.png")
  gameoverimg=loadImage("over.png")
  restartimg=loadImage("restart.png")
}
function setup() {
  createCanvas(1600,800);

  backedground=createSprite(800,400,20,20);
  backedground.velocityX=-5
 backedground.addImage(backedgroundimg)
   ground = createSprite(900,780,1600,40);
  ground.addImage(groundimg)
  ground.scale=0.2
ground.velocityX=-5
invisibleground=createSprite(800,760,1600,30)
invisibleground.setCollider("rectangle")
invisibleground.visible=false;
player=createSprite(200,650,100,100)
//.addAnimation(playerimg)
player.scale=0.5
player.setCollider("circle")
obstaclesGroup=createGroup()
 gameover=createSprite(800,360,30,30)
    gameover.addImage(gameoverimg);
    gameover.scale=0.5
gameover.visible=false;
restart=createSprite(800,500,30,30);
restart.addImage(restartimg);
restart.scale=0.09
restart.visible=false
playerimg=p5Gif.loadGif("player3.gif",function(){
  this.loop({x:200,y:600})

})
//live1=createSprite(1500,50,20,20);
//live1.addImage(liveimg);
//live1.scale=0.05;
//live2=createSprite(1450,50,20,20);
//live2.addImage(liveimg);
//live2.scale=0.05;
//live3=createSprite(1400,50,20,20);
//live3.addImage(liveimg);
//live3.scale=0.05;
//live4=createSprite(1350,50,20,20);
//live4.addImage(liveimg);
//live4.scale=0.05;
}

function draw() {
  background(0);
  textSize(30);
textFont("Georgia");
stroke("red");
fill("black");
text("SCORE",300,50)

    if(ground.x<700){
   ground.x=800
    }
    if(backedground.x<700){
backedground.x=width/2
    }
    if (gameState===PLAY){
      count=count+1
      if(keyDown("space") && player.y >= 159) {
        player.velocityY = -15;
        count=count+5;
      }
    
     player.velocityY = player .velocityY + 0.8
    
      if (ground.x < 0){
        ground.x = ground.width/2;
      }
    
    
    
      if(obstaclesGroup.isTouching(player)){
          gameState = END;
         
      }
      
    }
    
  else if (gameState === END) {
   
    gameover.visible=true;
    restart.visible=true;
    ground.velocityX = 0;
    player.velocityY = 0;
    backedground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
  
    obstaclesGroup.setLifetimeEach(-1);
    
   // obstaclesGroup.setLifetimeEach(-1);
   
    }
    if(mousePressedOver(restart)){
      reset();

    }
    
    player.collide(invisibleground)
    score=0
    spawnobstaclesGroup();
    
  drawSprites();
  
  text("SCORE:-"+count,100,50)
  
}
function  spawnobstaclesGroup(){
      if(frameCount%200===0){
        var obstacle=createSprite(800,730,20,20);
        obstacle.velocityX=-6
        obstacle.lifetime=1000
        obstacle.addImage(obstacleimg);
        obstacle.scale=0.4
        obstacle.setCollider("circle")
        obstaclesGroup.add(obstacle);
      }

}
function reset (){
  gameState=PLAY
  gameover.visible=false;
  restart.visible=false;
  obstaclesGroup.destroyEach()
  backedground.velocityX=-4
  score=0
}