
// Variables for game logic//
let tiles = [];
let movesLeft = 30;
let moves = 0;
let lockBoard = false;
let matchedTiles = 0;
let timer;
let secondsElapsed = 0;

// DOM elements//
const gridContainer = document.getElementById('grid-container');
const movesLeftElement = document.getElementById('moves-left');
const timerElement = document.getElementById('timer');
const shuffleElement = document.getElementById('tile');
const restartButton = document.querySelector('.restart');

// Timer logic section//
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


 // Tile to the grid layout//
 gridContainer.appendChild(tile);
 tiles.push(tile);

// Initialize game board section//
function initializeGame() {
    gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    tiles = [];


// Shuffle tiles//
    const tileBacks = Array.from({ length: 25 }, (_, i) => `img/back${i + 1}.png`);
    tileBacks.length = 20; // Only need 20 unique pairs
//Shuffle tiles section//
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

// Generate the tiles in the grid-container//
const gridContainer = document.getElementById('grid-container');
const tiles = document.querySelectorAll('tile');


 // Create tile elements dynamically//
 for (let i = 0; i < allTiles.length; i++) {
     const tile = document.createElement('div');
     tile.classList.add('tile');
     tile.dataset.tileId = i;
     tile.dataset.flipped = 'false';
     tile.style.backgroundImage = `url(${allTiles[i]})`;
     tile.addEventListener('click', flipTile);
     gridContainer.appendChild(tile);
     tiles.push(tile);
 }
}
 
//Tile back - the front of the tile before it is flipped, will be same for all tiles//
tile.style.backgroundImage = `url('assets/images/tileBacks.jpg')`;

// Tile back //
const allTiles = ['assets/images/tileBacks.jpg'];
shuffleArray(allTiles);

// Shuffle array for tiles//
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

//Flip tile logic section//
function flipTile(tile, imagePath) {
    tile.classList.add('flip');
    tile.dataset.flipped = 'true';

// Check if two tiles are flipped
const flippedTiles = tiles.filter(tile => tile.dataset.flipped === 'true');
if (flippedTiles.length === 2) {
    checkForMatch(flippedTiles);
}
}

//Check if tiles are matched and flip//
function checkForMatch(flippedTiles) {
    const [tile1, tile2] = flippedTiles;
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

// Update moves left//
movesLeft--;
movesLeftElement.textContent = `Moves Left: ${movesLeft}`;
checkForLoss();
}


// Check if the player has won//
function checkForWin() {
    if (tiles.every(tile => tile.style.visibility === 'hidden')) {
        hasWon = true;
        stopTimer();
    }
}

// Shuffle and restart game//
document.getElementById('restart-btn').addEventListener('click', () => {
    movesLeft = 30;
    secondsElapsed = 0;
    document.getElementById('moves-left').textContent = `Moves Left: ${movesLeft}`;
    document.getElementById('timer').textContent = 'Time: 00:00';
    hasWon = false;
    tiles = [];
    stopTimer();
    startTimer();
    initializeGame();
});

// Reset moves and timer //
movesLeft = maxMoves;
secondsElapsed = 0;
movesLeftElement.textContent = `Moves Left: ${movesLeft}`;
timerElement.textContent = `Time: 00:00`;
hasWon = false;


// Tile click listener//
tile.addEventListener('click', () => {
    if (tile.dataset.flipped === 'false' && movesLeft > 0 && !hasWon) {
        tile.style.backgroundImage = `url(${allTiles[i]})`;
        flipTile(tile, allTiles[i]);
    }
});

tiles.forEach(tile => {
    tile.addEventListener('click', () => {
        tile.classList.toggle('flipped');
    });
});

// Start timer//
startTimer();


// Check if the player has run out of moves//
function checkForLoss() {
    if (movesLeft === 0 && !hasWon) {
        stopTimer();    
    }
}

// Shuffle and restart game//
restart-button.addEventListener('click', () => {
    initializeGame();
});

// Start the game when the window loads//
window.onload = () => {
    initializeGame();
};