let canvas = document.querySelector("canvas");
let gameIntro = document.querySelector(".game-intro");
let gameOver = document.querySelector(".game-over");
let gameInfo = document.querySelector(".game-info");

let ctx = canvas.getContext("2d");

//load all images

let bg = new Image();
bg.src = "./images/background.jpg";

let hp = new Image();
hp.src = "./images/harry.png";

let dementor = new Image();
dementor.src = "./images/dementor.png";

let spell = new Image();
spell.src = "./images/spell.png";

let intervalId = 0;
let isGameOver = false;

let hpX = 30,
  hpY = 30,
  hpIncr = 4;

let numOfSpells = [
  // {x :hpX+hp.width, y: hpY+(hp.height/2) },
];

let isArrowUp = false,
  isArrowDown = false,
  isSpaceKey = false;

// number of dementor objects
let numOfDem = [{ x: 845, y: 50 }];

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

  // here push one spell to the array if space is clicked. Then set space to be false.

  // here do movemement for each spell
  for (let j = 0; j < numOfSpells.length; j++) {
    ctx.drawImage(spell, numOfSpells[j].x, numOfSpells[j].y);

    numOfSpells[j].x = numOfSpells[j].x + 5;
  }

  //making dementors move
  for (let i = 0; i < numOfDem.length; i++) {
    ctx.drawImage(dementor, numOfDem[i].x, numOfDem[i].y);
    ctx.drawImage(dementor, numOfDem[i].x, numOfDem[i].y + constant);

    numOfDem[i].x = numOfDem[i].x - 5;

    //y = Math.floor((i*canvas.height/numOfDem.length) +(Math.random()*canvas.height/numOfDem.length)-dementor.height)

    /*if(y < i*canvas.height/numOfDem.length ){
      y = Math.floor(i*canvas.height/numOfDem.length)
 }*/

    if (numOfDem[i].x + dementor.width < 0) {
      numOfDem[i] = {
        x: 845,
        y: Math.floor(Math.random() * (canvas.height / 2 - dementor.height)),
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

  if (hpY + hp.height > canvas.height || hpY < 0) {
    isGameOver = true;
  }

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameIntro.style.display = "block";
    startBtn.style.display = "none";
    canvas.style.display = "none";
    gameInfo.style.display = "none";
    gameOver.style.display = "block";
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

function start() {
  //does not work why?
  gameIntro.style.display = "none";
  console.log(gameIntro.style.display);
  canvas.style.display = "block";
  draw();
}

function restart() {
  isGameOver = false;
  hpX = 30;
  hpY = 30;
  numOfDem = [{ x: 845, y: 50 }];
  numOfSpells = [{ x: hpX + hp.width, y: hpY + hp.height / 2 }];
  start();
}

//Event listeners

document.addEventListener("keydown", (event) => {
  if (event.code == "ArrowUp") {
    isArrowUp = true;
    isArrowDown = false;
  } else if (event.code == "ArrowDown") {
    isArrowUp = false;
    isArrowDown = true;
  } else if (event.code == "Space") {
    isSpaceKey = true;
  }
});

document.addEventListener("keyup", () => {
  isArrowUp = false;
  isArrowDown = false;
  isSpaceKey = false;
});

restartBtn.addEventListener("click", (event) => {
  console.log("restart");
  restart();
});

window.addEventListener("load", (event) => {
  canvas.style.display = "none";
  gameOver.style.display = "none";

  startBtn.addEventListener("click", (event) => {
    console.log("start");
    start();
  });
});
