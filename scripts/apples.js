import { apple } from './images.js';
import { canvas, draw } from './canvas.js';
import CONSTANTS from './constants.js';
import { getRandomInt } from './utils.js';

class Apple {
	constructor(x,y) {
		this.x = x;
		this.y = y;
		this.img = apple;
	}
}

const apples = [];
let lastGenerationTime = Date.now();
apples.push(new Apple(50,50));

export function update() {
  if(lastGenerationTime + CONSTANTS.appleGenerationInterval < Date.now()) {
    const generatedApple = new Apple(
      getRandomInt(apple.width, canvas.width - apple.width), 
      getRandomInt(apple.height, canvas.height - apple.height)
    );
    apples.push(generatedApple);
    lastGenerationTime = Date.now();
  }
}

export function render() {
	for (const apple of apples) {
    draw(apple.img, apple.x, apple.y);
	}
}