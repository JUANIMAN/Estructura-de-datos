import { colaADT } from "./ColaADT";

export class ColaConPrioridadAcotada<E> {
    private colas: colaADT<E>[];
    private maxPrioridad: number;

    constructor(maxPrioridad: number) {
        this.maxPrioridad = maxPrioridad;
        this.colas = new Array(maxPrioridad + 1);
        for (let i = 0; i <= this.maxPrioridad; i++) {
            this.colas[i] = new colaADT<E>();
        }
    }

    public longitud(): number {
        let longitud = 0;
        for (let i = 0; i <= this.maxPrioridad; i++) {
            longitud += this.colas[i].longitud();
        }
        return longitud;
    }

    public estaVacia(): boolean {
        return this.longitud() === 0;
    }

    public encolar(elemento: E, prioridad: number): void {
        if (prioridad >= 1 && prioridad <= this.maxPrioridad) {
            this.colas[prioridad].encolar(elemento);
        }
    }

    public desencolar(): E | null {
        for (let i = 1; i <= this.maxPrioridad; i++) {
            if (!this.colas[i].estaVacia()) {
                return this.colas[i].desencolar();
            }
        }
        return null;
    }

    public toString(): string {
        let result = "ColaConPrioridadAcotada:\n";
        for (let i = 1; i <= this.maxPrioridad; i++) {
            result += `Prioridad ${i}: ${this.colas[i].toString()}\n`;
        }
        return result;
    }
}