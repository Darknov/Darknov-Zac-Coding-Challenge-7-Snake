import { canvas } from './canvas.js';

export const CONSTANTS = {
  startingPoint: {x: canvas.width/2, y: canvas.height/2},
	maxVelocity: 5,
  appleGenerationInterval: 1000,
  eatingTime: 70,
  yummyTime: 2000,
  yummyChance: 10, // max 100
  eatingSizeX: 1.2,
  eatingSizeY: 1.2,
  headToMouseMinDistance: 40,
  maxApples: 30,
  brutality: 40 // how many particles in particleEffects
}

export const PLAYER = {
  score: 0,
  highscore: 0
}

export const changeScore = (score) => {
  PLAYER.score = score;
  if(PLAYER.score > PLAYER.highscore) {
    PLAYER.highscore = PLAYER.score;
  }
  document.getElementById("score").textContent = PLAYER.score;
  document.getElementById("highscore").textContent = PLAYER.highscore;
}

export const addPoint = () => {
  changeScore(++PLAYER.score);
}