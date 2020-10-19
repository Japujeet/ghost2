var ghost,ghostImg;
var tower,towerImg;
var door,doorImg,doorGrp;
var climber,climberImg,climberGrp,invisibleClimber,invisibleClimberGrp;
var spookySound;
var play=1,end=0;
var gamestate=play;

function preload(){
  ghostImg=loadImage("ghost-standing.png");
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  spookySound=loadSound("spooky.wav");
}

function setup(){
 createCanvas(400,400);
  ghost=createSprite(200,200,10,10);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  tower=createSprite(200,200);
  tower.addImage(towerImg);
  tower.velocityY=4;
  
  doorGrp=new Group();
  climberGrp=new Group();
  invisibleClimberGrp=new Group();
 
}

function draw(){
  spookySound.loop();
  
  if(gamestate===play){
    Door();
  if(tower.y>300){
    tower.y=200
  }
  ghost.depth=3;
  if(keyWentDown("space")){
    ghost.velocityY=ghost.velocityY-10;
  }
  if(keyDown("right_arrow")){
    ghost.velocityX=ghost.velocityX+1;
  }
  if(keyDown("left_arrow")){
    ghost.velocityX=ghost.velocityX-1;
  }
  if(climberGrp.isTouching(ghost)){
    ghost.velocityY=0;
    ghost.velocityX=0;
    
  }
   if(ghost.isTouching(invisibleClimberGrp)||ghost.y>400){
     ghost.destroy();
     gamestate=end;
   }
  ghost.velocityY=ghost.velocityY+0.5;
  drawSprites();
  }
  if(gamestate===end){
    fill("black");
    textSize(50);
    text("GAME OVER!",50,200);
  }
  
}

function Door(){
  if(frameCount%200===0){
    door=createSprite(200,-5,10,10);
  door.x=Math.round(random(50,350));
 door.velocityY=4;
  door.addImage(doorImg);
    door.lifetime=110; 
 door.depth=2;
doorGrp.add(door) ;
    climber=createSprite(door.x,door.y+50,10,10);
    invisibleClimber=createSprite(climber.x,climber.y+10,50,10);
    invisibleClimber.debug=true;
    invisibleClimber.velocityY=4;
    climber.velocityY=4;
    climber.lifetime=110;
    climber.addImage(climberImg);
    climberGrp.add(climber);
    invisibleClimberGrp.add(invisibleClimber);
    
    }
  
}

