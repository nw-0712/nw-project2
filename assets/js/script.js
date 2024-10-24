// DOM elements
const startGameBtn = document.getElementById('start-game');
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const movesLeftElement = document.getElementById('moves-left');
const timerElement = document.getElementById('timer');
const gridContainer = document.getElementById('grid-container');
const restartButton = document.getElementById('restart-btn');

// Variables for game logic
let tiles = [];
let movesLeft = 30;
let moves = 0;
let lockBoard = false;
let matchedTiles = 0;
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

// To create tile elements//
    for (let i = 0; i < allTiles.length; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

// Front and back tiles//
        const tileInner = document.createElement('div');
        tileInner.classList.add('tile-inner');

        const tileFront = document.createElement('div');
        tileFront.classList.add('tile-front');
        tileFront.style.backgroundImage = `url(${allTiles[i]})`;

        const tileBack = document.createElement('div');
        tileBack.classList.add('tile-back');
        tileBack.style.backgroundImage = `url('assets/images/tileBacks.jpg')`; // back image//

        tileInner.appendChild(tileFront);
        tileInner.appendChild(tileBack);
        tile.appendChild(tileInner);

        tile.dataset.flipped = 'false';
        tile.addEventListener('click', () => flipTile(tile));

        gridContainer.appendChild(tile);
        tiles.push(tile);
    }
}

// Tile flip logic section//
function flipTile(tile) {
    if (tile.dataset.flipped === 'true' || hasWon || movesLeft <= 0 || lockBoard) return;

    tile.querySelector('.tile-inner').classList.add('flip'); // Adding flip class to inner element//
    tile.dataset.flipped = 'true'; // Mark as flipped//

    const flippedTiles = tiles.filter(t => t.dataset.flipped === 'true' && !t.classList.contains('matched'));
    if (flippedTiles.length === 2) {
        lockBoard = true; // Lock the board during checking//
        checkForMatch(flippedTiles);
    }
}

// Check for matches//
function checkForMatch(flippedTiles) {
    const [tile1, tile2] = flippedTiles;
    movesLeft--;
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;

// Compare the background images of both tiles//
    if (tile1.querySelector('.tile-front').style.backgroundImage === tile2.querySelector('.tile-front').style.backgroundImage) {
        setTimeout(() => {
            tile1.classList.add('matched'); // Mark as matched//
            tile2.classList.add('matched');
            tile1.style.visibility = 'hidden'; // Hide matched tiles//
            tile2.style.visibility = 'hidden';
            checkForWin();
            lockBoard = false; // Unlock the board//
        }, 1000);
    } else {
        setTimeout(() => {
            tile1.querySelector('.tile-inner').classList.remove('flip');
            tile2.querySelector('.tile-inner').classList.remove('flip');
            tile1.dataset.flipped = 'false';
            tile2.dataset.flipped = 'false';
            lockBoard = false; // Unlock the board//
        }, 1000);
}

    checkForLoss();
}

// Check win condition//
function checkForWin() {
    if (tiles.every(tile => tile.style.visibility === 'hidden')) {
        hasWon = true;
        stopTimer();
        alert("You've won!");
    }
}

// Check loss condition section//
function checkForLoss() {
    if (movesLeft <= 0 && !hasWon) {
        stopTimer();
        alert("Game Over! You've run out of moves.");
    }
}

// Start game section//
function startGame() {
    homeScreen.style.display = 'none';
    gameScreen.style.display = 'block';
    initializeGame();
    startTimer();
}

startGameBtn.addEventListener('click', startGame);

// Restart game section//
restartButton.addEventListener('click', () => {
    hasWon = false;
    stopTimer();
    initializeGame();
    startTimer();
});
