var trex,trex_running,trex_collided;
var ground,invisibleGround,groundImage;

var cloudGroup, cloudImage;
var obstaclesGroup, obstacles1, obstacles2, obstacles3, obstacles4, obstacles5, obstacles6;

var PLAY = 1;
var END = 0;
var gamestate = PLAY;

var count = 0 

var restart, gameOver;

function preload(){
  
  
  trex_running=loadAnimation("trex1.png" ,"trex3.png" ,"trex4.png");
  
trex_collided=loadImage("trex_collided.png");
  
  groundImage= loadImage("ground2.png");
  
  obstacles1= loadImage ("obstacle1.png");
  
  obstacles2= loadImage ("obstacle2.png");
  
  obstacles3= loadImage ("obstacle3.png");
  
  obstacles4= loadImage ("obstacle4.png");
  
  obstacles5= loadImage ("obstacle5.png");
  
  obstacles6= loadImage ("obstacle6.png");
  
  cloudImage= loadImage ("cloud.png");
  
  restart = loadImage ("restart.png");
  
  gameOver = loadImage ("GameOver.png");
  
  
}


function setup() {
 canvas = createCanvas(displayWidth - 20, displayHeight - 30);
trex=createSprite(40, 360, 20, 20);
  trex.addAnimation("rex",trex_running);
trex.scale= 0.6;  
  
  ground=createSprite(200 , 380 , 400, 20);
  ground.addImage("ground",groundImage);
  
  invisibleGround=createSprite(200 , 390,400 ,20);
  invisibleGround.visible=false;
  
  gameOver=createSprite(200 , 140, 20 ,20);
  gameOver.addImage("gameOver",gameOver);
  gameOver.visible=false;
  
  restart=creatSprite(200 , 200, 30, 30);
  restart.addImage("restart",restart);
  restart.visible=false;
  
  
    obstaclesGroup= new Group();
    cloudGroup= new Group();
}



function draw() {
  background(20);
  text("Score: "+count, 250, 100);
  if(gamestate===PLAY){
    
    ground.velocityX = -(6+3*count/100);
  
  //scoring
  var count = Math.round(getFrameRate()/60);
  
    
      if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
      //jump when the space key is pressed
  if(keyDown("space") && trex.y >= 359){
    trex.velocityY = -10 ;
  }
    
     
  //add gravity
  trex.velocityY = trex.velocityY + 0.8; 
    
    spawnClouds();
    spawnObstacles();
  if(obstaclesGroup.isTouching(trex)){
  gamestate = END;
  
  }
    
  }else if(gamestate===END){
    restart.visible=true;
    gameOver.visible=true;
    
    ground.velocityX = 0;
    
     obstaclesGroup.setVelocityEach(0);
    
    cloudsGroup.setVelocityEach(0);
    
    trex.velocityY = 0;
    
    trex.changeAnimation("collided",trex_collided);
    
     obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
       reset();
  }
  }
    
  
    
  
    
  

  
  //console.log(trex.y);
  

  

  
  
  trex.collide(invisibleGround);
  

  
  drawSprites();
}


function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(400,320,40,10);
    cloud.y =Math.round (random(280,320));
    cloud.addImage("cloudImage",cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(400,365,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand =Math.round (random(1,6));
    switch(rand){
      case 1:obstacle.addImage("obstacles1",obstacles1);
        break;
        
        case 2:obstacle.addImage("obstacles2",obstacles2);
        break;
        
        case 3:  obstacle.addImage("obstacles3",obstacles2);
        break;
        
         case 4:  obstacle.addImage("obstacles4",obstacles4);
        break;
        
         case 5:  obstacle.addImage("obstacles5",obstacles5);
        break;
        
         case 6:  obstacle.addImage("obstacles6",obstacles6);
        break;
        
        default: break
    }
        

    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 70;
        
        obstaclesGroup.add (obstacle);
  }
}

  function reset(){
    gamestate = PLAY;
    restart.visible=false;
    gameOver.visible=false;
    trex.changeAnimation("running",trex_running);
    count = 0;
    
     obstaclesGroup.destroyEach();
    cloudsGroup.destroyEach();
    
  
  
  }