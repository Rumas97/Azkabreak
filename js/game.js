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

//canvas.style.backgroundColor = bg;

// The DOM of the start and restart buttons

let startBtn = document.querySelector("#start-button");
let restartBtn = document.querySelector("#restart-button");

function draw() {
  ctx.drawImage(bg, 0, 0);
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
