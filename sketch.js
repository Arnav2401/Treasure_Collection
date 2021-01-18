  var runner, runner_image;
  var road, road_image;
  var cash, cash_image;
  var diamond, diamond_image;
  var gameover, gameover_image;
  var jwell, jwell_image;
  var ruby , ruby_image;
  var sword, sword_image;
  var invisibleGround;
  var collection = 0;
  var PLAY = 1;
  var END = 2;
  var gameState = PLAY;
  var highScore=0;

function preload(){
  
  runner_image = loadAnimation ("runner1.png","runner2.png");
  road_image = loadImage ("Road.png");
  cash_image = loadImage ("cash.png");
  diamond_image = loadImage ("diamonds.png");
  gameover_image = loadAnimation ("gameOver.png");
  jwell_image = loadImage ("jwell.png");
  ruby_image = loadImage ("ruby.png");
  sword_image = loadImage ("sword.png");

}

function setup(){
  //Groups --- setup
  //background---setup

  
  
  
  createCanvas(450,450);
   road = createSprite (225,225,10,10);
   // invisible = createSprite (20,225,10,450);
   // invisible = createSprite (430,225,10,450);
   
  
  
  Runner ()
  road.addImage ("Road",road_image);
  road.scale = 0.28
  road.setVelocity(0,5)
  
  cash_group = new Group()
  diamond_group = new Group()
  sword_group = new Group()
  ruby_group = new Group()
  jwell_group = new Group()
  
    
}

function draw() {
  
  
  background (0);
  drawSprites();
  var Edges = createEdgeSprites();
  // runner.debug = "true"
  // text ("x: "+ mouseX + "Y: "+ mouseY,15,225);
  runner.collide(Edges)
  textSize(15)
  fill("black")
  text ("Collection = " + collection,300,15);
  text ("High Score = " + highScore,15,15);
  
  if (gameState===PLAY){
    if(mouseX>20 && mouseX<430){
      runner.x = mouseX
    }
  if (road.y>400){
      road.y = height/2
    }
 if ((frameCount%100===0) || (frameCount%125===0)){
     var round = Math.round(random(1,5))
     if (round===1){
     Sword()
     }
     else if (round===2){
     Jwell()
      }
     else if (round===3){
     Diamond()
      }
     else if (round===4){
     Cash()
      }
      else {
     Ruby()
      }
      }
  
  for ( var r = 0; r<ruby_group.length ; r++){
   if (runner.isTouching(ruby_group.get(r))){
      ruby_group.get(r).remove()
      collection = collection+1
    }
  }
  
  for ( var c = 0; c<cash_group.length ; c++){
   if (runner.isTouching(cash_group.get(c))){
       cash_group.get(c).remove()
       collection = collection+2

    }
  }
 for ( var d = 0; d<diamond_group.length ; d++){
  if (runner.isTouching(diamond_group.get(d))){
      diamond_group.get(d).remove()
      collection = collection+3

    }
  }
  
  for ( var j = 0; j<jwell_group.length ;j++){
   if (runner.isTouching(jwell_group.get(j))){
       jwell_group.get(j).remove()
       collection = collection+4
   }
    }
  
    
    if (sword_group.isTouching(runner)){
        gameState=END;
    }
  }
    
   else if (gameState===END){
       road.velocityY = 0;
      // gameover = createSprite (225,225,10,10);
      // gameover.addImage("over", gameover_image);
      sword_group.destroyEach()
      jwell_group.destroyEach()
      diamond_group.destroyEach()
      cash_group.destroyEach()
      ruby_group.destroyEach()
     
     runner.changeAnimation("over")
     runner.x=225;
     runner.y=225;
     runner.scale=1;
     
     text("Press 'R' To Restart",155,275)
     
     if (keyDown("r")){
       restart()
     }
     
     if (collection>highScore){
         highScore=collection
        }
     
    }
  

}
  
  
  
  
  
  
  
  
  
  
  
  
   
  
     // if (runner.isTouching(sword_group)){
     //   
     // }

  



function Runner (){
  runner = createSprite (225,400,10,10);
  runner.addAnimation ("Runner",runner_image);
  runner.addAnimation("over",gameover_image)
  runner.scale = 0.05
  runner.setCollider ("circle",0,0,580);
  
}

 function Sword(){
 //  if (frameCount%150===0){
   sword = createSprite(Math.round(random(30,420)),0,10,10)
   sword.addImage(sword_image);
   sword.scale = 0.08;
   sword.setVelocity(0,5);
   sword.lifetime = 90;
   sword_group.add (sword)
// } 
 }


function Cash (){
 // if (frameCount%160===0){
    cash= createSprite(Math.round(random(30,420)),0,10,10)
    cash.addImage(cash_image)
    cash.scale = 0.08
    cash.setVelocity(0,5);
    cash.lifetime = 90;
    cash_group.add (cash)
 // }
}


function Diamond (){
 // if (frameCount%180===0){
  diamond= createSprite (Math.round(random(30,420)),0,10,10)
  diamond.addImage(diamond_image)
  diamond.scale = 0.03
  diamond.setVelocity(0,5);
  diamond.lifetime = 90;
  diamond_group.add (diamond)
//}
}


function Jwell (){
 // if (frameCount%190===0){
  jwell= createSprite (Math.round(random(30,420)),0,10,10)
  jwell.addImage(jwell_image)
  jwell.scale = 0.08
  jwell.setVelocity(0,5);
  jwell.lifetime = 90;
  jwell_group.add (jwell)
//}
  
}




function Ruby (){
//  if (frameCount%200===0){
  ruby= createSprite (Math.round(random(30,420)),0,10,10)
  ruby.addImage(ruby_image)
  ruby.scale = 0.06
  ruby.setVelocity(0,5);
  ruby.lifetime = 90;
  ruby_group.add (ruby)
}
  
//}


function restart(){
  runner.changeAnimation("Runner");
  collection=0;
  runner.scale = 0.05;
  road.setVelocity(0,5)
  runner.y=400;
  ruby_group.destroyEach();
  diamond_group.destroyEach();
  jwell_group.destroyEach();
  cash_group.destroyEach();
  sword_group.destroyEach();
  gameState = PLAY
}
