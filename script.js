// Initialism constants
const acronym = 'BYOBCBB';
const answers = [
    'Bring', 'Your', 'Own', 'Boulder', 'Community', 'Big', 'Boy'
];
const trailNames = [
    'Bring', 'Your', 'Own', 'South _______ Creek Trail', '_________ Ditch Trail', '___ Bluestem Trail', '___ Scout Trail'
]

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
    document.getElementById('instructions').innerHTML = ``;
    document.getElementById('trails').style.display = 'block';
    
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
        
        // Update the image clue
        const currentImage = document.getElementById('current-image');
        const currentImageSrc = `imageClues/clue${currentIndex - 2}.png`;
        currentImage.innerHTML = `<img src="${currentImageSrc}">`;

        // Update the trail name
        const currentTrail = document.getElementById('trail-name');
        currentTrail.textContent = trailNames[currentIndex]

    } else {
        // Game completed
        completeGame();
    }
}


// ON PRESS OF SUBMIT BUTTON
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
    document.getElementById('trails').style.display = 'none';
    document.getElementById('acronym-subheading2').innerHTML = 'Bring Your Own Boulder Community, Big Boy'; // TO DO
    document.getElementById('acronym-subheading1').innerHTML = '';
    document.getElementById('ending-note').innerHTML = `<br><span><b>We all make game night happen together <3</b></span>`; // TO DO
}