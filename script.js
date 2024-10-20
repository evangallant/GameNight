const acronym = 'BYOGAD';
const clues = [
    'Bring Your Own... (B stands for something often associated with friends)',
    'Y is the next letter... (Y stands for something necessary for any gathering)',
    'O is quite obvious... (O stands for something all guests bring)',
    'G is a classic one... (G stands for something you play)',
    'A could be tricky... (A stands for something to lighten the mood)',
    'D is delicious... (D stands for something to drink)'
];

const lettersContainer = document.getElementById('letters');
const clueDiv = document.getElementById('clue');
const letterInput = document.getElementById('letter-input');
const submitButton = document.getElementById('submit-button');

// Create letter slots based on the acronym
acronym.split('').forEach((_, index) => {
    const letterSlot = document.createElement('div');
    letterSlot.classList.add('letter-slot');
    letterSlot.dataset.index = index;
    lettersContainer.appendChild(letterSlot);
});

let currentIndex = 0;
clueDiv.textContent = clues[currentIndex];

// Handle letter submission
submitButton.addEventListener('click', () => {
    const input = letterInput.value.toUpperCase();
    if (input && input.length === 1) {
        const currentSlot = document.querySelector(`.letter-slot[data-index='${currentIndex}']`);
        currentSlot.textContent = input;

        if (input === acronym[currentIndex]) {
            if (currentIndex < acronym.length - 1) {
                currentIndex++;
                clueDiv.textContent = clues[currentIndex];
                letterInput.value = '';
                letterInput.focus();
            } else {
                const userGuess = Array.from(document.querySelectorAll('.letter-slot')).map(slot => slot.textContent).join('');
                if (userGuess === acronym) {
                    clueDiv.textContent = 'Great job! You solved the riddle!';
                } else {
                    clueDiv.textContent = 'Oops! That was not correct. Try again!';
                }
                letterInput.disabled = true;
                submitButton.disabled = true;
            }
        } else {
            clueDiv.textContent = 'Incorrect letter. Try again!';
            letterInput.value = '';
            letterInput.focus();
        }
    }
});