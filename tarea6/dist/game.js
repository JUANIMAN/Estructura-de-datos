import { GameOfLife } from './GameOfLife.js';

let GRID_ROWS = 30;
let GRID_COLS = 30;
let INTERVAL = 200; // milliseconds
let generation = 0;

let game = new GameOfLife(GRID_ROWS, GRID_COLS);
let intervalId = null;

const grid = document.getElementById('grid');
const startStopButton = document.getElementById('start-stop');
const nextGenButton = document.getElementById('next-gen');
const clearButton = document.getElementById('clear');
const randomizeButton = document.getElementById('randomize');
const speedControl = document.getElementById('speed');
const gridSizeInput = document.getElementById('grid-size');
const resizeButton = document.getElementById('resize');
const gliderButton = document.getElementById('glider');
const gosperGliderGunButton = document.getElementById('gosper-glider-gun');
const generationSpan = document.getElementById('generation');
const aliveCellsSpan = document.getElementById('alive-cells');
const speedValueSpan = document.getElementById('speed-value');

function createGrid() {
    grid.innerHTML = '';
    const gridContainer = document.getElementById('grid-container');
    const containerWidth = gridContainer.clientWidth;
    const containerHeight = gridContainer.clientHeight;
    const cellSize = Math.min(
        Math.floor(containerWidth / GRID_COLS),
        Math.floor(containerHeight / GRID_ROWS)
    ) - 1; // Subtracting 1 for grid gap

    grid.style.gridTemplateColumns = `repeat(${GRID_COLS}, ${cellSize}px)`;
    document.documentElement.style.setProperty('--cell-size', `${cellSize}px`);

    for (let i = 0; i < GRID_ROWS; i++) {
        for (let j = 0; j < GRID_COLS; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', () => toggleCell(i, j));
            grid.appendChild(cell);
        }
    }
}

function updateGrid() {
    for (let i = 0; i < GRID_ROWS; i++) {
        for (let j = 0; j < GRID_COLS; j++) {
            const cell = grid.children[i * GRID_COLS + j];
            cell.classList.toggle('alive', game.grid.getItem(i, j));
        }
    }
    updateStatistics();
}

function toggleCell(row, col) {
    game.toggleCell(row, col);
    updateGrid();
}

function nextGeneration() {
    game.nextGeneration();
    generation++;
    updateGrid();
}

function updateSpeed() {
    INTERVAL = parseInt(speedControl.value);
    speedValueSpan.textContent = `${INTERVAL} ms`;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(nextGeneration, INTERVAL);
    }
}

window.addEventListener('resize', debounce(() => {
    createGrid();
    updateGrid();
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function startStop() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startStopButton.textContent = 'Iniciar';
        startStopButton.classList.remove('active');
    } else {
        intervalId = setInterval(nextGeneration, INTERVAL);
        startStopButton.textContent = 'Detener';
        startStopButton.classList.add('active');
    }
}

function clear() {
    game.grid.clear(false);
    generation = 0;
    updateGrid();
}

function randomize() {
    game.randomize();
    updateGrid();
}

function resizeGrid() {
    const newSize = parseInt(gridSizeInput.value);
    if (newSize >= 10 && newSize <= 100) {
        GRID_ROWS = GRID_COLS = newSize;
        game = new GameOfLife(GRID_ROWS, GRID_COLS);
        generation = 0;
        createGrid();
        updateGrid();
    }
}

function addGlider() {
    game.grid.clear(false);
    const pattern = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ];
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            game.grid.setItem(i, j, pattern[i][j] === 1);
        }
    }
    updateGrid();
}

function addGosperGliderGun() {
    game.grid.clear(false);
    const pattern = [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    ];
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            game.grid.setItem(i, j, pattern[i][j] === 1);
        }
    }
    updateGrid();
}

function updateStatistics() {
    let aliveCells = 0;
    for (let i = 0; i < GRID_ROWS; i++) {
        for (let j = 0; j < GRID_COLS; j++) {
            if (game.grid.getItem(i, j)) {
                aliveCells++;
            }
        }
    }
    generationSpan.textContent = generation;
    aliveCellsSpan.textContent = aliveCells;
}

startStopButton.addEventListener('click', startStop);
nextGenButton.addEventListener('click', nextGeneration);
clearButton.addEventListener('click', clear);
randomizeButton.addEventListener('click', randomize);
speedControl.addEventListener('input', updateSpeed);
resizeButton.addEventListener('click', resizeGrid);
gliderButton.addEventListener('click', addGlider);
gosperGliderGunButton.addEventListener('click', addGosperGliderGun);

createGrid();
updateGrid();
updateSpeed();