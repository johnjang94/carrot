// ========= GAME COUNT ==========
let timeCounter = document.getElementById("seconds");
let startCount = document.querySelector(".play-button");
let playImage = document.querySelector(".play-image");
let timeMessage = document.getElementById("message");
let timerBox = document.getElementById("time");

let timeoutIds = [];
let remainingTime;

let carrotCount = document.getElementById("countCarrot");

// ========= GAME STATUS ==========
let gameMessage = document.getElementById("game-message");
let gameMessage2 = document.getElementById("game-message2");
let gameStatus = document.querySelector(".status");

// ========= GAME BUTTONS SETTING ==========
let replayButton = document.querySelector(".replay-image-button");
let continueButton = document.querySelector(".continue");
let finishButton = document.querySelector(".finish");

// ========= RANDOM POSITIONING ==========
let randomPositions = document.querySelectorAll(".food");
let deadlyBugs = document.querySelectorAll(".bug");
let niceCarrotImgs = document.querySelectorAll(".carrot");
let images = document.querySelectorAll(".image");

// ========= ACCESSORY ==========
let noticeBoard = document.querySelector(".notice");

// ========= SOUND RELATED CONTROL ==========
let backgroundMusic = new Audio("carrot/sound/bg.mp3");
let carrotSound = new Audio("carrot/sound/carrot_pull.mp3");
let bugSound = new Audio("carrot/sound/bug_pull.mp3");
let gameWin = new Audio("carrot/sound/game_win.mp3");
let alertAlarm = new Audio("carrot/sound/alert2.mp3");
let gameOver = new Audio("carrot/sound/game_over.mp3");

window.addEventListener("DOMContentLoaded", () => {
  gameStatus.style.display = "none";
  carrotCount.textContent = niceCarrotImgs.length;

  randomElement();
});

const changeImage = () => {
  if (playImage.getAttribute("src") === "carrot/img/play_button.png") {
    startCount.addEventListener("click", () => {
      playImage.setAttribute("src", "carrot/img/pause-button.png");
      playImage.style.backgroundColor = "red";
      playImage.style.width = "60px";

      noticeBoard.style.display = "none";
      backgroundMusic.play();

      deadlyBugs.forEach((deadlyBug) => {
        deadlyBug.addEventListener("click", () => {
          stopCountDown();
          bugSound.play();
          alertInfo();
        });
      });

      if (
        remainingTime < 10 ||
        continueButton.addEventListener("click", () => {
          resumeCountDown();

          gameStatus.style.display = "none";
          playImage.setAttribute("src", "carrot/img/pause-button.png");
          playImage.style.backgroundColor = "red";
          playImage.style.width = "60px";
        })
      ) {
        // resumeCountDown();
      } else {
        countdown(10);
      }
    });
    carrotCountDown();
    gameStatus.style.display = "none";
  } else if (playImage.getAttribute("src") === "carrot/img/pause-button.png") {
    startCount.addEventListener("click", () => {
      playImage.setAttribute("src", "carrot/img/play_button.png");
      playImage.style.backgroundColor = "black";
      playImage.style.width = "100px";

      stopCountDown();
    });
    gameStatus.style.display = "block";
    gameMessage.innerHTML = "GAME PAUSED";
    gameMessage.style.color = "black";

    replayButton.style.display = "none";

    continueButton.innerHTML = "continue";
    finishButton.innerHTML = "finish";
  }
};

const countdown = (seconds) => {
  for (let i = seconds; i >= 0; i--) {
    const timeoutId = setTimeout(() => {
      timeCounter.innerHTML = i;
      i == 1
        ? (timeMessage.innerHTML = "second")
        : (timeMessage.innerHTML = "seconds");

      if (i == 0) {
        alertInfo();
      }

      finishButton.addEventListener("click", () => {
        timeCounter.innerHTML = 0;
        alertInfo();
      });

      i < 5
        ? ((timerBox.style.backgroundColor = "red"),
          (timeMessage.style.color = "red"),
          alertAlarm.play(),
          (alertAlarm.volume = "20%"))
        : ((timerBox.style.backgroundColor = "transparent"),
          (timeMessage.style.color = "white"));
    }, (seconds - i) * 1000);
    timeoutIds.push(timeoutId);
  }
};

const alertInfo = () => {
  gameStatus.style.display = "block";
  gameStatus.style.height = "200px";
  gameStatus.style.marginTop = "100px";

  gameMessage.innerHTML = "GAME OVER";
  gameMessage.style.color = "red";
  gameMessage.style.paddingTop = "40px";

  startCount.style.display = "none";
  gameMessage2.style.display = "none";

  replayButton.style.display = "block";
  replayButton.style.marginTop = "40px";
  replayButton.addEventListener("click", () => {
    location.reload();
  });

  alertAlarm.pause();
  backgroundMusic.pause();
  gameOver.play();
};

const winnerInfo = () => {
  gameStatus.style.display = "block";
  gameStatus.style.height = "200px";
  gameStatus.style.marginTop = "100px";

  gameMessage.innerHTML = "YOU WIN!";
  gameMessage.style.color = "blue";
  gameMessage.style.paddingTop = "40px";

  startCount.style.display = "none";
  gameMessage2.style.display = "none";

  stopCountDown();

  replayButton.style.display = "block";
  replayButton.style.marginTop = "40px";
  replayButton.addEventListener("click", () => {
    location.reload();
  });
  gameWin.play();
  backgroundMusic.pause();
  alertAlarm.pause();
};

const stopCountDown = () => {
  timeoutIds.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });
  remainingTime = timeCounter.innerHTML;
};

const resumeCountDown = () => {
  countdown(remainingTime);
};

const carrotCountDown = () => {
  niceCarrotImgs.forEach((niceCarrotImg) => {
    niceCarrotImg.addEventListener("click", () => {
      carrotSound.play();
      carrotCount.textContent = parseInt(carrotCount.textContent) - 1;
      if (carrotCount.textContent == 0) {
        winnerInfo();
      }
      niceCarrotImg.style.display = "none";
    });
  });
};

// I DO NOT GET WHY STOP-CARROT-COUNTDOWN FUNCTION IS NOT WORKING DESPITE IMPLEMENTATION
// PRESENTLY, I HAVE DECIDED NOT TO CONNECT THE FOLLOWING FUNCTION TO ANYWHERE ELSE.
function stopCarrotCountDown() {
  if (stopCountDown && !countdown) {
    niceCarrotImgs.forEach((niceCarrotImg) => {
      niceCarrotImg.removeEventListener("click", () => {
        carrotCount.textContent = parseInt(carrotCount.textContent) - 1;
      });

      carrotCount.textContent = Object.freeze(niceCarrotImgs.length);
      niceCarrotImg.style.display = "block";
      niceCarrotImg.style.cursor = "default";
    });
  }
}

const randomElement = () => {
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;
  const minTop = 450;
  const maxTop = viewportHeight - 100;
  const minLeft = 50;
  const maxLeft = viewportWidth - 100;

  randomPositions.forEach((randomPosition) => {
    const randomTop = Math.floor(
      Math.random() * (maxTop - minTop + 1) + minTop
    );
    const randomLeft = Math.floor(
      Math.random() * (maxLeft - minLeft + 1) + minLeft
    );

    randomPosition.style.position = "absolute";
    randomPosition.style.top = `${randomTop}px`;
    randomPosition.style.left = `${randomLeft}px`;
  });
};
