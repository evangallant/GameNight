const acronym = 'BYOPVCAAFSIABYD';
const answers = [
    'Bring', 'Your', 'Own', 'Personal', 'Vacuum', 'Cleaner', 'And', 'Air', 'Filtration', 'System', 'If', 'Advised', 'By', 'Your', 'Doctor'
];
const clues = [
    'Bring - Something you might need to clean up',
    'Your - Possessive, belonging to you',
    'Own - Something that is yours',
    'Personal - Related to an individual',
    'Vacuum - Cleaning tool for lint',
    'Cleaner - Helps to tidy things',
    'And - Connects two items',
    'Air - Related to cleanliness in the atmosphere',
    'Filtration - The process of removing impurities',
    'System - An organized way to perform a task',
    'If - Conditional word',
    'Advised - Suggested by someone',
    'By - Used to indicate the agent performing the action',
    'Your - Indicates possession',
    'Doctor - A professional giving advice'
];

const wordsContainer = document.getElementById('words');
const clueDiv = document.getElementById('clue');
const letterInput = document.getElementById('letter-input');
const submitButton = document.getElementById('submit-button');

// Create word slots based on the answers
answers.forEach((answer, index) => {
    const wordSlot = document.createElement('div');
    wordSlot.classList.add('word-slot');
    wordSlot.dataset.index = index;
    wordSlot.textContent = '_'.repeat(answer.length);
    wordsContainer.appendChild(wordSlot);
});

let currentIndex = 0;
clueDiv.textContent = clues[currentIndex];

// Handle letter submission
submitButton.addEventListener('click', () => {
    const input = letterInput.value.toUpperCase();
    if (input && input.length === 1) {
        const currentWord = answers[currentIndex].toUpperCase();
        const currentSlot = document.querySelector(`.word-slot[data-index='${currentIndex}']`);
        let updatedWord = '';
        let found = false;

        // Fill in the letter in the correct positions
        for (let i = 0; i < currentWord.length; i++) {
            if (currentWord[i] === input) {
                updatedWord += input;
                found = true;
            } else {
                updatedWord += currentSlot.textContent[i] === '_' ? '_' : currentSlot.textContent[i];
            }
        }

        currentSlot.textContent = updatedWord;

        if (updatedWord === currentWord) {
            if (currentIndex < answers.length - 1) {
                currentIndex++;
                clueDiv.textContent = clues[currentIndex];
                letterInput.value = '';
                letterInput.focus();
            } else {
                clueDiv.textContent = 'Great job! You solved the riddle!';
                letterInput.disabled = true;
                submitButton.disabled = true;
            }
        } else if (!found) {
            clueDiv.textContent = 'Incorrect letter. Try again!';
            letterInput.value = '';
            letterInput.focus();
        }
    }
});