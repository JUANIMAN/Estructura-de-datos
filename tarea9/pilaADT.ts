import { ListaLigada } from "./ListaLigada.js";

export class PilaADT<E> {
    private datos: ListaLigada<E>;

    constructor() {
        this.datos = new ListaLigada<E>();
    }

    public estaVacia(): boolean {
        return this.datos.getLongitud() === 0;
    }

    public longitud(): number {
        return this.datos.getLongitud();
    }

    public peek(): E | null {
        return this.datos.getPrimero();
    }

    public push(elemento: E): void {
        this.datos.agregarAlInicio(elemento);
    }

    public pop(): E | null {
        return this.datos.eliminarElPrimero();
    }

    public toString(): string {
        if (this.estaVacia()) {
            return "PilaADT: [ ]";
        }

        let result = "PilaADT: [ ";
        let current = this.datos.getPrimero();
        let index = 0;

        while (current !== null) {
            result += current?.toString();
            if (index === 0) {
                result += " (Tope)";
            }
            if (index === this.longitud() - 1) {
                result += " (Base)";
            }
            if (index < this.longitud() - 1) {
                result += " | ";
            }
            current = this.datos.obtener(index + 1);
            index++;
        }

        result += " ]";
        return result;
    }
}