export const canvas = document.getElementById("myCanvas");
export const context = canvas.getContext("2d");

export function clearCanvas() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}