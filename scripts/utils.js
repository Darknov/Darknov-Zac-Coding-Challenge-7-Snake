export function abs(number) {
	return number > 0 ? number : -number;
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}