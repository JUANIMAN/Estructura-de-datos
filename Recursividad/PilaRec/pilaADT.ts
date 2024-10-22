import { ListaLigada } from "./ListaLigada";

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
            return "Pila[]";
        }

        const elementos: E[] = [];
        for (let i = 0; i < this.longitud(); i++) {
            const elemento = this.datos.obtener(i);
            if (elemento !== null) {
                elementos.push(elemento);
            }
        }

        return `Pila[${elementos.reverse().join(', ')}] <- Tope`;
    }
}