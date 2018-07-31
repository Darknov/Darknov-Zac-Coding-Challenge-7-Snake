import { prepareGame } from './game.js';
import { canvas } from './canvas.js';

startButton.addEventListener("click",() => {
  startButton.hidden = true;
  // leftCurtain.classList.add("flipLeft");
  leftCurtain.classList.add("flipLeft");
	prepareGame();
});