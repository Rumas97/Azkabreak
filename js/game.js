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

// number of dementor objects
let numOfDem = [
  { x: 845, y: 50 },
  { x: 845, y: 150 },
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
  ctx.drawImage(hp, 30, 30);

  //making dementors move
  for (let i = 0; i < numOfDem.length; i++) {
    ctx.drawImage(dementor, numOfDem[i].x, numOfDem[i].y);
    //ctx.drawImage(dementor, numOfDem[i].x, numOfDem[i].y + constant )

    numOfDem[i].x = numOfDem[i].x - 5;

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
  }
  if (isGameOver) {
    cancelAnimationFrame(intervalId);
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

function start() {
  gameIntro.style.display = "none";
  draw();
}

function restart() {}

//Event listeners

window.addEventListener("load", () => {
  startBtn.addEventListener("click", () => {
    start();
  });
});
