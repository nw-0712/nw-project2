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
let movesLeft = 30;
let moves = 0;
let lockBoard = false;
let matchedTiles = 0;
let firstTile = null;
let secondTile = null;
let timer;
let secondsElapsed = 0;
let hasWon = false;

// Timer logic section//
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

// Initialize game section//
function initializeGame() {
    gridContainer.innerHTML = '';
    tiles = [];
    movesLeft = 30;
    secondsElapsed = 0;
    hasWon = false;
    
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;
    timerElement.textContent = 'Time: 00:00';
    
    const allTiles = [
        'assets/images/tile1.png', 'assets/images/tile2.png', 'assets/images/tile3.jpg', 
        'assets/images/tile4.jpg', 'assets/images/tile5.jpeg', 'assets/images/tile6.png', 
        'assets/images/tile7.jpg', 'assets/images/tile8.jpeg', 'assets/images/tile9.jpg', 
        'assets/images/tile10.jpg', 'assets/images/tile11.png', 'assets/images/tile1.png',
        'assets/images/tile4.jpg',  'assets/images/tile5.jpeg', 'assets/images/tile9.jpg',
        'assets/images/tile6.png', 'assets/images/tile12.jpg',  'assets/images/tile7.jpg',
];
    
shuffleArray(allTiles);

// Create tile elements//
for (let i = 0; i < allTiles.length; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    
// Front and back tiles//
    const tileInner = document.createElement('div');
    tileInner.classList.add('tile-inner');

    const tileFront = document.createElement('div');
    tileFront.classList.add('tileFront');
    tileFront.style.backgroundImage = `url(${allTiles[i]})`;

    const tileBack = document.createElement('div');
    tileBack.classList.add('tileBack');
    tileBack.style.backgroundImage = `url('assets/images/tileBacks.jpg')`;

    tileInner.appendChild(tileFront);
    tileInner.appendChild(tileBack);
    tile.appendChild(tileInner);

    tile.addEventListener('click', () => flipTile(tile)); 

    gridContainer.appendChild(tile);
    tiles.push(tile);
}
}

// Initialize the tile with data attributes//
const tile = document.createElement('div');
tile.classList.add('tile');
tile.dataset.flipped = 'false'; 


// Tile flip logic//
function flipTile(tile) {
    if (lockBoard || tile === firstTile || tile.classList.contains('flip')) return;

    tile.querySelector('.tile-inner').classList.add('flip');

    if (!firstTile) {
        // First tile flip
        firstTile = tile;
    } else {
        // Second tile flip
        secondTile = tile;
        lockBoard = true;

        checkForMatch();
    }
}

// Check for matches//
function checkForMatch() {
    const isMatch = firstTile.querySelector('.tileFront').style.backgroundImage === 
                    secondTile.querySelector('.tileFront').style.backgroundImage;

    if (isMatch) {
        disableTiles();
        checkForWin();
    } else {
        unflipTiles();
    }
    
    moves++;
    movesLeftElement.textContent = `Moves: ${moves}`;
}

// Disable matched tiles//
function disableTiles() {
    setTimeout(() => {
        firstTile.style.visibility = 'hidden';
        secondTile.style.visibility = 'hidden';
        resetBoard();
    }, 1000);
}

// Unflip non-matching tiles//
function unflipTiles() {
    setTimeout(() => {
        firstTile.querySelector('.tile-inner').classList.remove('flip');
        secondTile.querySelector('.tile-inner').classList.remove('flip');
        resetBoard();
    }, 1000);
}

// Reset the board for the next move//
function resetBoard() {
    [firstTile, secondTile] = [null, null];
    lockBoard = false;
}

// Check win condition//
function checkForWin() {
    if (tiles.every(tile => tile.style.visibility === 'hidden')) {
        hasWon = true;
        stopTimer();
        alert("You've won!");
    }
}

// Start game section//
function startGame() {
    initializeGame();
    startTimer();
}

restartButton.addEventListener('click', () => {
    stopTimer();
    startGame();
});

// Start the game initially
startGame();