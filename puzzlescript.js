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

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById('start-button');

    // Add functions to track time, update leaderboard, and submit name
    let startTime;
    let timerInterval;
    let timeTaken;

    // Chessboard and Puzzle Variables
    let board;
    const puzzleAnswers1 = [
        'c7#', 'c7'
    ];
    const puzzleAnswers2 = [
        'O-O#', 'OO', 'O-O', '0-0#', '00', '0-0'
    ];
    const puzzleAnswers3 = [
        'kxe8', 'ke8', 'kex8', 'e8'
    ];
    const puzzleAnswers4 = [
        'd4', 'dx4'
    ];
    const fullAnswer = 'cooked'
    const boardPositions = [
        '2nkb3/3pp1q1/2P5/8/1P6/P7/5KR1/2R5 b - - 0 1',  // FEN for puzzle 1
        '8/7p/4Q3/8/8/5kp1/8/4K2R w K - 0 1', // FEN for puzzle 2
        '4q3/1k1K1p2/6pp/5n2/7P/1P4P1/P4P2/3R4 w - - 0 1', // FEN for puzzle 3
        'r1bqkbnr/pppp2pp/5p2/4n3/8/8/PPPPQPPP/RNB1KBNR w KQkq - 0 1'  // FEN for puzzle 4
    ];

    let currentPuzzleIndex = 0;

    // Initialize the chessboard
    board = Chessboard('chessboard', {
        draggable: false,
        position: 'start'
    });

    exampleBoard = Chessboard('example-board', {
        draggable: false,
        position: '6k1/5ppp/8/8/4R3/8/8/6K1 w - - 0 1'
    })

    // Load the first puzzle on start
    function loadPuzzle(index) {
        board.position(boardPositions[index]);
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
    document.getElementById('submit-move-button').addEventListener('click', () => {
        let userMove = document.getElementById('move-input').value.trim().toLowerCase();

        // Remove special characters like hyphens, spaces, and trailing pound symbols (#)
        userMove = userMove.replace(/[-\s]/g, "").replace(/#$/, "");

        if (userMove) {
            const correctMovesList = [
                puzzleAnswers1,
                puzzleAnswers2,
                puzzleAnswers3,
                puzzleAnswers4
            ];

            // Normalize each move in correctMoves to match the format of userMove
            const correctMoves = correctMovesList[currentPuzzleIndex].map(move => 
                move.trim().toLowerCase().replace(/[-\s]/g, "").replace(/#$/, "")
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
                    document.getElementById('move-input').value = '';
                } else {
                    // All puzzles completed
                    document.getElementById('chesswindow').style.display = 'none';
                    document.getElementById('clue').innerHTML = 'Congratulations! You have completed all the puzzles!<br>Now input the word!';
                }
            } else {
                // Incorrect move
                console.log('Incorrect move:', userMove);
                document.getElementById('clue').innerHTML = 'Incorrect move, try again.';
                setTimeout(() => {
                    document.getElementById('clue').innerHTML = '';
                }, 1000);
            }
        } else {
            alert("Please enter a move in algebraic notation (e.g., e4, Nf3, etc.)");
        }
    });


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
                document.getElementById('letters-guessed').innerHTML = 'Cooked';
            }
            else {
                // Incorrect guess
                document.getElementById('clue').innerHTML = 'Incorrect guess, try again.';
                setTimeout(() => {
                    document.getElementById('clue').innerHTML = '';
                }, 1000);                
            }
        }
    })

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