import { mouse } from './mouse.js';
import { canvas, context, clearCanvas } from './canvas.js';
import { player } from './player.js';
import * as apples from './apples.js';
import * as traps from './traps.js';
import { music, eat, hit } from './audio.js';
import * as particleEffects from './particleEffect.js';
import { areImagesLoaded, howManyImagesLoaded } from './images.js';

let isGameStarted = false;

function loadingImages() {
  let imgs = images.checkHowManyImagesAreLoaded();
  document.getElementById("images").textContent = imgs.x + "/" + imgs.y;  
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

function startGame() {
  music.play();
  requestAnimationFrame(frame);
}

function startGameIfImagesLoaded() { 
  if(!areImagesLoaded()) {
    console.log("Waiting for images to load");
    setTimeout(startGameIfImagesLoaded, 300);
  } else if(!isGameStarted) {
    isGameStarted = true;
    startGame();
  }
}

export function prepareGame() {
  hit.muted = false;
  music.muted = false;
  eat.unmute();
  startGameIfImagesLoaded();
}


