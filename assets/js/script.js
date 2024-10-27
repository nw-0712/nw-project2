// DOM elements//
const startGameBtn = document.getElementById('start-game');
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const movesLeftElement = document.getElementById('moves-left');
const timerElement = document.getElementById('timer');
const gridContainer = document.getElementById('grid-container');
const restartButton = document.getElementById('restart-btn');


// Variables for game logic//
let tiles = [];
let firstTile, secondTile;
let movesLeft = 30;
let timer;
let secondsElapsed = 0;
let lockBoard = false;
let matchedTiles = 0;
let hasWon = false;


// Timer logic//
function startTimer() {
    timer = setInterval(() => {
        secondsElapsed++;
        const minutes = Math.floor(secondsElapsed / 60);
        const seconds = secondsElapsed % 60;
        timerElement.textContent = `Time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}

// Shuffle array function//
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize game//
function initializeGame() {
    gridContainer.innerHTML = ''; // Clear grid for fresh start//
    tiles = [];
    movesLeft = 30;
    secondsElapsed = 0;
    matchedTiles = 0;
    hasWon = false;

    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;
    timerElement.textContent = 'Time: 00:00';

// List of all tile images (pairs)//
    const allTiles = [
        'assets/images/tile1.png', 'assets/images/tile1.png',
        'assets/images/tile2.png', 'assets/images/tile2.png',
        'assets/images/tile3.jpg', 'assets/images/tile3.jpg',
        'assets/images/tile4.jpg', 'assets/images/tile4.jpg',
        'assets/images/tile5.png', 'assets/images/tile5.png',
        'assets/images/tile6.jpg', 'assets/images/tile6.jpg',
        'assets/images/tile7.jpg', 'assets/images/tile7.jpg',
        'assets/images/tile8.png', 'assets/images/tile8.png',
        'assets/images/tile9.jpeg', 'assets/images/tile9.jpeg',
        'assets/images/tile10.jpg', 'assets/images/tile10.jpg',
    ];

    shuffleArray(allTiles);

// Create tile elements//
 allTiles.forEach(image => {
    const tile = document.createElement('div');
    tile.classList.add('tile');

// Front and back tile divs//
    const tileInner = document.createElement('div');
    tileInner.classList.add('tile-inner');

    const tileFront = document.createElement('div');
    tileFront.classList.add('tile-Front');
    tileFront.style.backgroundImage = `url(${image})`;

    const tileBack = document.createElement('div');
    tileBack.classList.add('tile-Back');
    tileBack.style.backgroundImage = 'url("assets/images/tileBacks.jpg")';

// Appended elements to create the structure//
tileInner.appendChild(tileBack); // Add back first//
tileInner.appendChild(tileFront); // Add front second//
tile.appendChild(tileInner);


// Added click event for flipping//
    tile.addEventListener('click', () => flipTile(tile));

// Appended tile to grid and to tiles array//
    gridContainer.appendChild(tile);
    tiles.push(tile);
    });
}

// Tile flip logic//
function flipTile(tile) {
    if (lockBoard || tile.classList.contains('flip') || hasWon || movesLeft <= 0) return;

    tile.classList.add('flip');

    const flippedTiles = tiles.filter(t => t.classList.contains('flip') && !t.classList.contains('matched'));
    if (flippedTiles.length === 2) {
        lockBoard = true;
        checkForMatch(flippedTiles);
    }
}

// Check for matches//
function checkForMatch([tile1, tile2]) {
    movesLeft--;
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;

    const firstImage = tile1.querySelector('.tile-Front').style.backgroundImage;
    const secondImage = tile2.querySelector('.tile-Front').style.backgroundImage;
    const isMatch = firstImage === secondImage;

    setTimeout(() => {
        if (isMatch) {
            tile1.classList.add('matched');
            tile2.classList.add('matched');
            tile1.removeEventListener('click', () => flipTile(tile1)); // Disable click on matched tiles//
            tile2.removeEventListener('click', () => flipTile(tile2)); // Disable click on matched tiles//
            matchedTiles += 2;
            checkForWin();
        } else {
            tile1.classList.remove('flip');
            tile2.classList.remove('flip');
        }
        lockBoard = false;
    }, 800);

//Check for end of game//
    if (movesLeft <= 0 && !hasWon) {
        stopTimer();
        alert("Game Over! You've run out of moves.");
    }
}

// Check win condition//
function checkForWin() {
    if (matchedTiles === tiles.length) {
        hasWon = true;
        stopTimer();
        endGame("You've won!");
    }
}

// Reset tile selection//
function resetGame() {
    tiles.forEach(tile => {
        tile.classList.remove('flip', 'matched');
    });
    movesLeft = 30;  // Reset moves
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;
}

// End game logic//
function endGame(message) {
    stopTimer();
    alert(message);
    // Optionally reset the game state //
    resetGame();
}

// Start and restart game//
function startGame() {
    initializeGame();
    startTimer();
}

// Initialise game on page load//
document.addEventListener('DOMContentLoaded', startGame);


// Event listeners for start game on page load & restart button//
startGameBtn.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
    hasWon = false;
    stopTimer();
    initializeGame();
    startTimer();
});
