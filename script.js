// Add functions to track time, update leaderboard, and submit name
let startTime;
let timerInterval;
let timeTaken;

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById('start-button');
    
    if (startButton) {
        // Listen for click events (desktop and some mobile devices)
        startButton.addEventListener('click', startGame);

        // Listen for touch events (mobile devices)
        startButton.addEventListener('touchstart', startGame);
    }
    updateLeaderboard();
});

// Start button to initiate the timer
function startGame() {
    startTime = Date.now();
    document.getElementById('clue-and-input').style.display = 'block';
    document.getElementById('time-container').style.display = 'block';
    document.getElementById('start-button').style.display = 'none';
    startTimer();
    console.log("start game button pressed, function called all the way through");
}

// Start the timer
function startTimer() {
    timerInterval = setInterval(updateTimeDisplay, 1000);
}

// Stop the timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Update the displayed time
function updateTimeDisplay() {
    const currentTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    document.getElementById('time-taken').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Fetch and update the leaderboard dynamically
function updateLeaderboard() {
    fetch('https://gamenight-backend.onrender.com/leaderboard')
        .then(response => response.json())
        .then(data => {
            const leaderboardTable = document.getElementById('leaderboard-table').querySelector('tbody');
            leaderboardTable.innerHTML = '';
            data.forEach(user => {
                const row = `<tr><td>${user.name}</td><td>${user.time_taken}</td></tr>`;
                leaderboardTable.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
}

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
                    clueDiv.innerHTML = `<strong>${acronym[currentIndex]}</strong>:<br><img src="${clues[currentIndex]}" alt="Clue Image" class="img-fluid">`;
                    wordInput.value = '';
                    wordInput.focus();
                }, 1000);
            } else {
                setTimeout(() => {
                    clueDiv.innerHTML = 'Chugalug, baby';
                    wordInput.disabled = true;
                    submitButton.disabled = true;

                    // Timer stop logic here when puzzle is complete
                    stopTimer();
                    timeTaken = Math.floor((Date.now() - startTime) / 1000); // Calculate final time
                    document.getElementById('name-input-container').style.display = 'block';
                }, 1000);
            }
        } else {
            clueDiv.innerHTML = 'Nope, NERD';
            setTimeout(() => {
                clueDiv.innerHTML = `<strong>${acronym[currentIndex]}</strong>:<br><img src="${clues[currentIndex]}" alt="Clue Image" class="img-fluid">`;
                wordInput.value = '';
                wordInput.focus();
            }, 3000);
        }
    }
});

// Add event listener for submitting name to leaderboard
document.getElementById('submit-name-button').addEventListener('click', () => {
    const userName = document.getElementById('user-name').value;
    if (userName) {
        const data = {
            name: userName,
            timeTaken: timeTaken
        };

        // AJAX POST request to store the user's session data
        fetch('https://gamenight-backend.onrender.com/submit-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Reload the leaderboard to reflect the new score
                updateLeaderboard();
            } else {
                console.error('Error saving leaderboard data:', result.error);
            }
        })
        .catch(error => console.error('Error:', error));
    }
});