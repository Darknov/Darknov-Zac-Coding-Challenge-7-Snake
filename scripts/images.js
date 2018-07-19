// images for game
export const box = document.getElementById("box");
export const apple = document.getElementById("apple");
export const trap = document.getElementById("trap");
export const head = document.getElementById("head");
export const tail = document.getElementById("tail");
export const yummy = document.getElementById("yummy");
export const delicious = document.getElementById("delicious");
export const particle1 = document.getElementById("particle1");
export const particle2 = document.getElementById("particle2");
export const particle3 = document.getElementById("particle3");
export const fruits = [apple];

export function checkIfImagesAreLoaded() {
  let imgs = document.images;
  let isLoaded = true;
  for (const img of imgs) {
    if(!img.complete) {
      isLoaded = false;
      break;
    }
  }
  return isLoaded;
}

export function checkHowManyImagesAreLoaded() {
  let imgs = document.images;
  let howMany = 0;
  for (const img of imgs) {
    if(img.complete) {
      howMany++;
    }
  }
  return { x: imgs.length, y: howMany };
}



for(let i = 1; i <= 16; i++) {
  const img = document.getElementById("fruit" + i);
  fruits.push(img);
}