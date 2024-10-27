// DOM elements//
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
    firstTile = null;
    secondTile = null;
    movesLeft = 30;
    secondsElapsed = 0;
    matchedTiles = 0;
    hasWon = false;

    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;
    timerElement.textContent = 'Time: 00:00';

// List of all tile images (pairs)//
    const allTiles = [
        'assets/images/tile1.png', 'assets/images/tile2.png', 'assets/images/tile3.jpg', 
        'assets/images/tile4.jpg', 'assets/images/tile5.jpeg', 'assets/images/tile6.png', 
        'assets/images/tile7.jpg', 'assets/images/tile8.jpeg', 'assets/images/tile9.jpg', 
        'assets/images/tile10.jpg', 'assets/images/tile1.png', 'assets/images/tile5.jpeg',
        'assets/images/tile3.jpg',  'assets/images/tile8.jpeg', 'assets/images/tile9.jpg',
        'assets/images/tile6.png', 'assets/images/tile10.jpg',  'assets/images/tile7.jpg',
        'assets/images/tile3.jpg', 'assets/images/tile4.jpg',
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
    tileInner.appendChild(tileFront);
    tileInner.appendChild(tileBack);
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
    if (lockBoard || tile === firstTile || hasWon) return;

    tile.classList.add('flipped');
    
    if (!firstTile) {
        firstTile = tile;
        return;
    }

    secondTile = tile;
    lockBoard = true;

    checkForMatch();
}


// Check for matches//
function checkForMatch() {
    const firstImage = firstTile.querySelector('.tile-Front').style.backgroundImage;
    const secondImage = secondTile.querySelector('.tile-Front').style.backgroundImage;

    if (firstImage === secondImage) {
        disableTiles();
        matchedTiles++;
        checkWinCondition();
    } else {
        unflipTiles();
    }

    movesLeft--;
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;

    if (movesLeft === 0 && !hasWon) {
        endGame(false);
    }
}

// Disable tiles when matched//
function disableTiles() {
    firstTile.removeEventListener('click', flipTile);
    secondTile.removeEventListener('click', flipTile);
    resetSelection();
}

// Unflip tiles if they don't match//
function unflipTiles() {
    setTimeout(() => {
        firstTile.classList.remove('flipped');
        secondTile.classList.remove('flipped');
        resetSelection();
    }, 1000);
}

// Reset tile selection//
function resetSelection() {
    [firstTile, secondTile, lockBoard] = [null, null, false];
}

// Check win condition//
function checkWinCondition() {
    if (matchedTiles === tiles.length / 2) {
        endGame(true);
    }
}

// End game function//
function endGame(isWin) {
    hasWon = true;
    stopTimer();
    alert(isWin ? 'Congratulations! You won!' : 'Game Over! You ran out of moves.');
}

// Start and restart game//
function startGame() {
    initializeGame();
    startTimer();
}

// Run startGame on page load//
document.addEventListener('DOMContentLoaded', startGame);

// Restart button functionality//
restartButton.addEventListener('click', () => {
    hasWon = false;
    stopTimer();
    initializeGame();
    startTimer();
});
