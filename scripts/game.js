import { mouse } from './mouse.js';
import { canvas, context, clearCanvas } from './canvas.js';
import { player } from './player.js';
import * as apples from './apples.js';
import * as traps from './traps.js';
import { music, eat, hit } from './audio.js';

export function startGame() {
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
	player.render();
  apples.render();
  traps.render();
}

// function that updates objects
function update() {
	player.update();
  apples.update();
  traps.update();
}

function frame() {
	update();
	render();
	requestAnimationFrame(frame)
}


