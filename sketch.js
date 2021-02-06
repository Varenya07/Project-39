var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monster_img;
var fruit1_img, fruit2_img, fruit3_img, fruit4_img;
var sword, sword_img, sword_sound;
var gameOver_img, gameOver_sound;

function preload(){
  monster_img = loadImage("alien2.png");
  fruit1_img = loadImage("fruit1.png");
  fruit2_img = loadImage("fruit2.png");
  fruit3_img = loadImage("fruit3.png");
  fruit4_img = loadImage("fruit4.png");
  sword_img = loadImage("sword.png");
  gameOver_img = loadImage("gameover.png");
  youWin_pic = loadImage("you win.png")
  
  sword_sound = loadSound("knifeSwooshSound.mp3");
  gameOver_sound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(400,400);
  
  sword = createSprite(200,200,20,20);
  sword.addImage(sword_img);
  sword.scale = 0.7;
  
  score = 0;
  
  fruitsGroup = new Group();
  enemiesGroup = new Group();
}

function draw(){
  background("blue");
  
  fill("black");
  textSize(20);
  text("Score: "+ score,300,50);
    
  sword.x = mouseY;
  sword.y = mouseY;
  
  if(gameState === PLAY) {
    fruits();
    enemies();
    
    if(fruitsGroup.isTouching(sword)) {
      sword_sound.play();
      fruitsGroup.destroyEach();
      score = score+1;
    }
    
    if(enemiesGroup.isTouching(sword)) {
      gameOver_sound.play();
      sword.addImage(gameOver_img);
      gameState = END;
  }

    if(score === 12) {
      gameState = END;
      sword.addImage(youWin_pic);
    }
}  
    if (gameState === END) {
      fruit.velocityX = 0;
      enemy.velocityX = 0;
      sword.x = 200;
      sword.y = 200;
      fruitsGroup.setLifetime = -1;
      enemiesGroup.setLifetime = -1;
    }
  
drawSprites();
}

function fruits() {
  if(World.frameCount%50 === 0) {
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    fruit.setCollider("circle",0,0,100);
    fruit.depth = sword.depth-2;
    
    
    
    w = Math.round(random(1,4));
    switch(w) {
      case 1: fruit.addImage(fruit1_img);
              break;
      case 2: fruit.addImage(fruit2_img);
              break;
      case 3: fruit.addImage(fruit3_img);
              break;
      case 4: fruit.addImage(fruit4_img);
              break;
      default: break;
}
    fruit.y = Math.round(random(50,340));
    fruit.velocityX = -(7 + score/4);
    fruit.setLifetime = 100;
    
    sf = Math.round(random(1,2))
    switch(sf) {
      case 1: fruit.x = 400;
              break;
      case 2: fruit.x = 0;
              fruit.velocityX = 7 + score/4;
              break;
      default: break; 
    }
    
    fruitsGroup.add(fruit);
  }
}

function enemies() {
  if(World.frameCount%200 === 0) {
    enemy = createSprite(400,200,20,20);
    enemy.addImage(monster_img);
    enemy.setCollider("circle",0,0,20)
    enemy.depth = sword.depth-1;
    enemy.Y = Math.round(random(100,300))
    enemy.velocityX = -(8 + score/10);
    enemy.setLifetime = 50;
    
    sm = Math.round(random(1,2))
    switch(sm) {
      case 1: enemy.x = 400;
              break;
      case 2: enemy.x = 0;
              enemy.velocityX = 8 + score/10;
              break;
      default: break;  
    }
    enemiesGroup.add(enemy);
  }    
}
