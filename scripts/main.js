// temporarily
const boxImg = document.getElementById("box");

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

const player = {
	x: 0,
	y: 0,
	velocity: {x:0, y:0},
	boxes: [{x:0, y:0}, {x:0, y:0}, {x:0, y:0}, {x:0, y:0}],
	render: function() {
		for(let i = 0; i < this.boxes.length; i++) {
			context.save();
			context.beginPath();
			context.translate( this.boxes[i].x + 12, this.boxes[i].y + 12 );
			// temporary
			// we need to add rotation speed
			// or something else
			// so there is no instant rotation to the next box
			let rotation = 0;
			if(i == 0) {
				rotation = Math.atan2(mouse.y - this.boxes[i].y - 12, mouse.x - this.boxes[i].x - 12)
			} else {
				rotation = Math.atan2(this.boxes[i-1].y - this.boxes[i].y, this.boxes[i-1].x - this.boxes[i].x)
			}
			context.rotate(rotation);
			context.drawImage(boxImg, -12, -12);
			context.restore();
		}
	},
	update: function() {
		// max velocity that snake can travel with
		// temporary
		// we will have to calculate sin or cos to
		// get real max velocity
		let maxVelocity = {x: 5, y: 5};
		// velocity with mouse to 'smoothen' travel to mouse
		let toMouseVelocity = {
			x: (mouse.x - 24 - this.boxes[0].x)/5,
			y: (mouse.y - 12 - this.boxes[0].y)/5
		}
		if(toMouseVelocity.x > 0) {
			this.velocity.x = maxVelocity.x > toMouseVelocity.x ? toMouseVelocity.x : maxVelocity.x;
		} else {
			this.velocity.x = maxVelocity.x > -toMouseVelocity.x ? toMouseVelocity.x : -maxVelocity.x;
		}
		
		if(toMouseVelocity.y > 0) {
			this.velocity.y = maxVelocity.y > toMouseVelocity.y ? toMouseVelocity.y : maxVelocity.y;
		} else {
			this.velocity.y = maxVelocity.y > -toMouseVelocity.y ? toMouseVelocity.y : -maxVelocity.y;
		}
		
		
		
		this.boxes[0].x += this.velocity.x;
		this.boxes[0].y += this.velocity.y;

		for(let i = 1; i < this.boxes.length; i++) {
			let attachPointX = this.velocity.x >= 0 ? -12 : 12;
			let attachPointY = this.velocity.y >= 0 ? -12 : 12;
			this.boxes[i].x += (this.boxes[i-1].x + attachPointX - this.boxes[i].x)/2;
			this.boxes[i].y += (this.boxes[i-1].y + attachPointY - this.boxes[i].y)/2;
		}
	}
	
}

const mouse = {
	x: 0,
	y: 0
}



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