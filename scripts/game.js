import { mouse } from './mouse.js';
import { canvas, context, clearCanvas } from './canvas.js';
import { player } from './player.js';
import * as apples from './apples.js';
import * as traps from './traps.js';
import { music, eat, hit } from './audio.js';
import * as particleEffects from './particleEffect.js';
import { checkIfImagesAreLoaded } from './images.js';

export function startGame() {
  console.log("start");
  console.log(checkIfImagesAreLoaded());
  requestAnimationFrame(frame)
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


