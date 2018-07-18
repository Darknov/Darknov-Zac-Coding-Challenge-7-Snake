// images for game
export const box = document.getElementById("box");
export const apple = document.getElementById("apple");
export const trap = document.getElementById("trap");
export const head = document.getElementById("head");
export const tail = document.getElementById("tail");
export const yummy = document.getElementById("yummy");
export const fruits = [apple];

for(let i = 1; i <= 16; i++) {
  const img = new Image();
  img.src = "./../assets/fruit" + i + ".png";
  fruits.push(img);
}