import { context } from './canvas.js';
import { mouse } from './mouse.js';
import { box } from './images.js';
import CONSTANTS from './constants.js';
import { abs } from './utils.js'
import { apples } from './apples.js';
export class PlayerPart {
  constructor(x,y,r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.img = box;
  }
}

export const player = {
	x: 0,
	y: 0,
  img: box,
	velocity: {x:0, y:0},
	boxes: [new PlayerPart(0,0,0)],
	render: function() {
		for(let i = this.boxes.length - 1; i >= 0; i--) {
			context.save();
			context.beginPath();
			context.translate( this.boxes[i].x + 12, this.boxes[i].y + 12 );
			// temporary
			// we need to add rotation speed
			// or something else
			// so there is no instant rotation to the next box
			let rotation = 0;
			if(i == 0) {
				rotation = Math.atan2(mouse.y - this.boxes[i].y - 12, mouse.x - this.boxes[i].x - 12);
        
			} else {
				rotation = Math.atan2(this.boxes[i-1].y - this.boxes[i].y, this.boxes[i-1].x - this.boxes[i].x);
			}
      this.boxes[i].r = rotation;
			context.rotate(this.boxes[i].r);
			context.drawImage(this.img, -12, -12);
			context.restore();
		}
	},
	update: function() {
		// velocity with mouse to 'smoothen' travel to mouse

    const mouseDistance = {
      x: (mouse.x - 24 - this.boxes[0].x),
      y: (mouse.y - 12 - this.boxes[0].y)
    }

    let toMouseVelocity = {
			x: mouseDistance.x/5,
			y: mouseDistance.y/5
		}

    const proportion = {
      x: abs(Math.sin(Math.atan2(mouseDistance.x, mouseDistance.y))),
      y: abs(Math.cos(Math.atan2(mouseDistance.x, mouseDistance.y)))
    }

		if(toMouseVelocity.x > 0) {
			this.velocity.x = CONSTANTS.maxVelocity * proportion.x > toMouseVelocity.x ? toMouseVelocity.x : CONSTANTS.maxVelocity * proportion.x;
		} else {
			this.velocity.x = CONSTANTS.maxVelocity * proportion.x > -toMouseVelocity.x ? toMouseVelocity.x : -CONSTANTS.maxVelocity * proportion.x;
		}
		
		if(toMouseVelocity.y > 0) {
			this.velocity.y = CONSTANTS.maxVelocity * proportion.y > toMouseVelocity.y ? toMouseVelocity.y : CONSTANTS.maxVelocity * proportion.y;
		} else {
			this.velocity.y = CONSTANTS.maxVelocity * proportion.y > -toMouseVelocity.y ? toMouseVelocity.y : -CONSTANTS.maxVelocity * proportion.y;
		}

		this.boxes[0].x += this.velocity.x;
		this.boxes[0].y += this.velocity.y;
		for(let i = 1; i < this.boxes.length; i++) {
			this.boxes[i].x += (this.boxes[i-1].x - this.boxes[i].x)/5 * (abs(this.velocity.x) + abs(this.velocity.y)) / 5;
			this.boxes[i].y += (this.boxes[i-1].y - this.boxes[i].y)/5 * (abs(this.velocity.x) + abs(this.velocity.y)) / 5;
		}
    for(let i = 0; i < apples.length; i++) {
      if(checkCollision(this.boxes[0], apples[i])) {
        const {x, y} =  this.boxes[this.boxes.length - 1];
        this.boxes.push(new PlayerPart(x, y));
        apples.splice(i, 1);
        i--;
      }
    }
	}
}

function checkCollision(player, object) {
  return !(
      ((player.y + player.img.height) < (object.y)) ||
      (player.y > (object.y + object.img.height)) ||
      ((player.x + player.img.width) < object.x) ||
      (player.x > (object.x + object.img.width))
  );
}