// images for game
export const box = document.getElementById("box");
export const apple = document.getElementById("apple");
export const trap = document.getElementById("trap");
export const head = document.getElementById("head");
export const tail = document.getElementById("tail");
export const yummy = document.getElementById("yummy");
export const particle1 = document.getElementById("particle1");
export const particle2 = document.getElementById("particle2");
export const particle3 = document.getElementById("particle3");
export const fruits = [apple];

for(let i = 1; i <= 16; i++) {
  const img = document.getElementById("fruit" + i);
  fruits.push(img);
}