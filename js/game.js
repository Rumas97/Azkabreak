let canvas = document.querySelector("canvas");
let gameIntro = document.querySelector(".game-intro");
let gameVictory = document.querySelector(".game-victory");
let gameScreen = document.querySelector("#game-screen");
let gameLose = document.querySelector(".game-loser");
let scoreKeeper = document.querySelector("#scoreKeeper");
let scoreBoard = document.querySelector(".score-board");

let audioStartBtn = document.querySelector("#music");
let audioStart = new Audio("./sounds/Harry_Potter_Intro.mp3");
let audioSpell = new Audio("./sounds/Shoot.mp3");
let audioLose = new Audio("./sounds/Gamelost.mp3");
let audioWin = new Audio("./sounds/PatronusLight.mp3");

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

let score = 0;

let hpX = 30,
  hpY = 30,
  hpIncr = 4;

let numOfSpells = [];

let isArrowUp = false,
  isArrowDown = false,
  isSpaceKey = false;

// number of dementor objects
let demOne = [{ x: 845, y: 50 }];
let demTwo = [{ x: 945, y: 250 }];
let demIncr = 2;

let distanceBetweenDem = 150;
let constant = distanceBetweenDem + dementor.height;

// The DOM of the start and restart buttons
let startBtn = document.querySelector("#start-button");
let restartBtn = document.querySelector("#restart-win-button");
let restartBtnLose = document.querySelector("#restart-lose-button");

function draw() {
  //adding background image
  ctx.drawImage(bg, 0, 0);

  //adding harry potter image
  ctx.drawImage(hp, hpX, hpY);

  // here do movemement for each spell
  for (let h = 0; h < numOfSpells.length; h++) {
    ctx.drawImage(spell, numOfSpells[h].x, numOfSpells[h].y);

    numOfSpells[h].x = numOfSpells[h].x + 5;

    // collision with demOne
    if (
      numOfSpells[h].x + spell.width > demOne[0].x &&
      numOfSpells[h].y + spell.height > demOne[0].y &&
      numOfSpells[h].x < demOne[0].x + dementor.width &&
      numOfSpells[h].y < demOne[0].y + dementor.height
    ) {
      demOne[0] = {
        x: canvas.width + 150,
        y: Math.floor(Math.random() * (canvas.height / 2 - dementor.height)),
      };
      numOfSpells[h] = {
        //the first spell also disappears when the other spell hits the dementor
        x: canvas.width + 100,
      };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    // collision with demTwo
    if (
      numOfSpells[h].x + spell.width > demTwo[0].x &&
      numOfSpells[h].y + spell.height > demTwo[0].y &&
      numOfSpells[h].x < demTwo[0].x + dementor.width &&
      numOfSpells[h].y < demTwo[0].y + dementor.height
    ) {
      demTwo[0] = {
        x: canvas.width + 250,
        y:
          Math.floor(Math.random() * (canvas.height / 2 - dementor.height)) +
          canvas.height / 2,
      };
      numOfSpells[h] = {
        x: canvas.width + 100,
      };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    if (numOfSpells.length > 0 && numOfSpells[h].x > canvas.width) {
      numOfSpells.splice(0, 1);
    }
  }

  //Dementor 1 logic
  // for (let i = 0; i < demOne.length; i++) {
  let i = 0;

  ctx.drawImage(dementor, demOne[i].x, demOne[i].y);
  demOne[i].x = demOne[i].x - demIncr;

  if (demOne[i].x + dementor.width < 0) {
    demOne[i] = {
      x: 845,
      y: Math.floor(Math.random() * (canvas.height / 2 - dementor.height)),
    };
    score--;
    scoreKeeper.innerText = score;
  }
  //collision with demOne
  if (
    demOne[i].x <= hpX + hp.width &&
    demOne[i].x + dementor.width >= hpX &&
    demOne[i].y <= hpY + hp.height &&
    demOne[i].y + dementor.height >= hpY
  ) {
    isGameOver = true;
    console.log("dementor 1 crash");
  }
  //}

  //Dementor 2 logic
  for (let j = 0; j < demTwo.length; j++) {
    ctx.drawImage(dementor, demTwo[j].x, demTwo[j].y);
    demTwo[j].x = demTwo[j].x - demIncr;

    if (demTwo[j].x + dementor.width < 0) {
      demTwo[j] = {
        x: 945,
        y:
          Math.floor(Math.random() * (canvas.height / 2 - dementor.height)) +
          canvas.height / 2,
      };
      score--;
      scoreKeeper.innerText = score;
    }
    //collsion with demTwo
    if (
      demTwo[j].x <= hpX + hp.width &&
      demTwo[j].x + dementor.width >= hpX &&
      demTwo[j].y <= hpY + hp.height &&
      demTwo[j].y + dementor.height >= hpY
    ) {
      isGameOver = true;
      console.log("dementor 2 crash");
    }
  }

  //y = Math.floor((i*canvas.height/demOne.length) +(Math.random()*canvas.height/demOne.length)-dementor.height)

  /*if(y < i*canvas.height/demOne.length ){
      y = Math.floor(i*canvas.height/demOne.length)
    }*/

  if (isArrowUp && hpY > 0) {
    hpY = hpY - hpIncr;
  }

  if (isArrowDown && hpY + hp.height < canvas.height) {
    hpY = hpY + hpIncr;
  }

  if (hpY + hp.height > canvas.height || hpY < 0) {
    console.log("canvas crash");
    isGameOver = true;
  }

  if (score > 2) {
    demIncr = 5;
  }

  if (score > 5) {
    isGameOver = true;
  }
  if (score < -5) {
    isGameOver = true;
  }

  if (score <= -1) {
    scoreKeeper.style.color = "red";
  }
  if (score >= 1) {
    scoreKeeper.style.color = "blue";
  }

  if (isGameOver) {
    cancelAnimationFrame(intervalId);
    gameIntro.style.display = "none";
    startBtn.style.display = "none";
    canvas.style.display = "none";
    gameScreen.style.display = "none";
    // scoreBoard.style.display = "none";
    // scoreKeeper.style.display = "none";

    if (score > 5) {
      gameVictory.style.display = "flex";
      gameLose.style.display = "none";
      restartBtn.style.display = "block";
      audioWin.play();
      audioWin.currentTime = 0;
    } else {
      gameLose.style.display = "flex";
      gameVictory.style.display = "none";
      restartBtnLose.style.display = "block";
      audioLose.play();
      audioLose.currentTime = 0;
    }
  } else {
    intervalId = requestAnimationFrame(draw);
  }
}

function start() {
  gameIntro.style.display = "none";
  startBtn.style.display = "none";
  canvas.style.display = "block";
  gameScreen.style.display = "flex";
  gameLose.style.display = "none";
  gameVictory.style.display = "none";
  // scoreBoard.style.display = "flex";
  // scoreKeeper.style.display = "inline";
  audioLose.pause();
  audioWin.pause();
  audioStart.pause();

  draw();
}

function restart() {
  isGameOver = false;
  hpX = 30;
  hpY = 30;
  demOne = [{ x: 845, y: 50 }];
  demTwo = [{ x: 945, y: 250 }];
  demIncr = 2;
  numOfSpells = [];
  score = 0;
  scoreKeeper.innerText = score;
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
    numOfSpells.push({ x: hpX + hp.width, y: hpY + hp.height / 2 }); // here push one spell to the array if space is clicked. Then set space to be false.

    isSpaceKey = false;
  }
});

document.addEventListener("keyup", () => {
  isArrowUp = false;
  isArrowDown = false;
  isSpaceKey = false;
});

restartBtn.addEventListener("click", (event) => {
  restartBtn.style.display = "none";
  restartBtnLose.style.display = "none";

  console.log("restart");
  restart();
});

restartBtnLose.addEventListener("click", (event) => {
  restartBtn.style.display = "none";
  restartBtnLose.style.display = "none";
  console.log("restart");
  restart();
});
window.addEventListener("load", (event) => {
  canvas.style.display = "none";
  restartBtn.style.display = "none";
  restartBtnLose.style.display = "none";
  gameVictory.style.display = "none";
  gameLose.style.display = "none";
  gameScreen.style.display = "none";
  // scoreBoard.style.display = "none";
  // scoreKeeper.style.display = "none";

  startBtn.addEventListener("click", (event) => {
    console.log("start");
    start();
  });

  audioStartBtn.addEventListener("click", (event) => {
    if (audioStartBtn.innerHTML == "Music: Off") {
      audioStart.play();
      audioStartBtn.innerHTML = "Music: On";
    } else if (audioStartBtn.innerHTML == "Music: On") {
      audioStart.pause();
      audioStartBtn.innerHTML = "Music: Off";
    }
  });
});
