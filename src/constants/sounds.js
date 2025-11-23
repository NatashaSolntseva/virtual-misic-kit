import soundA1 from '../assets/sounds/kalimba_sample_note-a1.wav';
import soundB1 from '../assets/sounds/kalimba_sample_note-b1.wav';
import soundC2 from '../assets/sounds/kalimba_sample_note-c2.wav';
import soundD2 from '../assets/sounds/kalimba_sample_note-d2.wav';
import soundE2 from '../assets/sounds/kalimba_sample_note-e2.wav';
import soundF2 from '../assets/sounds/kalimba_sample_note-f2.wav';
import soundG2 from '../assets/sounds/kalimba_sample_note-g2.wav';
import soundA2 from '../assets/sounds/kalimba_sample_note-a2.wav';
import soundB2 from '../assets/sounds/kalimba_sample_note-b2.wav';
import soundC3 from '../assets/sounds/kalimba_sample_note-c3.wav';
import soundD3 from '../assets/sounds/kalimba_sample_note-d3.wav';
import soundE3 from '../assets/sounds/kalimba_sample_note-e3.wav';
import soundF1 from '../assets/sounds/kalimba_sample_note-f1.wav';
import soundG1 from '../assets/sounds/kalimba_sample_note-g1.wav';


export const keys = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'C', 'V', 'B', 'N', 'M'];

export const soundFiles = [
  soundA1, soundB1, soundC2, soundD2, soundE2,
  soundF2, soundG2, soundA2, soundB2, soundC3,
  soundD3, soundE3, soundF1, soundG1,
];

export const sounds = soundFiles.map((path) => new Audio(path));