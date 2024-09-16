import { GameOfLife } from './GameOfLife.js';

// Configuración
let GRID_ROWS = 30;
let GRID_COLS = 30;
let INTERVAL = 200; // milliseconds

// Estado global
let game, generation, intervalId;

// Elementos del DOM
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

// Funciones principales
function initializeGame() {
    game = new GameOfLife(GRID_ROWS, GRID_COLS);
    generation = 0;
    createGrid();
    updateGrid();
    updateSpeed();
}

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

// Funciones de control del juego
function startStop() {
    if (intervalId) {
        stopSimulation();
    } else {
        startSimulation();
    }
}

function startSimulation() {
    if (countAliveCells() > 0) {
        intervalId = setInterval(nextGeneration, INTERVAL);
        startStopButton.textContent = 'Detener';
        startStopButton.classList.add('active');
    } else {
        alert('No hay células vivas. Añade algunas antes de iniciar la simulación.');
    }
}

function stopSimulation() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        startStopButton.textContent = 'Iniciar';
        startStopButton.classList.remove('active');
    }
}

function nextGeneration() {
    if (countAliveCells() !== 0) {
        game.nextGeneration();
        generation++;
        updateGrid();
    } else {
        stopSimulation();
        alert('La simulación se ha detenido porque no quedan células vivas.');
    }
}

function toggleCell(row, col) {
    game.toggleCell(row, col);
    updateGrid();
}

function countAliveCells() {
    let count = 0;
    for (let i = 0; i < GRID_ROWS; i++) {
        for (let j = 0; j < GRID_COLS; j++) {
            if (game.grid.getItem(i, j)) {
                count++;
            }
        }
    }
    return count;
}

function updateSpeed() {
    INTERVAL = parseInt(speedControl.value);
    speedValueSpan.textContent = `${INTERVAL} ms`;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(nextGeneration, INTERVAL);
    }
}

function updateStatistics() {
    generationSpan.textContent = generation;
    aliveCellsSpan.textContent = countAliveCells();
}

function clear() {
    game.grid.clear(false);
    generation = 0;
    updateGrid();
    stopSimulation();
}

function randomize() {
    game.randomize();
    updateGrid();
}

function resizeGrid() {
    const newSize = parseInt(gridSizeInput.value);
    if (newSize >= 10 && newSize <= 100) {
        GRID_ROWS = GRID_COLS = newSize;
        initializeGame();
    }
}

// Patrones predefinidos
const patterns = {
    glider: [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
    ],
    gosperGliderGun: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
};

function addPattern(pattern) {
    clear();
    for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
            game.grid.setItem(i, j, pattern[i][j] === 1);
        }
    }
    updateGrid();
}

// Event listeners
function addEventListeners() {
    startStopButton.addEventListener('click', startStop);
    nextGenButton.addEventListener('click', nextGeneration);
    clearButton.addEventListener('click', clear);
    randomizeButton.addEventListener('click', randomize);
    speedControl.addEventListener('input', updateSpeed);
    resizeButton.addEventListener('click', resizeGrid);
    gliderButton.addEventListener('click', () => addPattern(patterns.glider));
    gosperGliderGunButton.addEventListener('click', () => addPattern(patterns.gosperGliderGun));

    window.addEventListener('resize', debounce(() => {
        createGrid();
        updateGrid();
    }, 250));
}

// Función debounce para optimizar el evento de redimensionamiento
function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Inicialización
function init() {
    initializeGame();
    addEventListeners();
}

// Ejecutar la inicialización
init();