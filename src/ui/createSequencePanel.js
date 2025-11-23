import { playSoundByKey, disableInteractions } from './sequenceUtils.js';
import { keys as allowedKeys } from '../constants/sounds.js';

export function createSequencePanel() {
  const panel = document.createElement('div');
  panel.className = 'sequence-panel';

  const label = document.createElement('label');
  label.textContent = 'Enter sequence:';
  label.setAttribute('for', 'sequenceInput');

  const input = document.createElement('input');
  input.id = 'sequenceInput';
  input.type = 'text';
  input.placeholder = 'Type keys like ASDFG';
  input.maxLength = allowedKeys.length * 2;

  input.addEventListener('input', (e) => {
    const value = e.target.value.toUpperCase();
    const filtered = [...value].filter((char) => allowedKeys.includes(char));
    const trimmed = filtered.join('').slice(0, allowedKeys.length * 2);
    e.target.value = trimmed;
  });

  const playButton = document.createElement('button');
  playButton.textContent = 'Play sequence ▶';

  const exampleButton = document.createElement('button');
  exampleButton.textContent = 'Load example (Twinkle Star 🌟)';

  const twinkleExample = 'DDGGHHGFFEEDD'; 

  exampleButton.addEventListener('click', () => {
    input.value = twinkleExample;
  });

  playButton.addEventListener('click', async () => {
    const sequence = input.value.toUpperCase().split('');
    if (sequence.length === 0) return;

    input.disabled = true;
    playButton.disabled = true;
    exampleButton.disabled = true;
    playButton.textContent = 'Playing...';
    disableInteractions(true);

    for (let i = 0; i < sequence.length; i++) {
      const key = sequence[i];
      await playSoundByKey(key);
      await delay(500);
    }

    input.disabled = false;
    playButton.disabled = false;
    exampleButton.disabled = false;
    playButton.textContent = 'Play sequence ▶';
    disableInteractions(false);
  });

  panel.append(label, input, playButton, exampleButton);
  return panel;
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
