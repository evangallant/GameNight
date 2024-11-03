const acronym = 'BYO';
const answers = [
    'Bring', 'Your', 'Own'
];
const clues = [
    'I think you know',
    'Yeah you got it',
    'I mean, of course, right?'
];

const acronymContainer = document.querySelector('.acronym-container');
const clueDiv = document.getElementById('clue');
const wordInput = document.getElementById('word-input');
const submitButton = document.getElementById('submit-button');

// Create acronym letters with guess slots
answers.forEach((answer, index) => {
    const letterDiv = document.createElement('div');
    letterDiv.classList.add('acronym-letter');
    letterDiv.dataset.index = index;
    letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot">${'_'.repeat(answer.length)}</span>`;
    acronymContainer.appendChild(letterDiv);
});

// Mark the first three words as correctly guessed
for (let i = 0; i < 0; i++) {
    const letterDiv = document.querySelector(`.acronym-letter[data-index='${i}'] .guess-slot`);
    letterDiv.textContent = answers[i];
}

let currentIndex = 0;
clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;

// Handle word submission
submitButton.addEventListener('click', () => {
    const input = wordInput.value.trim();
    if (input) {
        const currentWord = answers[currentIndex];
        const currentSlot = document.querySelector(`.acronym-letter[data-index='${currentIndex}'] .guess-slot`);

        if (input.toLowerCase() === currentWord.toLowerCase()) {
            currentSlot.textContent = currentWord;
            clueDiv.textContent = 'Noice!';
            if (currentIndex < answers.length - 1) {
                currentIndex++;
                setTimeout(() => {
                    clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;
                    wordInput.value = '';
                    wordInput.focus();
                }, 1000);
            } else {
                setTimeout(() => {
                    clueDiv.textContent = 'You got it :)';
                    wordInput.disabled = true;
                    submitButton.disabled = true;
                }, 1000);
            }
        } else {
            clueDiv.textContent = 'Incorrect. Try again!';
            setTimeout(() => {
                clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;
            }, 3000);
            wordInput.value = '';
            wordInput.focus();
        }
    }
});