import { Array2D } from './Array2D.js';
import { PilaADT } from './pilaADT.js';

interface Posicion {
    fila: number;
    columna: number;
}

export class LaberintoSolver {
    private laberinto: Array2D<number>;
    private visitados: Array2D<boolean>;
    private entrada: Posicion;
    private salida: Posicion;
    private pila: PilaADT<Posicion>;
    private solucionEncontrada: boolean;

    constructor(filas: number, columnas: number) {
        this.laberinto = new Array2D<number>(filas, columnas, 1);
        this.visitados = new Array2D<boolean>(filas, columnas, false);
        this.entrada = { fila: 0, columna: 0 };
        this.salida = { fila: filas - 1, columna: columnas - 1 };
        this.pila = new PilaADT<Posicion>();
        this.solucionEncontrada = false;
    }

    public configurarLaberinto(laberintoConfig: number[][]): void {
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

    public iniciarResolucion(): void {
        this.pila.push(this.entrada);
        this.visitados.setItem(this.entrada.fila, this.entrada.columna, true);
        this.laberinto.setItem(this.entrada.fila, this.entrada.columna, 2); // 2 representa el camino actual
    }

    public siguientePaso(): boolean {
        if (this.solucionEncontrada || this.pila.estaVacia()) {
            return false;
        }

        const posicionActual = this.pila.peek()!;

        if (this.esSalida(posicionActual)) {
            this.solucionEncontrada = true;
            return false;
        }

        const siguientePosicion = this.encontrarSiguienteMovimiento(posicionActual);

        if (siguientePosicion) {
            this.pila.push(siguientePosicion);
            this.visitados.setItem(siguientePosicion.fila, siguientePosicion.columna, true);
            this.laberinto.setItem(siguientePosicion.fila, siguientePosicion.columna, 2);
        } else {
            const posicionDescartada = this.pila.pop()!;
            this.laberinto.setItem(posicionDescartada.fila, posicionDescartada.columna, 3); // 3 representa camino descartado
        }

        return true;
    }

    private esSalida(posicion: Posicion): boolean {
        return posicion.fila === this.salida.fila && posicion.columna === this.salida.columna;
    }

    private encontrarSiguienteMovimiento(posicion: Posicion): Posicion | null {
        const movimientos = [
            { fil: 0, col: -1 }, // Izquierda
            { fil: -1, col: 0 }, // Arriba
            { fil: 0, col: 1 },  // Derecha
            { fil: 1, col: 0 }   // Abajo
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

    private esMovimientoValido(fila: number, columna: number): boolean {
        return fila >= 0 && fila < this.laberinto.getRowSize() &&
            columna >= 0 && columna < this.laberinto.getColSize() &&
            this.laberinto.getItem(fila, columna) === 0 &&
            !this.visitados.getItem(fila, columna);
    }

    public obtenerLaberinto(): Array2D<number> {
        return this.laberinto;
    }

    public obtenerPila(): PilaADT<Posicion> {
        return this.pila;
    }

    public esSolucionEncontrada(): boolean {
        return this.solucionEncontrada;
    }
}