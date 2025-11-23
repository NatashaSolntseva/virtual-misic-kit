import { keys, sounds } from '../constants/sounds';

let activeKey = null;
let editInput = null; 

export function createKalimba() {
  const kalimbaContainer = document.createElement('div');
  kalimbaContainer.className = 'kalimba';

  const kalimbaBody = document.createElement('div');
  kalimbaBody.className = 'kalimba-body';


  editInput = document.createElement('input');
  editInput.className = 'edit-input';
  editInput.type = 'text';
  editInput.maxLength = 1;
  editInput.placeholder = 'New key...';
  editInput.style.display = 'none';
  kalimbaContainer.append(editInput);


  keys.forEach((key, index) => {
    const tine = document.createElement('div');
    tine.className = 'tine';

    const label = document.createElement('span');
    label.className = 'tine-label';
    label.textContent = key;

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = '✎';

    tine.append(label, editButton);
    kalimbaBody.append(tine);

    tine.addEventListener('mousedown', () => handleInteraction(index, tine));
    tine.addEventListener('mouseup', () => stopInteraction(tine));


    editButton.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditInput(index, label, editButton);
    });
  });


  const hole = document.createElement('div');
  hole.className = 'sound-hole';
  kalimbaBody.append(hole);

  kalimbaContainer.append(kalimbaBody);


  document.addEventListener('keydown', (e) => {
    if (document.activeElement.tagName === 'INPUT') return;

    const pressedKey = normalizeKey(e.key);
    if (activeKey) return;

    const keyIndex = keys.indexOf(pressedKey);
    if (keyIndex !== -1) {
      const tines = kalimbaBody.querySelectorAll('.tine');
      activeKey = pressedKey;
      handleInteraction(keyIndex, tines[keyIndex]);
    }
  });

  document.addEventListener('keyup', (e) => {
    const releasedKey = normalizeKey(e.key);
    if (releasedKey === activeKey) {
      const keyIndex = keys.indexOf(releasedKey);
      const tines = kalimbaBody.querySelectorAll('.tine');
      stopInteraction(tines[keyIndex]);
      activeKey = null;
    }
  });

  return kalimbaContainer;
}


function handleInteraction(index, tineEl) {
  const audio = sounds[index];
  audio.currentTime = 0;
  audio.play();
  tineEl.classList.add('active');
}

function stopInteraction(tineEl) {
  tineEl.classList.remove('active');
}


function openEditInput(index, label, button) {
  editInput.style.display = 'block';
  editInput.value = label.textContent;
  editInput.focus();

  const { top, left, width } = button.getBoundingClientRect();
  editInput.style.position = 'absolute';
  editInput.style.top = `${top + window.scrollY + 25}px`;
  editInput.style.left = `${left - width / 2}px`;

  const handleKey = (e) => {

    if (e.key === 'Enter') {
      const newKey = e.target.value.toUpperCase();

      if (!/^[A-Z]$/.test(newKey)) {
        alert('Please enter a valid English letter (A–Z).');
        closeEditInput();
        editInput.removeEventListener('keydown', handleKey);
        return;
      }

      if (keys.includes(newKey) && newKey !== keys[index]) {
        alert(`Key "${newKey}" is already assigned to another sound.`);
        closeEditInput();
        editInput.removeEventListener('keydown', handleKey);
        return;
      }

      keys[index] = newKey;
      label.textContent = newKey;
      closeEditInput();
      editInput.removeEventListener('keydown', handleKey);
    }


    if (e.key === 'Escape') {
      closeEditInput();
      editInput.removeEventListener('keydown', handleKey);
    }
  };

  editInput.addEventListener('keydown', handleKey);
}

function closeEditInput() {
  editInput.style.display = 'none';
  editInput.value = '';
}

function normalizeKey(key) {
  const layoutMap = {
  
    'ф': 'A', 'и': 'B', 'с': 'C', 'в': 'D', 'у': 'E',
    'а': 'F', 'п': 'G', 'р': 'H', 'ш': 'I', 'о': 'J',
    'л': 'K', 'д': 'L', 'ь': 'M', 'т': 'N', 'щ': 'O',
    'з': 'P', 'я': 'Q', 'к': 'R', 'ы': 'S', 'е': 'T',
    'г': 'U', 'м': 'V', 'ц': 'W', 'ч': 'X', 'н': 'Y', 'й': 'Z'
  };

  const lower = key.toLowerCase();
  const upper = key.toUpperCase();


  if (layoutMap[lower]) return layoutMap[lower];


  return upper;
}