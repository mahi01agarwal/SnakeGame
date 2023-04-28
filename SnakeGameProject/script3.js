const musicSound = new Audio("music/music.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const foodSound= new Audio("music/food.mp3")
const moveSound = new Audio("music/move.mp3");
let hiscoreBox = document.getElementById("HiscoreBox");
let scorebox = document.getElementById("scoreBox");
let inputDir={x:0,y:0};
let snakeArr = [{x: 15 , y: 15}];
let food = {x:5,y:5};
let score = 0;
let lastPaintTime = 0;
let speed = 5;
let isRunning=true;




//GAME FUNCTIONS

function main(ctime){

    window.requestAnimationFrame(main)
    if((ctime-lastPaintTime)/1000 <1/speed){
        return
    }
    lastPaintTime=ctime;
    if(isRunning){
    GameEngine();
}
else{
    musicSound.pause();
}

}

function toggleGameState() {
    isRunning = !isRunning;
  }
function isCollide(snake){
    //Snake bumps into itself
    for(let i=1;i<snakeArr.length;i++){
        if(snake[0].x === snake[i].x  && snake[0].y === snake[i].y){
            return true;
        }
    }


    // Snake bumps into board
    if(snake[0].x>18 || snake[0].x<=0 || snake[0].y<=0 || snake[0].y>18){
        return true;
    }


    //Snake bumps into obstacle
    if((snake[0].x===3||snake[0].x===15||snake[0].x===9) && (snake[0].y>=5 && snake[0].y<=12)){
        return true;
    }
    return false;
    
}

function GameEngine(){
    
    if(isCollide(snakeArr)){

        musicSound.pause();
        gameOverSound.play();
        inputDir={x:0,y:0};
        alert("Game Over!\nYour Score: "+ score+"\nPress any key to play again!");
        // window.open("GameOver.html")
        snakeArr = [{x: 15, y: 15}];
        score = 0; 
        scorebox.innerHTML="Score: "+score;
    }


    //If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
    foodSound.play();
    score = score +1;
    scorebox.innerHTML = "Score: "+score;
        if(score>hiscore3){
            hiscore3 = score;
            localStorage.setItem("hiscore3", JSON.stringify(hiscore3));
            hiscoreBox.innerHTML = "Hi-Score: " + hiscore3;
        }
        scorebox.innerHTML = "Score: " + score;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    // food = {x:Math.round(6+10*Math.random()),y:Math.round(6+10*Math.random())};
    while(true){
        food = {x:Math.round(6+10*Math.random()),y:Math.round(6+10*Math.random())};
        if((food.x===3||food.x===15||food.x==9)  && (food.y>=5 && food.y<=12)){

           continue;
        }
        for(let i=0;i<snakeArr.length;i++){
            if(food.x===snakeArr[i].x && food.y===snakeArr[i].y){
             ind=i;
             break;
            }
     }
     if(food.x===snakeArr[ind].x && food.y===snakeArr[ind].y){
         continue;
     }
     break;
    }

    }
        // Get the width and height of each grid box
        const boxWidth = board.clientWidth / 18;
        const boxHeight = board.clientHeight / 18;
    board.innerHTML = "";
    //Display Food
    foodElement = document.createElement("img");
    foodElement.src = "apple2.png"
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.style.width = `${boxWidth}px`;
    foodElement.style.height = `${boxHeight}px`;
    board.appendChild(foodElement);

    // Display Snake
    for(let i=0;i<snakeArr.length;i++){
        snakeElement = document.createElement("img");
        if(i===0){
            snakeElement.src="head.png";
            snakeElement.style.gridRowStart = snakeArr[i].y;
            snakeElement.style.gridColumnStart = snakeArr[i].x;
            snakeElement.style.width = `${boxWidth}px`;
            snakeElement.style.height = `${boxHeight}px`;

        }
        else{
            snakeElement.src="snake.png";
            snakeElement.style.gridRowStart = snakeArr[i].y;
            snakeElement.style.gridColumnStart = snakeArr[i].x;
            snakeElement.style.width = `${boxWidth}px`;
            snakeElement.style.height = `${boxHeight}px`;
        }
        board.appendChild(snakeElement);
    }

    //Display Obstacles
    for(let j=5;j<=12;j++){
        for(let i=3;i<=15;i=i+6){
        obstacleElement=document.createElement("img");
        obstacleElement.src="barrier.png";
        obstacleElement.style.gridRowStart=j;
        obstacleElement.style.gridColumnStart=i;
        obstacleElement.style.width = `${boxWidth}px`;
        obstacleElement.style.height = `${boxHeight}px`;
        board.appendChild(obstacleElement);}
    }






    // Move Snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    

}




//MAIN LOGIC 
let hiscore3 = localStorage.getItem("hiscore3");
if(hiscore3 === null){
    hiscore3val = 0;
    localStorage.setItem("hiscore3", JSON.stringify(hiscore3val))
}
else{
    hiscoreBox.innerHTML = "Hi-Score: " + hiscore3;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",function(event){
    musicSound.play();
    moveSound.play();
    inputDir={x:0,y:1}
    switch (event.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "w":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case "s":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case "a":
            console.log("left");
            inputDir.x = -1;
            inputDir.y = 0;
            break;                 

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "d":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        case "p"  :
            console.log("p")
            toggleGameState() ;
            break;  
        default:
            break;
    }
});





