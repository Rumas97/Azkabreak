let canvas = document.querySelector("canvas");
let gameIntro = document.querySelector(".game-intro");

let ctx = canvas.getContext("2d");

//load all images

let bg = new Image();
bg.src = "./images/background.jpg";

let hp = new Image();
hp.src = "./images/harry.png";

let dementor = new Image();
dementor.src = "./images/dementor.png";

let spell = new Image();
spell.src = "./images/spell.jpg";

let intervalId = 0;
let isGameOver = false;

let hpX = 30,
  hpY = 30,
  hpIncr = 4;

let isArrowUp = false,
  isArrowDown = false;

// number of dementor objects
let numOfDem = [
  { x: 845, y: 50 },
 
];

let distanceBetweenDem = 150;
let constant = distanceBetweenDem + dementor.height;

// The DOM of the start and restart buttons
let startBtn = document.querySelector("#start-button");
let restartBtn = document.querySelector("#restart-button");

function draw() {
  //adding background image
  ctx.drawImage(bg, 0, 0);

  //adding harry potter image
  ctx.drawImage(hp, hpX, hpY);

  //making dementors move
  for (let i = 0; i < numOfDem.length; i++) {
    ctx.drawImage(dementor, numOfDem[i].x, numOfDem[i].y);
    ctx.drawImage(dementor, numOfDem[i].x, numOfDem[i].y + constant )

    numOfDem[i].x = numOfDem[i].x - 3;

    //y = Math.floor((i*canvas.height/numOfDem.length) +(Math.random()*canvas.height/numOfDem.length)-dementor.height)

    /*if(y < i*canvas.height/numOfDem.length ){
      y = Math.floor(i*canvas.height/numOfDem.length)
 }*/

    if (numOfDem[i].x + dementor.width < 0) {
      numOfDem[i] = {
        x: 845,
        y: Math.floor(Math.random() * (canvas.height - dementor.height)),
      };
    }

    //collsion with dementors
    if (
      hpX + hp.width >= numOfDem[i].x &&
      hpX <= numOfDem[i].x + dementor.width &&
      (hpY <= numOfDem[i].y + dementor.height ||
      hpY + hp.height > numOfDem[i].y + constant) 
    ) {
      isGameOver = true;
    }
  }

  if (isArrowUp && hpY > 0) {
    hpY = hpY - hpIncr;
  }

  if (isArrowDown && hpY + hp.height < canvas.height) {
    hpY = hpY + hpIncr;
  }

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameIntro.style.display = "block";
    canvas.style.display ='none'
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

function start() { //does not work why?
  gameIntro.style.display = "none";
  console.log(gameIntro.style.display)
  canvas.style.display = 'block';
  draw();
}

function restart() {
    isGameOver=false
    hpX = 30
    hpY = 30
    start()
}

//Event listeners

document.addEventListener("keydown", () => {
    if (event.code == "ArrowUp") {
        isArrowUp = true;
        isArrowDown = false;
  } else if (event.code == "ArrowDown") {
        isArrowUp = false;
        isArrowDown = true;
  }
});

document.addEventListener("keyup", () => {
        isArrowUp = false;
        isArrowDown = false;
});

window.addEventListener("load", () => {
    startBtn.addEventListener("click", () => {
        console.log('start')
        start();
    });
    restartBtn.addEventListener("click",() =>{
        console.log('restart')
        restart()
    })
  
});
