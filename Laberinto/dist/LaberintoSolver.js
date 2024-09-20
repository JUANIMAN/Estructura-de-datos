import { Array2D } from './Array2D.js';
import { PilaADT } from './pilaADT.js';
export class LaberintoSolver {
    constructor(filas, columnas) {
        this.laberinto = new Array2D(filas, columnas, 1);
        this.visitados = new Array2D(filas, columnas, false);
        this.entrada = { fila: 0, columna: 0 };
        this.salida = { fila: filas - 1, columna: columnas - 1 };
        this.pila = new PilaADT();
        this.solucionEncontrada = false;
    }
    configurarLaberinto(laberintoConfig) {
        if (laberintoConfig.length !== this.laberinto.getRowSize() ||
            laberintoConfig[0].length !== this.laberinto.getColSize()) {
            throw new Error("La configuración del laberinto no coincide con el tamaño inicializado");
        }
        for (let i = 0; i < laberintoConfig.length; i++) {
            for (let j = 0; j < laberintoConfig[i].length; j++) {
                this.laberinto.setItem(i, j, laberintoConfig[i][j]);
            }
        }
    }
    iniciarResolucion() {
        this.pila.push(this.entrada);
        this.visitados.setItem(this.entrada.fila, this.entrada.columna, true);
        this.laberinto.setItem(this.entrada.fila, this.entrada.columna, 2); // 2 representa el camino actual
    }
    siguientePaso() {
        if (this.solucionEncontrada || this.pila.estaVacia()) {
            return false;
        }
        const posicionActual = this.pila.peek();
        if (this.esSalida(posicionActual)) {
            this.solucionEncontrada = true;
            return false;
        }
        const siguientePosicion = this.encontrarSiguienteMovimiento(posicionActual);
        if (siguientePosicion) {
            this.pila.push(siguientePosicion);
            this.visitados.setItem(siguientePosicion.fila, siguientePosicion.columna, true);
            this.laberinto.setItem(siguientePosicion.fila, siguientePosicion.columna, 2);
        }
        else {
            const posicionDescartada = this.pila.pop();
            this.laberinto.setItem(posicionDescartada.fila, posicionDescartada.columna, 3); // 3 representa camino descartado
        }
        return true;
    }
    esSalida(posicion) {
        return posicion.fila === this.salida.fila && posicion.columna === this.salida.columna;
    }
    encontrarSiguienteMovimiento(posicion) {
        const movimientos = [
            { fil: 0, col: -1 }, // Izquierda
            { fil: -1, col: 0 }, // Arriba
            { fil: 0, col: 1 }, // Derecha
            { fil: 1, col: 0 } // Abajo
        ];
        for (const movimiento of movimientos) {
            const nuevaFila = posicion.fila + movimiento.fil;
            const nuevaColumna = posicion.columna + movimiento.col;
            if (this.esMovimientoValido(nuevaFila, nuevaColumna)) {
                return { fila: nuevaFila, columna: nuevaColumna };
            }
        }
        return null;
    }
    esMovimientoValido(fila, columna) {
        return fila >= 0 && fila < this.laberinto.getRowSize() &&
            columna >= 0 && columna < this.laberinto.getColSize() &&
            this.laberinto.getItem(fila, columna) === 0 &&
            !this.visitados.getItem(fila, columna);
    }
    obtenerLaberinto() {
        return this.laberinto;
    }
    obtenerPila() {
        return this.pila;
    }
    esSolucionEncontrada() {
        return this.solucionEncontrada;
    }
}
