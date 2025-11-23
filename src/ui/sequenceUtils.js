import { keys, sounds } from '../constants/sounds';

let isPlayingSequence = false;

export async function playSoundByKey(key) {
  const index = keys.indexOf(key);
  if (index === -1) return;

  const tine = document.querySelectorAll('.tine')[index];
  const audio = sounds[index];

  tine.classList.add('active');
  audio.currentTime = 0;
  audio.play();

  await new Promise((r) => setTimeout(r, 250));
  tine.classList.remove('active');
}

export function disableInteractions(state) {
  isPlayingSequence = state;
  if (state) {
    document.body.classList.add('disabled');
  } else {
    document.body.classList.remove('disabled');
  }
}

document.addEventListener('keydown', (e) => {
  if (isPlayingSequence) e.preventDefault();
});
