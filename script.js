const acronym = 'BYOMWWTDSTP';
const answers = [
    'Bring', 'Your', 'Own', 'Mouth', 'With', 'Which', 'To', 'Drink', 'Said', 'Tap', 'Water'
];
const clues = [
    'image_clues/bring.png',
    'image_clues/your.png',
    'image_clues/own.png',
    'image_clues/mouth.jpg',
    'image_clues/with.png',
    'image_clues/which.png',
    'image_clues/to.png',
    'image_clues/drink.png',
    'image_clues/said.png',
    'image_clues/tap.png',
    'image_clues/water.png'
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
clueDiv.innerHTML = `${acronym[currentIndex]}:<br><img src="${clues[currentIndex]}" alt="Clue Image" class="img-fluid">`;

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
            clueDiv.textContent = 'Good job, nerd';
            if (currentIndex < answers.length - 1) {
                currentIndex++;
                setTimeout(() => {
                    clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;
                    wordInput.value = '';
                    wordInput.focus();
                }, 1000);
            } else {
                setTimeout(() => {
                    clueDiv.textContent = 'Chugalug, baby';
                    wordInput.disabled = true;
                    submitButton.disabled = true;
                }, 1000);
            }
        } else {
            clueDiv.textContent = 'Nope, NERD';
            setTimeout(() => {
                clueDiv.innerHTML = `<strong>${acronym[currentIndex]}:</strong>\u00A0\u00A0${clues[currentIndex]}`;
            }, 3000);
            wordInput.value = '';
            wordInput.focus();
        }
    }
});