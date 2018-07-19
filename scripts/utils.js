export function abs(number) {
	return number > 0 ? number : -number;
}

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom(min, max) {
  return (Math.random() * (max - min) + min);
}

export function isCollision(obj1, obj2, lessWidth = 0, lessHeight = 0) {
  return !(
      ((obj1.y + obj1.img.height - lessHeight) < (obj2.y)) ||
      (obj1.y > (obj2.y + obj2.img.height - lessHeight)) ||
      ((obj1.x + obj1.img.width - lessWidth) < obj2.x) ||
      (obj1.x > (obj2.x + obj2.img.width - lessWidth))
  );
}