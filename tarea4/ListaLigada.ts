import { Nodo } from './nodo';

export class ListaLigada<T> {
    private head: Nodo<T> | null;
    private tamano: number;

    constructor() {
        this.head = null;
        this.tamano = 0;
    }

    /**
     * estaVacia
     */
    public estaVacia(): boolean {
        return this.head === null;
    }

    /**
     * getTamano
     */
    public getTamano(): number {
        return this.tamano;
    }

    /**
     * agregarAlInicio
     */
    public agregarAlInicio(dato: T): void {
        this.head = new Nodo<T>(dato, this.head!);
        this.tamano++;
    }

    /**
     * agregarAlFinal
     */
    public agregarAlFinal(dato: T): void {
        const nuevoNodo = new Nodo<T>(dato);
        if (this.head === null) {
            this.head = nuevoNodo;
        } else {
            let aux = this.head;
            while (aux.getSiguiente() !== null) {
                aux = aux.getSiguiente()!;
            }
            aux.setSiguiente(nuevoNodo);
        }
        this.tamano++;
    }

    public agregarDespuesDe(referencia: T, valor: T): void {
        let aux = this.head;
        while (aux !== null && aux.getDato() !== referencia) {
            aux = aux.getSiguiente()!;
        }
        if (aux !== null) {
            const nuevoNodo = new Nodo<T>(valor, aux.getSiguiente()!);
            aux.setSiguiente(nuevoNodo);
            this.tamano++;
        }
    }

    public eliminarElPrimero(): void {
        if (this.head !== null) {
            this.head = this.head.getSiguiente()!;
            this.tamano--;
        }
    }

    public eliminarElFinal(): void {
        if (this.head === null) return;
        let aux = this.head;
        while (aux.getSiguiente()?.getSiguiente() !== null) {
            aux = aux.getSiguiente()!;
        }
        aux.setSiguiente(null);
        this.tamano--;
    }

    public eliminar(posicion: number): void {
        if (posicion < 0 || posicion >= this.tamano) {
            throw new Error("Posición fuera de rango");
        }
        if (posicion === 0) {
            this.eliminarElPrimero();
        } else {
            let aux = this.head!;
            for (let i = 0; i < posicion - 1; i++) {
                aux = aux.getSiguiente()!;
            }
            aux.setSiguiente(aux.getSiguiente()!.getSiguiente());
            this.tamano--;
        }
    }

    public buscar(valor: T): number {
        let aux = this.head;
        let posicion = 0;
        while (aux !== null) {
            if (JSON.stringify(aux.getDato()) === JSON.stringify(valor)) {
                return posicion;
            }
            aux = aux.getSiguiente()!;
            posicion++;
        }
        return -1;
    }

    public actualizar(aBuscar: T, valor: T): void {
        let aux = this.head;
        while (aux !== null) {
            if (JSON.stringify(aux.getDato()) === JSON.stringify(aBuscar)) {
                aux.setDato(valor);
                return;
            }
            aux = aux.getSiguiente()!;
        }
    }

    /**
     * transversal
     */
    public transversal(): void {
        let aux = this.head;
        process.stdout.write("|");
        while (aux !== null) {
            process.stdout.write(`${aux.getDato()}| -> |`);
            aux = aux.getSiguiente()!;
        }
        console.log("null|");
    }
}