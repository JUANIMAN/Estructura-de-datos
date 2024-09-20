import { LaberintoSolver } from './LaberintoSolver.js';
import { PilaADT } from './pilaADT.js';

const laberintoConfig = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];

let solver, intervalId;
let velocidad = 200;
let pasos = 0;

const laberintoElement = document.getElementById('laberinto');
const pilaElement = document.getElementById('pila');
const iniciarButton = document.getElementById('iniciar');
const pasoButton = document.getElementById('paso');
const reiniciarButton = document.getElementById('reiniciar');
const velocidadSlider = document.getElementById('velocidad');
const velocidadValor = document.getElementById('velocidad-valor');
const pasosElement = document.getElementById('pasos');
const estadoElement = document.getElementById('estado');

function inicializarLaberinto() {
    solver = new LaberintoSolver(21, 25);
    solver.configurarLaberinto(laberintoConfig);
    pasos = 0;
    solver.iniciarResolucion();
    actualizarUI();
}

function actualizarUI() {
    const laberinto = solver.obtenerLaberinto();
    const pila = solver.obtenerPila();

    // Actualizar laberinto
    laberintoElement.innerHTML = '';
    laberintoElement.style.gridTemplateColumns = `repeat(${laberinto.getColSize()}, var(--cell-size))`;

    for (let i = 0; i < laberinto.getRowSize(); i++) {
        for (let j = 0; j < laberinto.getColSize(); j++) {
            const celda = document.createElement('div');
            celda.className = 'celda';
            if (i === 0 && j === 0) {
                celda.classList.add('entrada');
            } else if (i === laberinto.getRowSize() - 1 && j === laberinto.getColSize() - 1) {
                celda.classList.add('salida');
            } else {
                switch (laberinto.getItem(i, j)) {
                    case 0: celda.classList.add('libre'); break;
                    case 1: celda.classList.add('pared'); break;
                    case 2: celda.classList.add('actual'); break;
                    case 3: celda.classList.add('descartado'); break;
                }
            }
            laberintoElement.appendChild(celda);
        }
    }

    // Actualizar pila
    pilaElement.innerHTML = '';
    let pilaHTML = '';
    let pilaTemp = new PilaADT();
    while (!pila.estaVacia()) {
        const pos = pila.pop();
        pilaHTML += `<div>(${pos.fila}, ${pos.columna})</div>`;
        pilaTemp.push(pos);
    }
    while (!pilaTemp.estaVacia()) {
        pila.push(pilaTemp.pop());
    }
    pilaElement.innerHTML = pilaHTML;

    // Actualizar estadísticas
    pasosElement.textContent = pasos;
    estadoElement.textContent = solver.esSolucionEncontrada() ? 'Solución encontrada' : 'En progreso';
}

function iniciar() {
    if (!intervalId) {
        intervalId = setInterval(siguientePaso, velocidad);
        iniciarButton.textContent = 'Detener';
        pasoButton.disabled = true;
    } else {
        clearInterval(intervalId);
        intervalId = null;
        iniciarButton.textContent = 'Reanudar';
        pasoButton.disabled = false;
    }
}

function siguientePaso() {
    if (solver.siguientePaso()) {
        pasos++;
        actualizarUI();
    } else {
        clearInterval(intervalId);
        intervalId = null;
        actualizarUI();
        pasoButton.disabled = true;
        if (solver.esSolucionEncontrada()) {
            alert('¡Solución encontrada!');
        } else {
            alert('No se encontró solución');
        }
    }
}

function reiniciar() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    inicializarLaberinto();
    iniciarButton.textContent = 'Iniciar';
    pasoButton.disabled = false;
}

function actualizarVelocidad() {
    velocidad = parseInt(velocidadSlider.value);
    velocidadValor.textContent = `${velocidad} ms`;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = setInterval(siguientePaso, velocidad);
    }
}

iniciarButton.addEventListener('click', iniciar);
pasoButton.addEventListener('click', siguientePaso);
reiniciarButton.addEventListener('click', reiniciar);
velocidadSlider.addEventListener('input', actualizarVelocidad);

inicializarLaberinto();