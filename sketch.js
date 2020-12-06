//Creating variables
var dog,happyDog,dogImg,happyDogImg;
var database,foodS,foodStock;

function preload(){
  //loading images
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  //assigning firebase Database
  database = firebase.database();

  //creating canvas
  createCanvas(500,500);
  
  //creating sprites
  dog = createSprite(250,250,10,10);
  dog.addImage("dog",dogImg);
  dog.scale = 0.1;

  //fetching foodStocks from database
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
}

function draw() { 
  //adding backgroung image 
  background(46,139,87);

  //creating up arrow function
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage("dog",happyDogImg);
  }

  drawSprites();
  //adding styles
  fill("white");
  strokeWeight(4);
  stroke("black")
  text("Food Remaining : "+foodS,170,200);
  textSize(20);
  text("Press Up Arrow key to feed the dog",100,50);
}

//function for reading stocks
function readStock(data){
  foodS = data.val();
}

//function for writing stocks
function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
    food: x
  })
}




