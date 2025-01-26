// Add functions to track time and submit name
let startTime;
let timerInterval;
let timeTaken;
const notePlayer = new NotePlayer();

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    const playNotesButton = document.getElementById('play-notes-button');
    const submitButton = document.getElementById('submit-button');
    
    if (startButton) {
        // Listen for click events (desktop and some mobile devices)
        startButton.addEventListener('click', startGame);
        // Listen for touch events (mobile devices)
        startButton.addEventListener('touchstart', startGame);
    }
});

const acronym = 'BYOFBOBB';
const answers = [
    'Bring', 'Your', 'Own', 'Faded', 'Bag', 'Of', 'Bad', 'Bread'
];

// Special musical note mappings for each word
const wordNoteMappings = {
    'Bring': [],
    'Your': [],
    'Own': [],
    'Faded': ['F', 'A', 'D', 'E', 'D'],
    'Bag': ['B', 'A', 'G'],
    'Of': [],
    'Bad': ['B', 'A', 'D'],
    'Bread': ['B', 'E', 'A', 'D']
};

const acronymContainer = document.querySelector('.acronym-container');

// Create acronym letters with guess slots
function initializeAcronymDisplay() {
    acronymContainer.innerHTML = ''; // Clear existing content
    answers.forEach((answer, index) => {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('acronym-letter');
        letterDiv.dataset.index = index;
        
        // Pre-fill first three words, use underscores for others
        if (index < 3 || index == 5) {
            letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot">${answer}</span>`;
        } else if (index == 3) {
            letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot" style="background-color: #4a7b8c;">${'_'.repeat(answer.length)}</span>`;
        } else if (index == 7) {
            letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot">r___</span>`;
        } else {
            letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot">${'_'.repeat(answer.length)}</span>`;
        }
        
        acronymContainer.appendChild(letterDiv);
    });
}

// Update specific word in acronym display
function updateAcronymDisplay(index, word) {
    console.log(`${index}`)
    const letterDiv = document.querySelector(`.acronym-letter[data-index='${index}'] .guess-slot`);
    if (letterDiv) {
        letterDiv.textContent = word;
        letterDiv.style.backgroundColor = "transparent";
    }

    // Determine next index to highlight
    let nextIndex = index === 4 ? 6 : index + 1;

    const nextLetterDiv = document.querySelector(`.acronym-letter[data-index='${nextIndex}'] .guess-slot`);
    if (nextLetterDiv) {
        nextLetterDiv.style.backgroundColor = "#4a7b8c";
    }
}

// Game state variables
let currentIndex = 3;
let currentWord = '';
let currentNotes = [];

// Start button to initiate the game
function startGame() {
    startTime = Date.now();
    initializeAcronymDisplay(); // Initialize the acronym display
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('musical-game').style.display = 'block';
    document.getElementById('time-container').style.display = 'block';
    document.getElementById('instructions').innerHTML = ``;
    
    // Setup first word
    setupNextWord();
    startTimer();
}

// Setup next word to guess
function setupNextWord() {
    if (currentIndex == 5) {
        currentIndex += 1;
    }
    if (currentIndex < answers.length) {
        currentWord = answers[currentIndex];
        currentNotes = wordNoteMappings[currentWord];
        
        // Update letter display
        document.getElementById('letter-display').textContent = acronym[currentIndex];
        
        // Reset input
        const wordInput = document.getElementById('word-input');
        wordInput.value = '';
        wordInput.disabled = false;
        
        // Reset play notes button
        const playNotesButton = document.getElementById('play-notes-button');
        playNotesButton.disabled = false;

        if (currentIndex == 7) {
            const hintDiv = document.getElementById('hint');
            hintDiv.innerHTML = `<span>Sorry about this one. There's no 'R', so the notes played are the 1st, 3rd, 4th, and 5th letters of the word.<br><br>You still have to submit the full word when you guess.</span>`
        }
    } else {
        // Game completed
        completeGame();
    }
}

// Play musical notes for current word
document.getElementById('play-notes-button').addEventListener('click', function() {
    notePlayer.playSequence(currentNotes);
    this.disabled = true; // Prevent multiple plays
    setTimeout(function(){document.getElementById('play-notes-button').disabled = false;},4000);
});

// Handle word submission
document.getElementById('submit-button').addEventListener('click', () => {
    const wordInput = document.getElementById('word-input');
    const input = wordInput.value.trim();
    
    if (input) {
        if (input.toLowerCase() === currentWord.toLowerCase()) {
            // Correct word
            updateAcronymDisplay(currentIndex, currentWord);
            currentIndex++;
            setupNextWord();
        } else {
            // Incorrect word
            alert('Incorrect! Try again.');
            wordInput.value = '';
        }
    }
});

// Existing timer functions remain the same
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
    document.getElementById('time-container').style.color = "#649c40";
    document.getElementById('hint').innerHTML = '';
    document.getElementById('acronym-subheading2').innerHTML = 'Bring Your Own Faded Bag of Bad Bread';
    document.getElementById('acronym-subheading1').innerHTML = '';
    document.getElementById('musical-game').innerHTML = `<br><span><b>Good job fren</b></span>`;
}