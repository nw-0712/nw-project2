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
let timer;
let secondsElapsed = 0;
let hasWon = false;
let hasFlippedTile = false;

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
        'assets/images/tile10.jpg', 'assets/images/tile1.png', 'assets/images/tile5.jpeg',
        'assets/images/tile3.jpg',  'assets/images/tile8.jpeg', 'assets/images/tile9.jpg',
        'assets/images/tile6.png', 'assets/images/tile10.jpg',  'assets/images/tile7.jpg',
        'assets/images/tile3.jpg', 'assets/images/tile4.jpg',
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
        tileFront.classList.add('tile-Front');
        tileFront.style.backgroundImage = `url(${allTiles[i]})`;

        const tileBack = document.createElement('div');
        tileBack.classList.add('tile-Back');
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

// Tile flip logic//
function flipTile(tile) {
    if (tile.dataset.flipped === 'true' || hasWon || movesLeft <= 0 || lockBoard) return;

    tile.querySelector('.tile-inner').classList.add('flip');
    tile.dataset.flipped = 'true';

    const flippedTiles = tiles.filter(t => t.dataset.flipped === 'true' && !t.classList.contains('matched'));
    if (flippedTiles.length === 2) {
        lockBoard = true;
        checkForMatch(flippedTiles);
    }
}

// Check for matches//
function checkForMatch(flippedTiles) {
    const [tile1, tile2] = flippedTiles;
    movesLeft--;
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;

    if (tile1.querySelector('.tile-Front').style.backgroundImage === tile2.querySelector('.tile-Front').style.backgroundImage) {
        setTimeout(() => {
            tile1.classList.add('matched');
            tile2.classList.add('matched');
            tile1.style.visibility = 'hidden';
            tile2.style.visibility = 'hidden';
            lockBoard = false;
            checkForWin();
        }, 800);
    } else {
        setTimeout(() => {
            tile1.querySelector('.tile-inner').classList.remove('flip');
            tile2.querySelector('.tile-inner').classList.remove('flip');
            tile1.dataset.flipped = 'false';
            tile2.dataset.flipped = 'false';
            lockBoard = false;
        }, 1000);
    }

    checkForLoss();
}

// Check win condition//
function checkForWin() {
    if (tiles.every(tile => tile.classList.contains('matched'))) {
        hasWon = true;
        stopTimer();
        alert("You've won!");
    }
}

// Check loss condition//
function checkForLoss() {
    if (movesLeft <= 0 && !hasWon) {
        stopTimer();
        alert("Game Over! You've run out of moves.");
    }
}

// Start and restart game//
function startGame() {
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

startGame();