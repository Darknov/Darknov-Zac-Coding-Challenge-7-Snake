const PATH_TO_SOUNDS = '../sounds/';

function createAudio(src, volume = 0.1, loop = false) {
  const audio = document.getElementById(src)
  audio.volume = volume;
  audio.setAttribute("preload", "auto");
  audio.setAttribute("controls", "none");
  audio.style.display = "none";
  audio.loop = loop;
  audio.muted = true;
  return audio;
}

export const eat = createAudio('eat');
export const music = createAudio('music', 0.1, true);