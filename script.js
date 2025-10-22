const hackInput = document.getElementById('hackInput');
const addHackBtn = document.getElementById('addHackBtn');
const hackList = document.getElementById('hackList');

// Load saved hacks when the page loads
window.addEventListener('DOMContentLoaded', loadHacks);

function loadHacks() {
  const savedHacks = JSON.parse(localStorage.getItem('hacks')) || [];
  hackList.innerHTML = '';
  savedHacks.forEach(hack => addHackToList(hack));
}

// Add a new hack
addHackBtn.addEventListener('click', () => {
  const text = hackInput.value.trim();
  if (text) {
    addHackToList(text);
    saveHack(text);
    hackInput.value = '';
  }
});

// Add a hack visually to the list
function addHackToList(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.addEventListener('click', () => removeHack(text, li));

  li.appendChild(deleteBtn);
  hackList.prepend(li);
}

// Save hack to localStorage
function saveHack(text) {
  const hacks = JSON.parse(localStorage.getItem('hacks')) || [];
  hacks.push(text);
  localStorage.setItem('hacks', JSON.stringify(hacks));
}

// Delete hack from storage and list
function removeHack(text, element) {
  element.remove();
  const hacks = JSON.parse(localStorage.getItem('hacks')) || [];
  const updated = hacks.filter(hack => hack !== text);
  localStorage.setItem('hacks', JSON.stringify(updated));
}
// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !expanded);
});
// ---------------------------
// Load Local Resources (async/await)
// ---------------------------
async function loadResources() {
  const list = document.getElementById('resourcesList');
  list.innerHTML = '<p>Loading resources...</p>';

  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error('Failed to fetch JSON');
    const data = await res.json();

    list.innerHTML = ''; // Clear loading text

    data.forEach(item => {
      const card = document.createElement('div');
      card.className = 'resource-card';
      card.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link}" target="_blank" rel="noopener">Visit</a>
      `;
      list.appendChild(card);
    });
  } catch (err) {
    list.innerHTML = `<p style="color:red;">Error loading resources: ${err.message}</p>`;
  }
}

document.addEventListener('DOMContentLoaded', loadResources);
