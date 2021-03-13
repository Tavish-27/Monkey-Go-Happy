var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score , backgroundImage

function preload(){
  
  
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");          
  backgroundImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
 
}
function setup() {
   createCanvas(600, 600);
  var survivalTime=0;
   bg = createSprite(0 , 0 , 30 , 50);
  bg.addImage(backgroundImage);
  bg.velocityX = -3;
  bg.scale = 1.5;
  
   monkey=createSprite(80,315,20,20);
   monkey.addAnimation("moving", monkey_running);
  
   monkey.scale=0.1
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible = false;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background("white");
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(FoodGroup.isTouching(monkey)) {
    score = score + 2
    FoodGroup.destroyEach();
    monkey.scale += 0.1;
  }
  if(bg.x<0) {
    bg.x = bg.width/2;
  } 
  switch(score) {
       case 10 : monkey.scale = 0.12;
        break;
       case 20 : monkey.scale = 0.14;
        break;
       case 30 : monkey.scale = 0.16;
        break;
       case 40 : monkey.scale = 0.18;
        break;
       case 50 : monkey.scale = 0.20;
        break;
  }
  
  
    if(keyDown("space") ) {
      monkey.velocityY = -12;
    }

    monkey.velocityY = monkey.velocityY + 0.8;
  
    monkey.collide(ground);   

    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 500,50);        
  
  
    if(obstaclesGroup.isTouching(monkey)){
        ground.velocityX = 0;
        monkey.velocityY = 0;
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
        monkey.scale = 0.1;
    
    }
  

} 


function spawnFood() {
  if (frameCount % 80 === 0) {
    banana = createSprite(650,250,40,10);
    banana.y = random(120,200);    
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;

     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -6;
    
   
    obstacle.addImage(stoneImage);
    obstacle.scale=0.15;     
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}