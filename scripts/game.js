import { mouse } from './mouse.js';
import { canvas, context, clearCanvas } from './canvas.js';
import { player } from './player.js';
import * as apples from './apples.js';

// fuction that draws everything we need
// on the canvas
function render() {
	clearCanvas();
	player.render();
  apples.render();
}

// function that updates objects
function update() {
	player.update();
  apples.update();
}

function frame() {
	update();
	render();
	requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
