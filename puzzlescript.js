// Fetch and update the leaderboard dynamically
function updateLeaderboard() {
    fetch('https://gamenight-backend.onrender.com/leaderboard')
        .then(response => response.json())
        .then(data => {
            const leaderboardTable = document.getElementById('leaderboard-table').querySelector('tbody');
            leaderboardTable.innerHTML = '';
            data.forEach(user => {
                let time = user.time_taken;

                // Check if `time` is a number (in seconds) and format it to mm:ss
                if (typeof time === 'number') {
                    const totalSeconds = time;
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    time = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }

                const row = `<tr><td>${user.name}</td><td>${time}</td></tr>`;
                leaderboardTable.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
}

function disableScroll() {
    // Get the chessboard element and its position
    const chessboardElement = document.getElementById('chessboard');
    if (chessboardElement) {
        // Scroll the window to the chessboard element so it's centralized
        chessboardElement.scrollIntoView({
            behavior: 'smooth', // Smooth scrolling animation
            block: 'center',    // Align to the vertical center of the screen
            inline: 'center'    // Align to the horizontal center (if applicable)
        });
    }

    document.body.style.overflow = 'hidden';
}

// Function to enable scrolling
function enableScroll() {
    document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('start-button');

    // Add functions to track time, update leaderboard, and submit name
    let startTime;
    let timerInterval;
    let timeTaken;

    // Chessboard and Puzzle Variables
    let board;
    let game = new Chess(); // Using Chess.js to track the game
    const puzzleAnswers1 = [
        'b4'
    ];
    const puzzleAnswers2 = [
        'Re4#'
    ];
    const puzzleAnswers3 = [
        'a4+'
    ];
    const puzzleAnswers4 = [
        'd6'
    ];
    const fullAnswer = 'bread'
    const boardPositions = [
        '5k1r/n1p1pbp1/B5Rp/2qr4/2Npp3/1P6/Q1N2PPP/6K1 w - - 0 1',
        '1r2kr2/1np2p2/8/3R4/1R6/1b6/5PPP/6K1 w - - 0 1',
        '3Br3/1p3ppp/p1p5/1kb5/7n/2Q1r3/P1P3PP/7K w - - 0 1',
        '8/8/6p1/3P1p1k/5P2/5KP1/8/8 w - - 0 1'
    ];

    let currentPuzzleIndex = 0;

    // Initialize the chessboard
    board = Chessboard('chessboard', {
        draggable: true,
        position: 'start',
        onDrop: handleMove // This function will be called when a piece is dropped
    });

    exampleBoard = Chessboard('example-board', {
        draggable: false,
        position: '6k1/5ppp/8/8/4R3/8/8/6K1 w - - 0 1'
    })

    // Load the first puzzle on start
    function loadPuzzle(index) {
        const fen = boardPositions[index];
        board.position(fen);
        game.load(fen); // Load the FEN into the chess.js game instance
    }

    if (startButton) {
        // Listen for click events (desktop and some mobile devices)
        startButton.addEventListener('click', startGame);

        // Listen for touch events (mobile devices)
        startButton.addEventListener('touchstart', startGame);
    }
    updateLeaderboard();

    // Start button to initiate the timer
    function startGame() {
        startTime = Date.now();
        document.getElementById('clue-and-input').style.display = 'block';
        document.getElementById('time-container').style.display = 'block';
        document.getElementById('start-button').style.display = 'none';
        document.getElementById('instructions').style.display = 'none';
        loadPuzzle(currentPuzzleIndex); // Load the first puzzle
        startTimer();
        console.log("start game button pressed, function called all the way through");
        disableScroll();
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
        document.getElementById('time-taken').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Handle move submission for the current puzzle
    function handleMove(source, target) {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q' // Assume promotion to a queen if applicable
        });

        if (move === null) {
            return 'snapback'; // Invalid move, return the piece to its original square
        }

        const correctMovesList = [
            puzzleAnswers1,
            puzzleAnswers2,
            puzzleAnswers3,
            puzzleAnswers4
        ];

        // Convert move to algebraic notation
        const userMove = move.san.toLowerCase().replace(/[-\s]/g, "").replace(/#$/, "");
        const correctMoves = correctMovesList[currentPuzzleIndex].map(m =>
            m.trim().toLowerCase().replace(/[-\s]/g, "").replace(/#$/, "")
        );

        console.log('Current puzzle index:', currentPuzzleIndex);
        console.log('Correct Moves:', correctMoves);
        console.log('User Move:', userMove);

        if (correctMoves.includes(userMove)) {
            // Correct move
            console.log('Correct move:', userMove);
            currentPuzzleIndex++;

            // Update the letters guessed display
            const answersDisplay = correctMovesList.slice(0, currentPuzzleIndex)
                .map((answers) => answers[0]) // Get the first answer from each correctMoves list
                .join(', ');
            document.getElementById('letters-guessed').innerHTML = `Answers: &nbsp;&nbsp;&nbsp; ${answersDisplay}`;

            if (currentPuzzleIndex < correctMovesList.length) {
                // Load the next puzzle if available
                loadPuzzle(currentPuzzleIndex);
            } else {
                // All puzzles completed
                enableScroll();
                document.getElementById('chesswindow').style.display = 'none';
                document.getElementById('clue').innerHTML = 'Congratulations! You have completed all the puzzles!<br>Now input the word!';
            }
        } else {
            // Incorrect move
            console.log('Incorrect move:', userMove);
            document.getElementById('clue').innerHTML = 'Incorrect move, try again.';
        
            // Reset the puzzle to its initial state
            setTimeout(() => {
                // Clear the "Incorrect move" message after 1 second
                document.getElementById('clue').innerHTML = '';
        
                // Reload the current puzzle's initial position
                loadPuzzle(currentPuzzleIndex);
                game.load(boardPositions[currentPuzzleIndex]);  // Reset the game logic to the FEN state as well
        
            }, 1000);
        }        
    }

    document.getElementById('submit-word-button').addEventListener('click', () => {
        const wordGuess = document.getElementById('submit-word').value
        if (wordGuess) {
            if (wordGuess.toLowerCase() === fullAnswer.toLowerCase()) {
                stopTimer();
                const totalSeconds = Math.floor((Date.now() - startTime) / 1000);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                timeTaken = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // Format as mm:ss
                document.getElementById('name-input-container').style.display = 'block';
                document.getElementById('word-guess-window').style.display = 'none';
                document.getElementById('chesswindow').style.display = 'none';
                document.getElementById('clue').style.display = 'block';
                document.getElementById('clue').style.fontSize = '1.5em';
                document.getElementById('clue').innerHTML = 'You got it!!!';
                document.getElementById('letters-guessed').style.fontSize = '2em';
                document.getElementById('letters-guessed').innerHTML = 'Bread';
            }
            else {
                // Incorrect guess
                document.getElementById('clue').innerHTML = 'Incorrect, try again.';
                setTimeout(() => {
                    document.getElementById('clue').innerHTML = '';
                }, 1000);                
            }
        }
    });

    // Add event listener for submitting name to leaderboard
    document.getElementById('submit-name-button').addEventListener('click', () => {
        const userName = document.getElementById('user-name').value;
        document.getElementById('submit-name-button').disabled = true;
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
});