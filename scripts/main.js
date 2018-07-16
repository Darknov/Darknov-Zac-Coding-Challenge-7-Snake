import { mouse } from './mouse.js';
import { canvas, context, clearCanvas } from './canvas.js';
import { player } from './player.js';

// fuction that draws everything we need
// on the canvas
function render() {
	clearCanvas();
	player.render();
}

// function that updates objects
function update() {
	player.update();
}

function frame() {
	update();
	render();
	requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
