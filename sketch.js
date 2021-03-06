//Create variables here
var  dog;
var dogImage,dogImage2;
var happyDog;
var database;
var foodS;
var foodStock;
var milk; 
var milk1;
var milkImage;
var milkImage1;

function preload(){
//load images here
dogImage=loadImage("images/dogImg.png");
dogImage2=loadImage("images/dogImg1.png");
milkImage=loadImage("images/milk.png");
milkImage1=loadImage("images/milk1.png");
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(249,250);
  dog.addImage(dogImage);
  dog.scale = 0.15;

  database = firebase.database();
  //console.log(database);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock, showError);
  foodStock.set(20);

  milk = createSprite(140,430,10,10);
  milk.addImage(milkImage);
  milk.scale = 0.1;

  milk1 = createSprite(211,280,10,10);
  milk1.addImage(milkImage1);
  milk1.scale = 0.025;
  milk1.visible = false;

}


function draw() { 
  background(46,139,87);
  
  if(foodS !== 0){
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage2);
    milk1.visible = true;
   }
   if(keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogImage);
    milk1.visible = false;
   }
  }
	  if(foodS == 0){
    dog.addImage(dogImage);
    foodS = 20;
  }
 
  //add styles here
  drawSprites();
  textSize(17);
  fill("black");
  text("Long press up arrow key to feed your female dog Bella :)",50,50);
  fill("black");
  text("Milk Bottles Remaining : "+foodS,170,440);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x=x-1
  }
  database.ref('/').update({
    Food:x
  })
}

function showError(){
  console.log("Error in writing to the database");
}
