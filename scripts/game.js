import { mouse } from './mouse.js';
import { canvas, context, clearCanvas } from './canvas.js';
import { player } from './player.js';
import * as apples from './apples.js';
import * as traps from './traps.js';
import { music, eat, hit } from './audio.js';
import * as particleEffects from './particleEffect.js';
import { areImagesLoaded, howManyImagesLoaded } from './images.js';

let wasNotClicked = true;

isGameLoaded();

function loadingImages() {
  let imgs = images.checkHowManyImagesAreLoaded();
  document.getElementById("images").textContent = imgs.x + "/" + imgs.y;  
}
// should prevent starting g
function isGameLoaded() {
  if(wasNotClicked) {
    startGameIfImagesLoaded();
  } 
  wasNotClicked = false;

}

function startGameIfImagesLoaded() { 
  if(!areImagesLoaded()) {
    console.log("Waiting for images to load");
    setTimeout(startGameIfImagesLoaded, 300);
  } else {
    startGame();
  }
}

export function startGame() {
  requestAnimationFrame(frame);
  hit.muted = false;
  music.muted = false;
  eat.unmute();
  music.play();
}
// fuction that draws everything we need
// on the canvas
function render() {
	clearCanvas();
  apples.render();
  traps.render();
  player.render();
  particleEffects.render();

}

// function that updates objects
function update() {
  apples.update();
  traps.update();
	player.update();
  particleEffects.update();
}

function frame() {
	update();
	render();
	requestAnimationFrame(frame)
}


