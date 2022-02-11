var ball;
var score = 0;
var gamestate = "serve";
var lives = 3;
function setup(){
  createCanvas(400,400)
  paddle = createSprite(200, 350, 120, 10);
  paddle.shapeColor = "blue";
  ball = createSprite(200,300,10,10);


edges=createEdgeSprites();
bricks = createGroup();

createBrickRow(65, "red");
createBrickRow(65+29, "orange");
createBrickRow(65+29+29, "green");
createBrickRow(65+29+29+29, "yellow");
}



function draw() {
 
  background("black");
 
  textSize(20);
  
  if(gamestate == "serve"){
    text("Click to serve the ball.", 120,250);
    ball.x = 200;
    ball.y = 200;
    ball.velocityY = 0;
    ball.velocityX = 0;
  }
  else if(gamestate === "end"){
    text("game over",150,300);
    ball.remove;
  }
  else if(gamestate === "pause"){
    text("press space to resume",110,250)
  }
  else{gameplay()}
  
  if(keyDown("space")){
    if(gamestate==="pause"){
      gamestate = "play";
      ball.velocityX = lastvx;
      ball.velocityY = lastvy;
    }
    else if(gamestate === "play"){
      gamestate = "pause"
      lastvx=ball.velocityX
      lastvy=ball.velocityY
      ball.velocityX = 0
      ball.velocityY = 0
    }
  }
  
  text("Score: "+score,40,25);
  text("lives: "+lives,40,45);
  
  drawSprites();
}

function mouseClicked()
{
  if(gamestate == "serve"){
    console.log("hi")
    ball.velocityY = -7;
    ball.velocityX = -7;
    bricks.setVelocityYEach(0.2)
    gamestate = "play";
  }
  
}

function brickHit(ball, brick) {
// playSound("sound://category_hits/puzzle_game_button_04.mp3");
 brick.remove();
 score = score+5;
 
  if(ball.velocityY<12 && ball.velocityY>=-12){
    ball.velocityX*=1.05;
    ball.velocityY*=1.05;
  }
}
function gameplay(){
   paddle.x = World.mouseX;
  
  if(paddle.x < 60)
  {
    paddle.x = 60;
  }
    
  if(paddle.x > 340)
  {
    paddle.x = 340;
  }
 
  //rotation = rotation + 5;
  ball.bounceOff(edges);
  
  //ball.bounceOff(paddle);
  ball.bounceOff(bricks, brickHit);
  if(ball.bounceOff(paddle))
  {
    //playSound("sound://category_tap/puzzle_game_organic_wood_block_tone_tap_1.mp3");
  }
  if(!bricks[0])
  {
    //console.log("Won");
    ball.velocityX = 0;
    ball.velocityY = 0;
    text("Well Done!!",150,200);
  }
  if(ball.isTouching(edges[3])){
    lifeover()
    
  }
}
function lifeover(){
  lives = lives-1;
  if(lives>=1){
    gamestate ="serve"
    
  }
  else{
    
    gamestate = "end"
  }
  console.log(lives)
}
function createBrickRow(y, color) {
  for(c=0; c<6; c++)
  {
    var brick = createSprite(65+54*c,y,50, 25);
    brick.shapeColor = color;
    bricks.add(brick);
  }
}