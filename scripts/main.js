import { mouse } from './mouse.js';
import { canvas, context, clearCanvas } from './canvas.js';
import { player } from './player.js';




function render() {
	clearCanvas();
	player.render();
}

function update() {
	player.update();
}

function frame() {
	update();
	render();
	requestAnimationFrame(frame)
}

requestAnimationFrame(frame)
