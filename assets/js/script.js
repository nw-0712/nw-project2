
// Variables for game logic//
let tiles = [];
let movesLeft = 30;
let timer;
let secondsElapsed = 0;
let hasWon = false;


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

// Initialize game board section//
function initializeGame() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';

    
 // Shuffle tiles section//
 const tileBacks = Array.from({ length: 25 }, (_, i) => `img/back${i + 1}.png`);
 tileBacks.length = 12; // Only need 12 unique pairs
 const allTiles = [...tileBacks, ...tileBacks];
 shuffleArray(allTiles);


 // Create tile elements//
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

// Shuffle array tile section//
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipTile() {
    if (this.dataset.flipped === 'true') return;

    this.classList.add('flip');
    this.dataset.flipped = 'true';

// Check if two tiles are flipped//
    const flippedTiles = tiles.filter(tile => tile.dataset.flipped === 'true');
    if (flippedTiles.length === 2) {
        checkForMatch(flippedTiles);
    }
}

//Check if tiles are matched//
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

    movesLeft--;
    document.getElementById('moves-left').textContent = `Moves Left: ${movesLeft}`;
    checkForLoss();
}


