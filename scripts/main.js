import { prepareGame } from './game.js';
import { canvas } from './canvas.js';

function startGame(mode) {
  startButtons.style.display = "none";
  startButtons.hidden = true;
  leftCurtain.classList.add("flipLeft");
  prepareGame(mode);
}

startButton.addEventListener("click", () => {
  startGame(0);
});

startButton1.addEventListener("click", () => {
  startGame(1);
});

