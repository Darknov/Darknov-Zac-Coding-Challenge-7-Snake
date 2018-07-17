export function abs(number) {
	return number > 0 ? number : -number;
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function isCollision(obj1, obj2) {
  return !(
      ((obj1.y + obj1.img.height) < (obj2.y)) ||
      (obj1.y > (obj2.y + obj2.img.height)) ||
      ((obj1.x + obj1.img.width) < obj2.x) ||
      (obj1.x > (obj2.x + obj2.img.width))
  );
}