import { createKalimba } from './ui/createKalimba.js';
import { createSequencePanel } from './ui/createSequencePanel.js';
import './styles/main.scss';

function initApp() {
  const container = document.createElement('div');
  container.className = 'kalimba-app';

  const title = document.createElement('h1');
  title.textContent = 'Kalimba FM';

  const kalimba = createKalimba();
  const sequencePanel = createSequencePanel();

  container.append(title, kalimba, sequencePanel);
  document.body.append(container);
}

initApp();