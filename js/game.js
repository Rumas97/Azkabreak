let canvas = document.querySelector("canvas");
let gameIntro = document.querySelector(".game-intro");
let gameVictory = document.querySelector(".game-victory");
let gameScreen = document.querySelector("#game-screen");
let gameLose = document.querySelector(".game-loser");
let scoreKeeper = document.querySelector("#scoreKeeper");
let scoreBoard = document.querySelector(".score-board");
let avengersCall = document.querySelector("#call-avengers");

let audioStartBtn = document.querySelector("#music");
let audioStart = new Audio("./sounds/Harry_Potter_Intro.mp3");
audioStart.volume = 0.05;
let audioSpell = new Audio("./sounds/Shoot.mp3");
audioSpell.volume = 0.05;
let audioLose = new Audio("./sounds/Gamelost.mp3");
audioLose.volume = 0.05;
let audioWin = new Audio("./sounds/PatronusLight.mp3");
audioWin.volume = 0.05;

let ctx = canvas.getContext("2d");

//load all images

let bg = new Image();
bg.src = "./images/plainbg.png";

let hp = new Image();
hp.src = "./images/harry.png";

let dementor = new Image();
dementor.src = "./images/dementor.png";

let spell = new Image();
spell.src = "./images/spelldark.png";

//avengers images
let thor = new Image();
thor.src = "./images/thor.png";

let blackWidow = new Image();
blackWidow.src = "./images/blackwidowsmall.png";

let hulk = new Image();
hulk.src = "./images/hulkSmall.png";

let captainAmerica = new Image();
captainAmerica.src = "./images/capAm.png";

let ironMan = new Image();
ironMan.src = "./images/Iron-man.png";

let hawkeye = new Image();
hawkeye.src = "./images/hawk-eye.png";

let intervalId = 0;
let isGameOver = false;
let avengersIntervalId = 0;

let score = 0;

let hpX = 30,
  hpY = 30,
  hpIncr = 4;

let numOfSpells = [];

//avengers

let thorPosition = [];
let blackWidowPosition = [];
let hulkPosition = [];
let captainAmericaPosition = [];
let ironManPosition = [];
let hawkeyePosition = [];

let isArrowUp = false,
  isArrowDown = false,
  isSpaceKey = false;
isAKey = false;

// number of dementor objects
let demOne = [{ x: 845, y: 50 }];
let demTwo = [{ x: 945, y: 250 }];
let demIncr = 3;

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
  //----------------------AVENGERS----------------------------------------------
  //thor logic
  for (let k = 0; k < thorPosition.length; k++) {
    ctx.drawImage(thor, thorPosition[k].x, thorPosition[k].y);
    thorPosition[k].x = thorPosition[k].x + 5;

    //collision with demOne

    if (
      thorPosition[k].x + thor.width > demOne[0].x &&
      thorPosition[k].y + thor.height > demOne[0].y &&
      thorPosition[k].x < demOne[0].x + dementor.width &&
      thorPosition[k].y < demOne[0].y + dementor.height
    ) {
      demOne[0] = {
        x: canvas.width + 150,
        y: Math.floor(Math.random() * (canvas.height / 2 - dementor.height)),
      };
      thorPosition[k].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    if (thorPosition.length > 0 && thorPosition[k].x > canvas.width) {
      thorPosition.splice(0, 1);
    }
  }

  //black Widow logic

  for (let l = 0; l < blackWidowPosition.length; l++) {
    ctx.drawImage(blackWidow, blackWidowPosition[l].x, blackWidowPosition[l].y);
    blackWidowPosition[l].x = blackWidowPosition[l].x + 5;

    //collision with demOne

    if (
      blackWidowPosition[l].x + blackWidow.width > demOne[0].x &&
      blackWidowPosition[l].y + blackWidow.height > demOne[0].y &&
      blackWidowPosition[l].x < demOne[0].x + dementor.width &&
      blackWidowPosition[l].y < demOne[0].y + dementor.height
    ) {
      demOne[0] = {
        x: canvas.width + 150,
        y: Math.floor(Math.random() * (canvas.height / 2 - dementor.height)),
      };
      blackWidowPosition[l].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    //collision with demTwo

    if (
      blackWidowPosition[l].x + blackWidow.width > demTwo[0].x &&
      blackWidowPosition[l].y + blackWidow.height > demTwo[0].y &&
      blackWidowPosition[l].x < demTwo[0].x + dementor.width &&
      blackWidowPosition[l].y < demTwo[0].y + dementor.height
    ) {
      demTwo[0] = {
        x: canvas.width + 150,
        y:
          Math.floor(Math.random() * (canvas.height / 2 - dementor.height)) +
          canvas.height / 2,
      };
      blackWidowPosition[l].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    if (
      blackWidowPosition.length > 0 &&
      blackWidowPosition[l].x > canvas.width
    ) {
      blackWidowPosition.splice(0, 1);
    }
  }

  //hulk

  for (let m = 0; m < hulkPosition.length; m++) {
    ctx.drawImage(hulk, hulkPosition[m].x, hulkPosition[m].y);
    hulkPosition[m].x = hulkPosition[m].x + 5;

    //collision with demOne

    if (
      hulkPosition[m].x + hulk.width > demOne[0].x &&
      hulkPosition[m].y + hulk.height > demOne[0].y &&
      hulkPosition[m].x < demOne[0].x + dementor.width &&
      hulkPosition[m].y < demOne[0].y + dementor.height
    ) {
      demOne[0] = {
        x: canvas.width + 150,
        y: Math.floor(Math.random() * (canvas.height / 2 - dementor.height)),
      };
      hulkPosition[m].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    //collision with demTwo

    if (
      hulkPosition[m].x + hulk.width > demTwo[0].x &&
      hulkPosition[m].y + hulk.height > demTwo[0].y &&
      hulkPosition[m].x < demTwo[0].x + dementor.width &&
      hulkPosition[m].y < demTwo[0].y + dementor.height
    ) {
      demTwo[0] = {
        x: canvas.width + 150,
        y:
          Math.floor(Math.random() * (canvas.height / 2 - dementor.height)) +
          canvas.height / 2,
      };
      hulkPosition[m].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    if (hulkPosition.length > 0 && hulkPosition[m].x > canvas.width) {
      hulkPosition.splice(0, 1);
    }
  }

  //captain america

  for (let n = 0; n < captainAmericaPosition.length; n++) {
    ctx.drawImage(
      captainAmerica,
      captainAmericaPosition[n].x,
      captainAmericaPosition[n].y
    );
    captainAmericaPosition[n].x = captainAmericaPosition[n].x + 5;

    //collision with demTwo

    if (
      captainAmericaPosition[n].x + captainAmerica.width > demTwo[0].x &&
      captainAmericaPosition[n].y + captainAmerica.height > demTwo[0].y &&
      captainAmericaPosition[n].x < demTwo[0].x + dementor.width &&
      captainAmericaPosition[n].y < demTwo[0].y + dementor.height
    ) {
      demTwo[0] = {
        x: canvas.width + 150,
        y:
          Math.floor(Math.random() * (canvas.height / 2 - dementor.height)) +
          canvas.height / 2,
      };
      captainAmericaPosition[n].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    if (
      captainAmericaPosition.length > 0 &&
      captainAmericaPosition[n].x > canvas.width
    ) {
      captainAmericaPosition.splice(0, 1);
    }
  }

  //ironman

  for (let p = 0; p < ironManPosition.length; p++) {
    ctx.drawImage(ironMan, ironManPosition[p].x, ironManPosition[p].y);
    ironManPosition[p].x = ironManPosition[p].x + 5;

    //collision with demTwo

    if (
      ironManPosition[p].x + ironMan.width > demTwo[0].x &&
      ironManPosition[p].y + ironMan.height > demTwo[0].y &&
      ironManPosition[p].x < demTwo[0].x + dementor.width &&
      ironManPosition[p].y < demTwo[0].y + dementor.height
    ) {
      demTwo[0] = {
        x: canvas.width + 150,
        y:
          Math.floor(Math.random() * (canvas.height / 2 - dementor.height)) +
          canvas.height / 2,
      };
      ironManPosition[p].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    if (ironManPosition.length > 0 && ironManPosition[p].x > canvas.width) {
      ironManPosition.splice(0, 1);
    }
  }

  //hawkeye

  for (let q = 0; q < hawkeyePosition.length; q++) {
    ctx.drawImage(hawkeye, hawkeyePosition[q].x, hawkeyePosition[q].y);
    hawkeyePosition[q].x = hawkeyePosition[q].x + 5;

    //collision with demTwo

    if (
      hawkeyePosition[q].x + hawkeye.width > demTwo[0].x &&
      hawkeyePosition[q].y + hawkeye.height > demTwo[0].y &&
      hawkeyePosition[q].x < demTwo[0].x + dementor.width &&
      hawkeyePosition[q].y < demTwo[0].y + dementor.height
    ) {
      demTwo[0] = {
        x: canvas.width + 150,
        y:
          Math.floor(Math.random() * (canvas.height / 2 - dementor.height)) +
          canvas.height / 2,
      };
      hawkeyePosition[q].x = { x: canvas.width + 100 };
      score++;
      scoreKeeper.innerText = score;
      audioSpell.play();
    }

    if (hawkeyePosition.length > 0 && hawkeyePosition[q].x > canvas.width) {
      hawkeyePosition.splice(0, 1);
    }
  }

  //----------------------------------------------------------------AVENGERS oVER--------------------
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

  if (score > 5) {
    demIncr = 5;
  }

  if (score > 20) {
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

    if (score > 20) {
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
  thorPosition = [];
  blackWidowPosition = [];
  hulkPosition = [];
  captainAmericaPosition = [];
  ironManPosition = [];
  hawkeyePosition = [];
  score = 0;
  scoreKeeper.innerText = score;
  start();
}

function avengersDisplay() {
  avengersCall.innerText = "Ready!";
}

function avengersDisplayNone() {
  avengersCall.innerText = "Assembling!";
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
  if (event.key === "a" && score > 5) {
    avengersDisplay();
    thorPosition.push({ x: 0, y: 10 });
    blackWidowPosition.push({ x: 0, y: 80 });
    hulkPosition.push({ x: 0, y: 180 });
    captainAmericaPosition.push({ x: 0, y: 260 });
    ironManPosition.push({ x: 0, y: 320 });
    hawkeyePosition.push({ x: 0, y: 400 });
  } else {
    avengersDisplayNone();
    isAKey = false;
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
