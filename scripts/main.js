

const player = {
	x: 0,
	y: 0,
	boxes: [{x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}],
	render: function() {
		for(let i = 0; i < this.boxes.length; i++) {
			context.drawImage(boxImg, this.boxes[i].x, this.boxes[i].y);
		}
	},
	update: function() {
		this.boxes[0].x = mouse.x - 24;
		this.boxes[0].y = mouse.y - 12;
		for(let i = 1; i < this.boxes.length; i++) {
			this.boxes[i].x += (this.boxes[i-1].x - 24 - this.boxes[i].x)/2;
			this.boxes[i].y += (this.boxes[i-1].y - this.boxes[i].y)/2;
		}
	}
	
}

const mouse = {
	x: 0,
	y: 0
}

const assetsPath = "./assets/";

const boxImg = document.getElementById("box");

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function render() {
	clearCanvas();
	player.render();
	//context.drawImage(boxImg, mouse.x, mouse.y);

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
function updateMouse(e) {
    var {x, y} = getMousePos(canvas, e);
	mouse.x = x;
	mouse.y = y;
}
window.addEventListener('mousemove', updateMouse, false);
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}