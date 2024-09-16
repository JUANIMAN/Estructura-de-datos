import { ListaLigada } from "./ListaLigada";

export class colaADT<E> {
    private dato: ListaLigada<E>;

    constructor() {
        this.dato = new ListaLigada();
    }

    public estaVacia(): boolean {
        return this.dato.getlongitud() === 0;
    }

    public longitud(): number {
        return this.dato.getlongitud();
    }

    public frente(): E | null {
        return this.dato.getPrimero();
    }

    public encolar(elemento: E): void {
        this.dato.agregarAlFinal(elemento);
    }

    public desencolar(): E | null {
        return this.dato.eliminarElPrimero();
    }

    public toString(): string {
        if (this.estaVacia()) {
            return "ColaADT: [ ]";
        }

        let result = "ColaADT: [ ";
        let current = this.dato.getPrimero();
        let index = 0;

        while (current !== null) {
            result += current?.toString();
            if (index === 0) {
                result += " (Frente)";
            }
            if (index === this.longitud() - 1) {
                result += " (Final)";
            }
            if (index < this.longitud() - 1) {
                result += " <- ";
            }
            current = this.dato.obtener(index + 1);
            index++;
        }

        result += " ]";
        return result;
    }
}