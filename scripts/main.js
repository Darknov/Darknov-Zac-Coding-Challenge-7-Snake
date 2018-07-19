import * as images from './images.js';
import { startGame } from './game.js';


function loadingImages() {
  let imgs = images.checkHowManyImagesAreLoaded();
  document.getElementById("images").textContent = imgs.x + "/" + imgs.y;  
}

// checking how many images are loaded
// we will need to do some loading
// because sometimes images dont
// load quickly enough and game stops
// when its trying to draw them
// setInterval(loadingImages , 50);

startButton.addEventListener("click",() => {
	startGame();
});