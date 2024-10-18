
// Variables for game logic
let tiles = [];
let movesLeft = 30;
let timer;
let secondsElapsed = 0;
let hasWon = false;


// Timer logic//
function startTimer() {
    timer = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        document.getElementById('timer').textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Initialize game board
function initializeGame() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    