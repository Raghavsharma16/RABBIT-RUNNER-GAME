
var PLAY = 1;
var END = 0;
var HOME=2;
var scare=0;
var gameState = HOME;
var bg1,bg1Img;
var bg,bgImg;
var rabit,rabit_running;
var obstacle,obstacleImg;
var coin,coinImg;
var carrot,carrotImg;
var obstacleGroup;
var go,goImg;
var r,rImg;
var g,gImg;
var invisibleGround;
var rs,rsImg;
var fire,fireImg;
function preload () {
rabit_running=loadAnimation("1.png","2.png","3.png","4.png");
obstacleImg=loadImage("cactus.png");
coinImg=loadImage("coin.png");
carrotImg=loadImage("carrot.png");
bgImg=loadImage("bg.jpg");
goImg=loadImage("g.png");
bg1Img=loadImage("bg1.jpg");
rsImg=loadImage("1.png");
fireImg=loadImage("fire.png");
rImg=loadImage("download.png");
gImg=loadImage("images.png");
}
function setup() {
    createCanvas(windowWidth, windowHeight);
    bg=createSprite(width/2,height/2,width,height);
    bg.addImage(bgImg);
  
    bg.visible=false;
    bg.velocityX = -4;
    bg.scale=1.7;

    bg1=createSprite(width/2,height/2,width+400,height);
    bg1.addImage(bg1Img);
    bg1.scale=0.3;
    bg1.visible=false;

    go=createSprite(width/2,height/2);
    go.addImage(goImg);
    go.scale=0.7;
    go.visible=false;

    rabit=createSprite(200,500);
    rabit.addAnimation("running",rabit_running);
    rabit.visible=true;

    invisibleGround = createSprite(width/2,height-10,width,125);  
    invisibleGround.shapeColor = "Brown";
    
    obstacleGroup = new Group();
    fireGroup = new Group();
    carrotGroup = new Group();

  rs=createSprite(200,500);
  rs.addImage(rsImg);
  rs.visible=false;

  g=createSprite(width/2,height/2);
  g.addImage(gImg);
  g.scale=2.6;
  g.visible=false;

  r=createSprite(width/2,height-150);
  r.addImage(rImg);
  r.visible=false;
 
  score = 0;
}


function draw(){
    background(0);
    textSize(20);
    fill("black")
    text("Score: "+ score,30,50);
    if(gameState===HOME){
        go.visible=true;
        bg1.visible=true;
       // obstacle.visible = false;
        rabit.visible=false;
        bg.visible=false;
        g.visible=false;
        invisibleGround.visible=false;
        if(touches.length>0 || keyDown("SPACE")) {      
            gameState=PLAY;
            touches = []
          }
      
    }
    if(gameState === PLAY){
        go.visible=false;
       bg1.visible=false;
       
    rabit.visible=true;
       bg.visible=true;
       g.visible=false;
       spawnCarrot();
     
       spawnFire();
    if (bg.x < 500){
        bg.x = bg.width/2;
      }
    invisibleGround.visible=true;
      rabit.velocityY = rabit.velocityY + 0.4
      if((touches.length > 0 || keyDown("SPACE")) && rabit.y  >= height-180) {
      
        rabit.velocityY = -10;
         touches = [];
      }
      if(carrotGroup.isTouching(rabit)){
      
        fireGroup.destroyEach(0);
        obstacleGroup.destroyEach(0);
        carrotGroup.destroyEach(0);
      }
      rabit.collide(invisibleGround);
        spawnObstacles();
        if(obstacleGroup.isTouching(rabit)){
            gameState = END;
        }
        if(fireGroup.isTouching(rabit)){
          gameState = END;
      }
    }
    if(gameState===END){
        background(0);
        g.visible=true;
        r.visible=true;
        rabit.visible=false;
        obstacleGroup.destroyEach(0);
        fireGroup.destroyEach(0);
        rabit.collide(invisibleGround);
        bg.velocityX=0;
        if(touches.length>0 || keyDown("SPACE")) {      
          reset();
          touches = []
        }
    }
drawSprites();

}


function spawnFire() {
    if(frameCount % 530 === 0) {
      var fire = createSprite(1200,height-95,20,30);
      fire.setCollider('circle',0,0,45)
      // obstacle.debug = true
    
      fire.velocityX = -(8 + 3*score/100);
      fire.scale = 0.1;
      fire.lifetime = 300;
    fire.visible=true;
    fire.depth = rabit.depth;
    rabit.depth = rabit.depth+1;
      //generate random obstacles
    fire.addImage(fireImg);
    fireGroup.add(fire);
      }
    
      //assign scale and lifetime to the obstacle           
    
      //add each obstacle to the group
     
    }
  function spawnObstacles() {
    if(frameCount % 150 === 0) {
      var obstacle = createSprite(1200,height-95,20,30);
      obstacle.setCollider('circle',0,0,45)
      // obstacle.debug = true
    
      obstacle.velocityX = -(8 + 3*score/100);
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
    obstacle.visible=true;
    obstacle.depth = rabit.depth;
    rabit.depth = rabit.depth+1;
      //generate random obstacles
    obstacle.addImage(obstacleImg);
    obstacleGroup.add(obstacle);
      }
    
      //assign scale and lifetime to the obstacle           
    
      //add each obstacle to the group
     
    }
  
  
    function spawnCarrot() {
      if(frameCount % 700 === 0) {
        var carrot = createSprite(800,height-200,20,30);
        carrot.setCollider('circle',0,0,45)
        // obstacle.debug = true
      
        carrot.velocityX = -(8 + 3*score/100);
        carrot.scale = 0.2;
        carrot.lifetime = 300;
      carrot.visible=true;
      carrot.depth = rabit.depth;
      rabit.depth = rabit.depth+1;
        //generate random obstacles
      carrot.addImage(carrotImg);
      carrotGroup.add(carrot);
        }
      
        //assign scale and lifetime to the obstacle           
      
        //add each obstacle to the group
       
      }
      function reset(){
        
        gameState = PLAY;
      r.visible=false;
        rabit.visible=true;
      bg.velocityX=-4;
        obstacleGroup.destroyEach();
        fireGroup.destroyEach();
        
        
      }












