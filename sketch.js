var backImage,backgr;
var player, ;
var ground,ground_img;

var FoodGroup, diamond_img;
var obstaclesGroup, obstacle_img;

var gameState ="start";
var gameOver;
var score=0;

//the preload function to load my images...

function preload(){
  backImage=loadImage("background.png");
  player_running = loadImage("princess.jpg");
 
  obstacle_img = loadImage("stone.jpg");
  diamond_img = loadImage("diamond.jpg");
  
}

//the setup function to create sprites, add images with suitable parameters and create default functions...

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addImage("princess.jpg");
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;

  
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}



function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(FoodGroup.isTouching(player)) {
      FoodGroup.destroyEach();
    score = score + 2;
    }

    switch(score) {
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnFood();
    spawnObstacles();
 
    //the function to end the game...

    if(obstaclesGroup.isTouching(player)){ 
      gameState =="end"
      player.scale=0.08;
        textSize(100);
      text("GameOver", 150, 250);
      textSize(50);
      text("You Won !!!", 150, 450);
     
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("red");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  //the code  to spawn the food;

  if (frameCount % 80 === 0) {
    var diamon = createSprite(600,250,40,10);
    diamon.y = random(120,200);    
    diamon.addImage(diamond_img);
    diamon.scale = 0.05;
    diamon.velocityX = -5;

     //assign lifetime to the variable

     diamon.lifetime = 300;
    player.depth = diamon.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(diamon);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    //assign scale and lifetime to the obstacle

    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


  
