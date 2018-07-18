export const CONSTANTS = {
	maxVelocity: 5,
  appleGenerationInterval: 1000,
  eatingTime: 70,
  eatingSizeX: 1.2,
  eatingSizeY: 1.2,
  headToMouseMinDistance: 40,
  maxApples: 30
}

export const PLAYER = {
  score: 0
}

export const changeScore = (score) => {
  PLAYER.score = score;
  console.log(score);
  document.getElementById("score").textContent = PLAYER.score;
}

export const addPoint = () => {
  changeScore(++PLAYER.score);
}