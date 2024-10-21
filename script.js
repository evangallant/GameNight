
const acronym = 'BYOPVCAAFSIABYD';
const answers = [
    'Bring', 'Your', 'Own', 'Personal', 'Vacuum', 'Cleaner', 'And', 'Air', 'Filtration', 'System', 'If', 'Advised', 'By', 'Your', 'Doctor'
];
const clues = [
    'Something you might need to clean up',
    'Possessive, belonging to you',
    'Something that is yours',
    'Related to an individual',
    'Cleaning tool for lint',
    'Helps to tidy things',
    'Connects two items',
    'Related to cleanliness in the atmosphere',
    'The process of removing impurities',
    'An organized way to perform a task',
    'Conditional word',
    'Suggested by someone',
    'Used to indicate the agent performing the action',
    'Indicates possession',
    'A professional giving advice'
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
clueDiv.textContent = `Current letter: ${acronym[currentIndex]} - ${clues[currentIndex]}`;

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
                    clueDiv.textContent = `Current letter: ${acronym[currentIndex]} - ${clues[currentIndex]}`;
                    wordInput.value = '';
                    wordInput.focus();
                }, 1000);
            } else {
                setTimeout(() => {
                    clueDiv.textContent = 'Great job! You solved the riddle!';
                    wordInput.disabled = true;
                    submitButton.disabled = true;
                }, 1000);
            }
        } else {
            clueDiv.textContent = 'Incorrect. Try again!';
            wordInput.value = '';
            wordInput.focus();
        }
    }
});