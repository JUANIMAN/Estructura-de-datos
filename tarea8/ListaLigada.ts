import { Nodo } from './nodo';

export class ListaLigada<T> {
    private head: Nodo<T> | null;
    private longitud: number;

    constructor() {
        this.head = null;
        this.longitud = 0;
    }

    public estaVacia(): boolean {
        return this.head === null;
    }

    public getlongitud(): number {
        return this.longitud;
    }

    public getPrimero(): T | null {
        return this.head!.getDato();
    }

    public agregarAlInicio(dato: T): void {
        this.head = new Nodo<T>(dato, this.head!);
        this.longitud++;
    }

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
        this.longitud++;
    }

    public agregarDespuesDe(referencia: T, valor: T): void {
        let aux = this.head;
        while (aux !== null && aux.getDato() !== referencia) {
            aux = aux.getSiguiente()!;
        }
        if (aux !== null) {
            const nuevoNodo = new Nodo<T>(valor, aux.getSiguiente()!);
            aux.setSiguiente(nuevoNodo);
            this.longitud++;
        }
    }

    public eliminarElPrimero(): T | null {
        let primero: T | null = null;
        if (this.head !== null) {
            primero = this.head.getDato();
            this.head = this.head.getSiguiente()!;
            this.longitud--;
        }
        return primero;
    }

    public eliminarElUltimo(): void {
        let aux: Nodo<T> | null = this.head;
        if (aux === null) return;
        while (aux.getSiguiente() !== null) {
            aux = aux.getSiguiente()!;
        }
        aux.setSiguiente(null);
        this.longitud--;
    }

    public eliminar(posicion: number): void {
        if (posicion < 0 || posicion >= this.longitud) {
            throw new Error("Posición fuera de rango");
        }
        if (posicion === 0) {
            this.eliminarElPrimero();
        } else {
            let aux = this.head!;
            for (let i = 0; i < posicion - 1; i++) {
                aux = aux.getSiguiente()!;
            }
            aux.setSiguiente(aux.getSiguiente()?.getSiguiente()!);
            this.longitud--;
        }
    }

    public obtener(posicion: number): T | null {
        if (posicion < 0 || posicion >= this.longitud) {
            return null;
        }
        let aux = this.head;
        for (let i = 0; i < posicion; i++) {
            aux = aux!.getSiguiente();
        }
        return aux!.getDato();
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