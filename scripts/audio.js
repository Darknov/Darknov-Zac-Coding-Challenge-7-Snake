const PATH_TO_SOUNDS = '../sounds/';

function createAudio(src, volume = 0.1, loop = false) {
  var audio = document.createElement('audio');
  audio.volume = volume;
  audio.loop = loop;
  audio.src    = src;
  return audio;
}

export const eat = createAudio(PATH_TO_SOUNDS + 'eat_02.ogg');
export const music = createAudio(PATH_TO_SOUNDS + 'happy.mp3', 0.1, true);