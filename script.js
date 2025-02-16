// Initialism constants
const acronym = 'BYOPOA';
const answers = [
    'Bring', 'Your', 'Own', 'Parasitic', 'Orange-crowned', 'American'
];

const parasitic_options = [
    'Purple', 'Parasitic', 'Piping', 'Pectoral', 'Pacific'
];
const orange_crowned_options = [
    'Osprey', 'Owl', 'Olive-sided', 'Orange-crowned', 'Orchard'
];
const american_options = [
    'American', 'Acorn', 'Arctic', 'Ash-throated', 'Alder'
];

const buttonOptions = [
    parasitic_options, orange_crowned_options, american_options
];

// Game state variables
let startTime;
let timerInterval;
let timeTaken;
let currentIndex = 3; // Start at index 3 since first 3 words are given
let currentWord = '';
let numGuesses = 0;

// Bird images
const img1 = new Image();
const img2 = new Image();
const img3 = new Image();
img1.src = 'imageClues/Parasitic_Jaeger.jpg';
img2.src = 'imageClues/Orange_Crowned_Warbler.jpg';
img3.src = 'imageClues/American_Barn_Owl.jpg';

const images = [img1, img2, img3];

// ON PAGE LOAD
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    
    if (startButton) {
        startButton.addEventListener('click', startGame);
        startButton.addEventListener('touchstart', startGame);
    }
});

// ACRONYM DISPLAY MANAGEMENT
function initializeAcronymDisplay() {
    const acronymContainer = document.querySelector('.acronym-container');
    acronymContainer.innerHTML = '';
    
    answers.forEach((answer, index) => {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('acronym-letter');
        letterDiv.dataset.index = index;
        
        letterDiv.innerHTML = `${acronym[index]} <span class="guess-slot">${index < 3 ? answer : '_'.repeat(answer.length)}</span>`;
        acronymContainer.appendChild(letterDiv);
    });
}

function startGame() {
    startTime = Date.now();
    initializeAcronymDisplay();
    
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('time-container').style.display = 'block';
    document.getElementById('birbs').style.display = 'block';
    document.getElementById('instructions').innerHTML = '';
    
    setupNextWord();
    startTimer();
}

function setupNextWord() {
    if (currentIndex < answers.length) {
        currentWord = answers[currentIndex];
        
        // Update letter display
        document.getElementById('letter-display').textContent = acronym[currentIndex];
        
        // Clear previous image and add new one
        const currentImageContainer = document.getElementById('current-image');
        currentImageContainer.innerHTML = '';
        const currentImage = images[currentIndex - 3];
        currentImage.style.maxHeight = '400px'; // Adjust this value as needed
        currentImageContainer.appendChild(currentImage);
        
        // Set up the buttons
        const guessButtons = document.getElementById('guess-buttons');
        guessButtons.innerHTML = ''; // Clear previous buttons
        
        buttonOptions[currentIndex - 3].forEach((buttonText) => {
            const guessButton = document.createElement('button');
            guessButton.classList.add('guess-button', 'btn', 'btn-primary', 'm-2');
            guessButton.textContent = buttonText;
            
            guessButton.addEventListener('click', function() {
                const guess = this.textContent;
                if (guess.toLowerCase() === currentWord.toLowerCase()) {
                    numGuesses++;
                    const guessCounter = document.getElementById('num-guesses');
                    guessCounter.textContent = `Total guesses: ${numGuesses}`;
                    updateAcronymDisplay(currentIndex, currentWord);
                    currentIndex++;
                    setupNextWord();
                } else {
                    numGuesses++;
                    const guessCounter = document.getElementById('num-guesses');
                    guessCounter.textContent = `Total guesses: ${numGuesses}`;
                    guessCounter.classList.remove('flash-red'); // Remove class to reset animation
                    void guessCounter.offsetWidth; // Trigger reflow to restart animation
                    guessCounter.classList.add('flash-red');
                }
            });
            
            guessButtons.appendChild(guessButton);
        });
    } else {
        completeGame();
    }
}

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
    document.getElementById('time-taken').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function completeGame() {
    stopTimer();
    const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timeTaken = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    document.getElementById('time-container').style.color = "#FF0000";
    document.getElementById('hint').innerHTML = '';
    document.getElementById('acronym-subheading2').innerHTML = 'Bring Your Own Parasitic Orange-Crowned American';
    document.getElementById('acronym-subheading1').innerHTML = '';
    document.getElementById('ending-note').innerHTML = `<br><span><b>Or actually, don't. Please.</b></span>`;
}