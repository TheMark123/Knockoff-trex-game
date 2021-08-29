var gameState="play"







function preload(){
trexi=loadAnimation("trex1.png","trex3.png","trex4.png")
groundi=loadImage("ground.png")
cloudI=loadImage("cloud.png")
obi1=loadImage("obstacle1.png")
obi2=loadImage("obstacle2.png")
obi3=loadImage("obstacle3.png")
obi4=loadImage("obstacle4.png")
obi5=loadImage("obstacle5.png")
obi6=loadImage("obstacle6.png")
deadRex=loadAnimation("trex_collided.png")
gameOveri=loadImage("gameOver.png")
restarti=loadImage("restart.png")
}




function setup() {
              createCanvas(600,200);
              trexi.frameDelay=2
              trex=createSprite(50, 165)
              trex.addAnimation("trexrun",trexi)
              trex.addAnimation("deadrex", deadRex)
              trex.scale=0.5
              trex.debug=false
              trex.setCollider("circle", 0, 15, 25)
              ground1=createSprite(300, 185, 600, 15)
              ground1.addImage(groundi)
              ground2=createSprite(300, 197, 600, 15)
              ground2.visible=false
              obG=createGroup()
              cloudG=createGroup()
              gameOver=createSprite(300, 50, 25, 25)
              restart=createSprite(300, 100, 25,25)
             gameOver.addImage(gameOveri)
             restart.addImage(restarti)
              gameOver.scale=1.5
              score=0

}

function draw() {
              background("lightblue");
             // k=input.value()

if (gameState=="play"){
       trex.collide(ground2)
       ground1.velocityX=-(4+score/100)
       gameOver.visible=false
       restart.visible=false
       if (ground1.x<0){
              ground1.x=600
        }
        if (keyDown("space")&&trex.isTouching(ground1)){
              trex.velocityY=-15
       }
              trex.velocityY=trex.velocityY+0.8
              score=Math.round(score+frameCount/100)
              cloudmaker()
              obmaker()              
              if (trex.isTouching(obG)){
                     
                     gameState="end"     
              }
}
if (gameState=="end"){
       cloudG.setVelocityXEach(0) 
       ground1.velocityX=0
       obG.setVelocityXEach(0)
       obG.setLifetimeEach(50)
       trex.velocityY=0
       trex.changeAnimation("deadrex",deadRex)
       gameOver.visible=true
       restart.visible=true

       
       if (mousePressedOver(restart)){
             
              gameState="restart"     
       }
}
if (gameState=="restart"){
trex.Y=165
obG.destroyEach()
trex.changeAnimation("trexrun",trexi)
score=0
gameState="play"

}
             
text("score "+score,300,25)
             

              
              







drawSprites()



  
}
function cloudmaker (){
  if (frameCount %75==0){            
              
   var cloud=createSprite(600,random(5, 50),50,30)
    cloud.addImage(cloudI)
    cloud.velocityX=-5
    cloud.depth=trex.depth
trex.depth=trex.depth+1
cloud.lifetime=130
cloudG.add(cloud)
}

}

function obmaker () {
if (frameCount %65==0){
  var obstacle=createSprite(600, 175, 30,50)
//obstacle.addImage(obi1,obi3,obi4,obi5,obi6)

obstacle.velocityX=-(4+score/100)
obstacle.scale=0.4
switch(Math.round(random(1, 6))){
       case 1:obstacle.addImage(obi1)
              break;
       case 2:obstacle.addImage(obi2)
              break;
       case 3:obstacle.addImage(obi3)
              break;
       case 4:obstacle.addImage(obi4)
              break;
       case 5:obstacle.addImage(obi5)
              break;
       case 6:obstacle.addImage(obi6)
              break;
              
}
obstacle.lifetime=170
obG.add(obstacle)
}
}
