import { fruits } from './images.js';
import { canvas, draw } from './canvas.js';
import { CONSTANTS } from './GAME_OPTIONS.js';
import { getRandomInt } from './utils.js';

class Apple {
	constructor(x = -50,y = -50) {
		this.x = x;
		this.y = y;
		this.img = fruits[getRandomInt(0, fruits.length - 1)];
	}
}

export const apples = [];
let lastGenerationTime = Date.now();

export function update() {
  if(lastGenerationTime + CONSTANTS.appleGenerationInterval < Date.now() && apples.length < CONSTANTS.maxApples) {
    const x = getRandomInt(0, canvas.width);
    const y = getRandomInt(0, canvas.height);
    const generatedApple = new Apple();
    generatedApple.x = x - generatedApple.img.width;
    generatedApple.y = y - generatedApple.img.height;
    apples.push(generatedApple);
    lastGenerationTime = Date.now();
  }
}

export function render() {
	for (const apple of apples) {
    draw(apple.img, apple.x, apple.y);
	}
}