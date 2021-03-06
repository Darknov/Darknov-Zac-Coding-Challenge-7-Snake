import { context, canvas } from './canvas.js';
import { mouse } from './mouse.js';
import { box, head, tail, yummy, delicious, particle1, particle3 } from './images.js';
import { CONSTANTS, changeScore, addPoint } from './GAME_OPTIONS.js';
import { abs, isCollision, getRandomInt } from './utils.js'
import { apples } from './apples.js';
import { traps } from './traps.js';
import { eat, hit } from './audio.js';
import { ParticleEffect } from './particleEffect.js';

export class PlayerPart {
  constructor(x, y, r, img = box) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.img = img;
    this.lastX = x;
    this.lastY = y;
  }
}

const eatingOrder = [];
let eatingTime = Date.now();
let yummyTime = Date.now();
let yummyImg = yummy;
let showYummy = false;

export const player = {
  img: box,
  img2: head,
  img3: tail,
  velocity: { x: 0, y: 0 },
  boxes: [new PlayerPart(CONSTANTS.startingPoint.x, CONSTANTS.startingPoint.y, 0, head)],
  render: function () {
    for (let i = this.boxes.length - 1; i >= 0; i--) {
      context.save();
      context.beginPath();
      context.translate(this.boxes[i].x + 12, this.boxes[i].y + 12);
      // temporary
      // we need to add rotation speed
      // or something else
      // so there is no instant rotation to the next box
      let rotation = 0;
      if (i == 0) {
        rotation = Math.atan2(mouse.y - this.boxes[i].y - this.img2.height / 2, mouse.x - this.boxes[i].x - this.img2.width / 2);

      } else {
        rotation = Math.atan2(this.boxes[i - 1].y - this.boxes[i].y, this.boxes[i - 1].x - this.boxes[i].x);
      }
      this.boxes[i].r = rotation;
      context.rotate(this.boxes[i].r);
      for (let j = 0; j < eatingOrder.length; j++) {
        if (eatingOrder[j] === i) {
          context.scale(CONSTANTS.eatingSizeX, CONSTANTS.eatingSizeY);
        }
      }
      if (i === 0) {
        context.drawImage(this.img2, -this.img2.width / 2, -this.img2.height / 2);
      }
      else if (i === this.boxes.length - 1) {
        context.drawImage(this.img3, -this.img3.width / 2, -this.img3.height / 2);
      } else {
        context.drawImage(this.img, -this.img.width / 2, -this.img.height / 2);
      }

      context.restore();
    }
    if (showYummy) {
      context.drawImage(yummyImg, this.boxes[0].x, this.boxes[0].y - yummyImg.height);
    }
  },
  update: function () {
    this.moveHead();
    this.moveTail();
    for (let i = 0; i < apples.length; i++) {
      if (isCollision(this.boxes[0], apples[i], 5, 5)) {
        this.eatsApple();
        apples.splice(i, 1);
        i--;
      }
    }

    for (let i = 0; i < this.boxes.length; i++) {
      if (CONSTANTS.mode === 1 && i >= 1) {
        break;
      }
      for (let j = 0; j < traps.length; j++) {
        if (isCollision(this.boxes[i], traps[j], 15, 15)) {
          new ParticleEffect({ x: this.boxes[i].x, y: this.boxes[i].y }, particle1, 350);
          this.death();
          break;
        }
      }
    }

    if (this.boxes[0].x < 0 || this.boxes[0].x > canvas.width - this.img.width ||
      this.boxes[0].y < 0 || this.boxes[0].y > canvas.height - this.img.height) {
      new ParticleEffect({ x: this.boxes[0].x, y: this.boxes[0].y }, particle1, 350);
      this.death();
    }

    if (CONSTANTS.mode === 1) {
      if (this.boxes.length > 15) {
        for (let i = 15; i < this.boxes.length; i++) {
          if (isCollision(this.boxes[0], this.boxes[i], 15, 15)) {
            new ParticleEffect({ x: this.boxes[0].x, y: this.boxes[0].y }, particle1, 350);
            this.death();
          }
        }
      }
    }

    if (eatingTime + CONSTANTS.eatingTime < Date.now()) {
      this.moveApplesDeeper();
    }

    if (yummyTime + CONSTANTS.yummyTime < Date.now() && showYummy) {
      showYummy = false;
    }

  },
  eatsApple: function () {
    const { x, y } = this.boxes[this.boxes.length - 1];
    const coordinates = { x: this.boxes[0].x, y: this.boxes[0].y };
    new ParticleEffect({ x: coordinates.x, y: coordinates.y }, particle3, 150);
    if (CONSTANTS.mode === 0) {
      this.boxes.push(new PlayerPart(x, y));
    }

    if (CONSTANTS.mode === 1) {
      for (let i = 0; i < 5; i++) {
        player.boxes.push(new PlayerPart(x, y, 0));
      }
    }

    eatingOrder.push(0);
    this.yummy();
    addPoint();
    eat.play();
  },
  death: function () {
    hit.play();
    this.boxes.splice(1, this.boxes.length - 1);
    this.boxes[0].x = CONSTANTS.startingPoint.x;
    this.boxes[0].y = CONSTANTS.startingPoint.y;
    changeScore(0);
    apples.splice(0, apples.length);
  },
  moveHead: function () {
    const mouseDistance = {
      x: (mouse.x - this.img2.width - this.boxes[0].x),
      y: (mouse.y - this.img2.height / 2 - this.boxes[0].y)
    }

    let toMouseVelocity = {
      x: mouseDistance.x / 25,
      y: mouseDistance.y / 25
    }

    const proportion = {
      x: abs(Math.sin(Math.atan2(mouseDistance.x, mouseDistance.y))),
      y: abs(Math.cos(Math.atan2(mouseDistance.x, mouseDistance.y)))
    }

    if (toMouseVelocity.x > 0) {
      this.velocity.x = CONSTANTS.maxVelocity * proportion.x > toMouseVelocity.x ? toMouseVelocity.x : CONSTANTS.maxVelocity * proportion.x;
    } else {
      this.velocity.x = CONSTANTS.maxVelocity * proportion.x > -toMouseVelocity.x ? toMouseVelocity.x : -CONSTANTS.maxVelocity * proportion.x;
    }

    if (toMouseVelocity.y > 0) {
      this.velocity.y = CONSTANTS.maxVelocity * proportion.y > toMouseVelocity.y ? toMouseVelocity.y : CONSTANTS.maxVelocity * proportion.y;
    } else {
      this.velocity.y = CONSTANTS.maxVelocity * proportion.y > -toMouseVelocity.y ? toMouseVelocity.y : -CONSTANTS.maxVelocity * proportion.y;
    }

    if (Math.sqrt((mouseDistance.x + this.img2.width / 2) ** 2 + (mouseDistance.y) ** 2) < CONSTANTS.headToMouseMinDistance) {
      this.velocity.x = 0;
      this.velocity.y = 0;
    }

    this.boxes[0].lastX = this.boxes[0].x;
    this.boxes[0].lastY = this.boxes[0].y;
    this.boxes[0].x += this.velocity.x;
    this.boxes[0].y += this.velocity.y;
  },
  moveTail: function () {
    if (CONSTANTS.mode === 0) {
      for (let i = 1; i < this.boxes.length; i++) {
        this.boxes[i].x += (this.boxes[i - 1].x - this.boxes[i].x) / 5 * (abs(this.velocity.x) + abs(this.velocity.y)) / 5;
        this.boxes[i].y += (this.boxes[i - 1].y - this.boxes[i].y) / 5 * (abs(this.velocity.x) + abs(this.velocity.y)) / 5;
      }
    }

    if (CONSTANTS.mode === 1) {
      for (let i = 1; i < this.boxes.length; i++) {
        this.boxes[i].lastX = this.boxes[i].x;
        this.boxes[i].lastY = this.boxes[i].y;
        if (abs(this.velocity.x) + abs(this.velocity.y) > 0.5) {
          this.boxes[i].x = this.boxes[i - 1].lastX;
          this.boxes[i].y = this.boxes[i - 1].lastY;
        }
      }
    }

  },
  moveApplesDeeper: function () {
    for (let i = 0; i < eatingOrder.length; i++) {
      eatingOrder[i]++;
      if (eatingOrder[i] > this.boxes.length - 1) {
        eatingOrder.splice(i, 1);
        i--;
      }
    }
    eatingTime = Date.now();
  },
  yummy: function () {
    if (getRandomInt(1, 100) <= CONSTANTS.yummyChance) {
      if (getRandomInt(0, 1) == 0) {
        yummyImg = delicious;
      } else {
        yummyImg = yummy;
      }
      showYummy = true;
      yummyTime = Date.now();
    }
  }
}
