
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
let timeRemaining = 120;
let timerInterval;
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

// Initialize game
function initializeGame() {
    gridContainer.innerHTML = '';
    tiles = [];
    movesLeft = 30;
    secondsElapsed = 0;
    
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;
    timerElement.textContent = 'Time: 00:00';
    
    const allTiles = [
        'assets/images/tile1.png', 'assets/images/tile2.png', 'assets/images/tile3.jpg', 
        'assets/images/tile4.jpg', 'assets/images/tile5.jpeg', 'assets/images/tile6.png', 
        'assets/images/tile7.jpg', 'assets/images/tile8.jpeg', 'assets/images/tile9.jpg', 
        'assets/images/tile10.jpg', 'assets/images/tile11.png', 'assets/images/tile12.jpg',
        'assets/images/tile13.jpg', 'assets/images/tile14.jpeg', 'assets/images/tile15.jpeg',
        'assets/images/tile16.jpeg', 'assets/images/tile17.jpg', 'assets/images/tile18.jpg',
        'assets/images/tile19.jpg', 'assets/images/tile20.jpg',
    ];
    
    shuffleArray(allTiles);


// Create tile elements//
for (let i = 0; i < allTiles.length; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.tileId = i;
    tile.dataset.flipped = 'false';
    tile.style.backgroundImage = `url(${allTiles[i]})`;
    tile.addEventListener('click', () => flipTile(tile, allTiles[i]));
    gridContainer.appendChild(tile);
    tiles.push(tile);
}
}

// Tile flip logic//
function flipTile(tile, imagePath) {
    if (tile.dataset.flipped === 'true' || hasWon || movesLeft <= 0) return;

    tile.classList.add('flip');
    tile.style.backgroundImage = `url(${imagePath})`;
    tile.dataset.flipped = 'true';

// Check for matches//
    const flippedTiles = tiles.filter(t => t.dataset.flipped === 'true');
    if (flippedTiles.length === 2) {
        checkForMatch(flippedTiles);
}
}

// Check for matches//
function checkForMatch(flippedTiles) {
    const [tile1, tile2] = flippedTiles;
    movesLeft--;
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;

    if (tile1.style.backgroundImage === tile2.style.backgroundImage) {
        setTimeout(() => {
            tile1.style.visibility = 'hidden';
            tile2.style.visibility = 'hidden';
            checkForWin();
        }, 1000);
    } else {
        setTimeout(() => {
            tile1.classList.remove('flip');
            tile2.classList.remove('flip');
            tile1.dataset.flipped = 'false';
            tile2.dataset.flipped = 'false';
        }, 1000);
    }

    checkForLoss();
}

// Check win condition
function checkForWin() {
    if (tiles.every(tile => tile.style.visibility === 'hidden')) {
        hasWon = true;
        stopTimer();
        alert("You've won!");
    }
}

// Check loss game condition//
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

// Restart game
restartButton.addEventListener('click', () => {
    hasWon = false;
    stopTimer();
    initializeGame();
    startTimer();
});

