document.addEventListener("DOMContentLoaded", function () {
  const gameArea = document.querySelector(".game-area");
  const pistol = document.querySelector("#pistol");
  const messageBox = document.querySelector("#message-box");
  const restartButton = document.querySelector("#restart-button");
  let score = 0;
  let timeLeft = 20;
  const timeDisplay = document.querySelector("#time-left");
  let timerInterval;

  function createBlock() {
    if (timeLeft <= 0) {
      showMessageBox();
      removeRemainingBlocks();
      clearInterval(timerInterval);
      return;
    }

    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = `${Math.random() * (gameArea.offsetWidth - 30)}px`;
    block.style.top = `${Math.random() * (gameArea.offsetHeight - 30)}px`;
    block.addEventListener("click", () => {
      score++;
      updateScore();
      gameArea.removeChild(block);
    });
    gameArea.appendChild(block);
  }

  function updateScore() {
    document.querySelector("#score").innerText = `Score: ${score}`;
  }

  function showMessageBox() {
    messageBox.style.display = "flex";
    restartButton.addEventListener("click", restartGame);
  }

  function restartGame() {
    score = 0;
    timeLeft = 20;
    updateScore();
    updateTimeDisplay();
    messageBox.style.display = "none";
    startTimer();
  }

  function removeRemainingBlocks() {
    const blocks = document.querySelectorAll(".block");
    blocks.forEach(block => gameArea.removeChild(block));
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimeDisplay();
    }, 1000);
  }

  function updateTimeDisplay() {
    timeDisplay.innerText = `Time left: ${timeLeft} seconds`;
  }

  gameArea.addEventListener("click", () => {
    if (!backgroundChanged) {
      pistol.style.background = "url(./img/fire.png)";
      pistol.style.transform = "translate(-5%, -40%) rotate(7deg)";
      pistol.style.backgroundSize = "cover";

      backgroundChanged = true;

      setTimeout(() => {
        pistol.style.background = "url(./img/pistol.png)";
        pistol.style.transform = "translate(-5%, -40%) rotate(0deg)";
        pistol.style.transition = ".05s";
        pistol.style.backgroundSize = "cover";
        backgroundChanged = false;
      }, 70);
    }
  });

  let backgroundChanged = false;

  gameArea.addEventListener("click", () => {
    if (!backgroundChanged) {
      pistol.style.background = "url(./img/fire.png)";
      pistol.style.backgroundSize = "cover";

      backgroundChanged = true;

      setTimeout(() => {
        pistol.style.background = "url(./img/pistol.png)";
        pistol.style.backgroundSize = "cover";
        backgroundChanged = false;
      }, 80);
    }
  });

  gameArea.addEventListener("mousemove", (e) => {
    if (timeLeft > 0) {
      pistol.style.left = `${e.clientX - 15}px`;
      pistol.style.top = `${e.clientY - 15}px`;
    }
  });

  setInterval(createBlock, 700);

  startTimer();
  updateScore();
  updateTimeDisplay();
});