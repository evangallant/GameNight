// Initialism constants
const acronym = 'BYODTCTTGNGR';
const answers = [
    'Bring', 'Your', 'Own', 'Desire', 'To', 'Contribute', 'To', 'The', 'Game', 'Night', 'Github', 'Repo'
];

// Game state variables
let startTime;
let timerInterval;
let timeTaken;
let currentIndex = 3;
let currentWord = '';


// ON PAGE LOAD:
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    const submitButton = document.getElementById('submit-button');
    
    if (startButton) {
        // Listen for click events (desktop and some mobile devices)
        startButton.addEventListener('click', startGame);
        // Listen for touch events (mobile devices)
        startButton.addEventListener('touchstart', startGame);
    }
});


// ACRONYM DISPLAY MANAGEMENT:
const acronymContainer = document.querySelector('.acronym-container');

// Create acronym letters with guess slots
function initializeAcronymDisplay() {
    acronymContainer.innerHTML = ''; // Clear existing content
    answers.forEach((answer, index) => {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('acronym-letter');
        letterDiv.dataset.index = index;
        
        // Pre-fill first three words, use underscores for others
        if (index < 3) {
            letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot">${answer}</span>`;
        } else {
            letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot">${'_'.repeat(answer.length)}</span>`;
        }
        
        acronymContainer.appendChild(letterDiv);
    });
}


// ON PRESS OF START BUTTON:
function startGame() {
    startTime = Date.now();
    initializeAcronymDisplay(); // Initialize the acronym display
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('time-container').style.display = 'block';
    document.getElementById('game-mode').style.display = 'block';
    document.getElementById('instructions').innerHTML = ``;
    
    // Event listener for cruelty game mode
    wordInput.addEventListener('keydown', handleKeyPress);

    // Setup first word
    setupNextWord();
    startTimer();
}


// CHANGE TO NEXT WORD:
function setupNextWord() {
    if (currentIndex < answers.length) {
        currentWord = answers[currentIndex];
        
        // Update letter display
        document.getElementById('letter-display').textContent = acronym[currentIndex];
        
        // Reset input
        const wordInput = document.getElementById('word-input');
        wordInput.value = '';
        wordInput.disabled = false;
        
        // GAME UPDATES HERE     TO DO

    } else {
        // Game completed
        completeGame();
    }
}


// MAIN GAME LOOP
const wordInput = document.getElementById('word-input');

function handleKeyPress(event) {
    event.preventDefault();

    // wordInput.value contains the exact string at the moment of the keypress
    // So, we need to compare the last letter of their input with the corresponding index of the correct word
    const inputValue = wordInput.value;
    const currentWord = answers[currentIndex];

    // If the letter is correct, add it to the input value
    if (event.key == currentWord(len(inputValue))) {
        wordInput.value = inputValue + event.key;
    } else {
        // Otherwise, take a letter back from them
        wordInput.value = currentValue.slice(0, -1);
    }
}


// ON PRESS OF SUBMIT BUTTON
document.getElementById('submit-button').addEventListener('click', () => {
    const input = wordInput.value.trim();
    
    if (input) {
        if (input.toLowerCase() === currentWord.toLowerCase()) {
            // Correct word
            updateAcronymDisplay(currentIndex, currentWord);
            currentIndex++;
            setupNextWord();
        } else {
            // Incorrect word
            alert('NOOOOOOPE');
            wordInput.value = '';
        }
    }
});

// STATIC HELPER FUNCTIONS VVVVVVVVVVVVV
function updateAcronymDisplay(index, word) {
    const letterDiv = document.querySelector(`.acronym-letter[data-index='${index}'] .guess-slot`);
    if (letterDiv) {
        letterDiv.textContent = word;
    }
}

function startTimer() {
    timerInterval = setInterval(updateTimeDisplay, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimeDisplay() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    document.getElementById('time-taken').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function completeGame() {
    stopTimer();
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeTaken = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Display completion message 
    
    // TODO
    document.getElementById('time-container').style.color = "#649c40";
    document.getElementById('hint').innerHTML = '';
    document.getElementById('acronym-subheading2').innerHTML = 'Bring Your Own Dad Baggage'; // TO DO
    document.getElementById('acronym-subheading1').innerHTML = '';
    document.getElementById('musical-game').innerHTML = `<br><span><b>Mentally ill goth girls also accepted, if you have one</b></span>`; // TO DO
}