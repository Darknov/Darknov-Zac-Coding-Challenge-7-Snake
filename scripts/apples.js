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
    const generatedApple = new Apple();
    const x = getRandomInt(generatedApple.img.width, canvas.width - generatedApple.img.width);
    const y = getRandomInt(generatedApple.img.height, canvas.height - generatedApple.img.height);
    generatedApple.x = x;
    generatedApple.y = y;
    apples.push(generatedApple);
    lastGenerationTime = Date.now();
  }
}

export function render() {
	for (const apple of apples) {
    draw(apple.img, apple.x, apple.y);
	}
}