import { trap } from './images.js';
import { canvas, draw } from './canvas.js';

class Trap {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.img = trap;
  }
}

export const traps = [];
let lastGenerationTime = Date.now();
traps.push(new Trap(canvas.width/2 - trap.width/2,canvas.height/2 - trap.height/2));
traps.push(new Trap(canvas.width/4 - trap.width/2,canvas.height/4 - trap.height/2));
traps.push(new Trap(canvas.width/1.3 - trap.width/2,canvas.height/1.3 - trap.height/2));
traps.push(new Trap(canvas.width/1.3 - trap.width/2,canvas.height/4 - trap.height/2));
traps.push(new Trap(canvas.width/4 - trap.width/2,canvas.height/1.3 - trap.height/2));
export function update() {

}

export function render() {
  for (const trap of traps) {
    draw(trap.img, trap.x, trap.y);
  }
}

