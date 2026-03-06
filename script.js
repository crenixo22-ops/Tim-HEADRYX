/*
  Star Trek Character Showcase
  Click-based animation replacing scroll-driven animation.
  Click any character to focus them; click again or press Escape to close.
*/

const wrapper = document.querySelector('.wrapper');
const characters = document.querySelectorAll('.character');
const nameHeadings = document.querySelectorAll('.names h2');
const closeBtn = document.getElementById('closeBtn');

let focusedIndex = null;

function focusCharacter(index) {
  // If clicking the already-focused character, unfocus
  if (focusedIndex === index) {
    clearFocus();
    return;
  }

  focusedIndex = index;

  // Add wrapper state
  wrapper.classList.add('has-focus');

  // Update characters
  characters.forEach((char, i) => {
    if (i === index) {
      char.classList.add('focused');
    } else {
      char.classList.remove('focused');
    }
  });

  // Update name headings — show only the matching one
  nameHeadings.forEach((h, i) => {
    h.classList.remove('active');
    if (i === index) {
      // Small delay so name appears after character starts centering
      setTimeout(() => h.classList.add('active'), 150);
    }
  });

  // Show close button
  closeBtn.classList.add('visible');
}

function clearFocus() {
  focusedIndex = null;

  wrapper.classList.remove('has-focus');

  characters.forEach(char => char.classList.remove('focused'));
  nameHeadings.forEach(h => h.classList.remove('active'));
  closeBtn.classList.remove('visible');
}

// Click handlers on each character
characters.forEach((char, i) => {
  char.addEventListener('click', () => focusCharacter(i));
});

// Close button
closeBtn.addEventListener('click', clearFocus);

// Escape key to close
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') clearFocus();
});

// Click outside characters closes focus
document.addEventListener('click', (e) => {
  if (
    focusedIndex !== null &&
    !e.target.closest('.character') &&
    !e.target.closest('#closeBtn')
  ) {
    clearFocus();
  }
});
