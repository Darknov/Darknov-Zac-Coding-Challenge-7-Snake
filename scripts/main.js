import { prepareGame } from './game.js';

startButton.addEventListener("click",() => {
  startButton.hidden = true;
	prepareGame();
});