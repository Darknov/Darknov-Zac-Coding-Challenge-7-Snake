import { getRandomInt, getRandom } from './utils.js';
import { context } from './canvas.js';
import { particle1 } from './images.js';
import { CONSTANTS } from './GAME_OPTIONS.js';
import { abs } from './utils.js';

const particleEffects = [];

export class ParticleEffect {
  constructor({x, y}, img, time) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.time = time;
    this.particles = [];
    this.fire();
  }

  fire() {
    for(let i = 0; i < CONSTANTS.brutality; i++) {
      //some spread(It has a good spread :))
      const particle = {x: getRandomInt(-10, 10), y: getRandomInt(-10, 10), velocity: {x: 0, y: 0}};
      
      const angle = getRandomInt(0, Math.PI);
      const proportion = {
        x: abs(Math.sin(angle)),
        y: abs(Math.cos(angle))
      }
      if(getRandomInt(0, 1) === 0) {
        proportion.x = -proportion.x;
      }
      if(getRandomInt(0, 1) === 0) {
        proportion.y = -proportion.y;
      }
      particle.velocity.x = 5 * proportion.x;
      particle.velocity.y = 5 * proportion.y;

      this.particles.push(particle);
    }
    this.startTime = Date.now();

    particleEffects.push(this);
  }

  update() {
    for (const particle of this.particles) {
      particle.x += particle.velocity.x;
      particle.y += particle.velocity.y;
    }
  }

  render() {
    for (const particle of this.particles) {
      context.drawImage(this.img, this.x + particle.x, this.y + particle.y);
    }
  }
}

export function update() {
  for(let i = 0; i < particleEffects.length; i++) {
    particleEffects[i].update();
    if(particleEffects[i].startTime + particleEffects[i].time < Date.now()) {
      particleEffects.splice(i, 1);
      i--;
    }
  }
}

export function render() {
  for (const particleEffect of particleEffects) {
    particleEffect.render();
  }
}
