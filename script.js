const acronym = 'BYOMWWTDSTW';
const answers = [
    'Bring', 'Your', 'Own', 'Mouth', 'With', 'Which', 'To', 'Drink', 'Said', 'Tap', 'Water'
];
const clues = [
    'imageClues/bring.png',
    'imageClues/your.png',
    'imageClues/own.png',
    'imageClues/mouth.jpg',
    'imageClues/with.jpg',
    'imageClues/which.jpg',
    'imageClues/to.jpg',
    'imageClues/drink.jpg',
    'imageClues/said.jpg',
    'imageClues/tap.jpg',
    'imageClues/water.jpg'
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
for (let i = 0; i < 3; i++) {
    const letterDiv = document.querySelector(`.acronym-letter[data-index='${i}'] .guess-slot`);
    letterDiv.textContent = answers[i];
}

let currentIndex = 3;
// For image clues, use this line:
clueDiv.innerHTML = `<strong>${acronym[currentIndex]}</strong>:<br><img src="${clues[currentIndex]}" alt="Clue Image" class="img-fluid">`;

// For text clues, comment out the image clues line and use this one
// clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;

// Handle word submission
submitButton.addEventListener('click', () => {
    const input = wordInput.value.trim();
    if (input) {
        const currentWord = answers[currentIndex];
        const currentSlot = document.querySelector(`.acronym-letter[data-index='${currentIndex}'] .guess-slot`);

        if (input.toLowerCase() === currentWord.toLowerCase()) {
            currentSlot.textContent = currentWord;
            clueDiv.innerHTML = 'Good job, nerd';
            if (currentIndex < answers.length - 1) {
                currentIndex++;
                setTimeout(() => {
                    // For image clues, use the following line:
                    clueDiv.innerHTML = `<strong>${acronym[currentIndex]}</strong>:<br><img src="${clues[currentIndex]}" alt="Clue Image" class="img-fluid">`;

                    // For text clues, use the following line:
                    // clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;
                    wordInput.value = '';
                    wordInput.focus();
                }, 1000);
            } else {
                setTimeout(() => {
                    clueDiv.innerHTML = 'Chugalug, baby';
                    wordInput.disabled = true;
                    submitButton.disabled = true;
                }, 1000);
            }
        } else {
            clueDiv.innerHTML = 'Nope, NERD';
            setTimeout(() => {
                // For image clues, use this line:
                clueDiv.innerHTML = `<strong>${acronym[currentIndex]}</strong>:<br><img src="${clues[currentIndex]}" alt="Clue Image" class="img-fluid">`;

                // For text clues, use this line:
                // clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;
            }, 3000);
            wordInput.value = '';
            wordInput.focus();
        }
    }
});