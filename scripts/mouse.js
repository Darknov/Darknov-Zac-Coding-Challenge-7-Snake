import { canvas } from './canvas.js';

export const mouse = {
	x: 0,
	y: 0
}


/* example of using getmousepos
function draw(e) {
    var pos = getMousePos(canvas, e);
    posx = pos.x;
    posy = pos.y;
	context.drawImage(boxImg, posx, posy);
}
window.addEventListener('mousemove', draw, false);
*/

// getting mouse position on canvas
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

function updateMouse(e) {
    var {x, y} = getMousePos(canvas, e);
	mouse.x = x;
	mouse.y = y;
}

window.addEventListener('mousemove', updateMouse, false);

