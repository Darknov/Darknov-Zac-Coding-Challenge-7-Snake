import { trap } from './images.js';
import { canvas, context } from './canvas.js';

class Trap {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.img = trap;
    this.r = 0;
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
  for (const trap of traps) {
    trap.r += 0.05;
  }
}
export function render() {
  for (const trap of traps) {
    context.save(); //saves the state of canvas
    context.translate(trap.x + trap.img.width/2, trap.y + trap.img.height/2); //let's translate
    context.rotate(trap.r); //increment the angle and rotate the image 
    context.drawImage(trap.img, -trap.img.width/2, -trap.img.height/2); //draw the image ;)
    context.restore(); //restore the state of canvas
  }
}

