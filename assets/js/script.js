// DOM elements//
const startGameBtn = document.getElementById('start-game');
const homeScreen = document.getElementById('home-screen');
const gameScreen = document.getElementById('game-screen');
const movesLeftElement = document.getElementById('moves-left');
const timerElement = document.getElementById('timer');
const gridContainer = document.getElementById('grid-container');
const restartButton = document.getElementById('restart-btn');


// Variables for game logic//
let tiles; //declaring tiles here//
let movesLeft = 30;
let timer;
let secondsElapsed = 0;
let lockBoard = false;
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
    gridContainer.innerHTML = '';
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
 allTiles.forEach(image => {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        const tileInner = document.createElement('div');
        tileInner.classList.add('tile-inner');

        const tileFront = document.createElement('div');
        tileFront.classList.add('tile-Front');
        tileFront.style.backgroundImage = `url(${image})`;

        const tileBack = document.createElement('div');
        tileBack.classList.add('tile-Back');

        tileInner.appendChild(tileFront);
        tileInner.appendChild(tileBack);
        tile.appendChild(tileInner);

        tile.addEventListener('click', () => flipTile(tile));
        gridContainer.appendChild(tile);
    });

    // Assigned the newly created tiles to the tiles variable//
    tiles = document.querySelectorAll('.tile');
}

// Tile flip logic//
function flipTile(tile) {
    if (lockBoard || tile.classList.contains('flip') || hasWon || movesLeft <= 0) return;

    tile.classList.add('flip');
    const flippedTiles = Array.from(gridContainer.querySelectorAll('.tile.flip:not(.matched)'));

    if (flippedTiles.length === 2) {
        lockBoard = true;
        checkForMatch(flippedTiles);
    }
}

// Check for matches//
function checkForMatch([tile1, tile2]) {
    movesLeft--;
    movesLeftElement.textContent = `Moves Left: ${movesLeft}`;

    const isMatch = tile1.querySelector('.tile-Front').style.backgroundImage === tile2.querySelector('.tile-Front').style.backgroundImage;

    setTimeout(() => {
        if (isMatch) {
            tile1.classList.add('matched');
            tile2.classList.add('matched');
            checkForWin();
        } else {
            tile1.classList.remove('flip');
            tile2.classList.remove('flip');
        }
        lockBoard = false;
    }, 800);

    if (movesLeft <= 0 && !hasWon) {
        stopTimer();
        alert("Game Over! You've run out of moves.");
    }
}

// Check win condition//
function checkForWin() {
    if (Array.from(gridContainer.querySelectorAll('.tile')).every(tile => tile.classList.contains('matched'))) {
        hasWon = true;
        stopTimer();
        alert("You've won!");
    }
}

// Start and restart game//
function startGame() {
initializeGame();
startTimer();
}

startGameBtn.addEventListener('click', startGame);
restartButton.addEventListener('click', () => {
hasWon = false;
stopTimer();
initializeGame();
startTimer();
});

startGame();