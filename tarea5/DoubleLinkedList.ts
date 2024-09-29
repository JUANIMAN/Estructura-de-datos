import { NodoDoble } from "./NodoDoble";

export class DoubleLinkedList<T> {
    private head: NodoDoble<T> | null;
    private tail: NodoDoble<T> | null;
    private length: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    public estaVacia(): boolean {
        let resultado = false;
        if (this.head === null && this.tail === null) {
            resultado = true;
        }
        return resultado;
    }

    public getLongitud(): number {
        return this.length;
    }

    public agregarAlInicio(valor: T): void {
        const nuevoNodo = new NodoDoble<T>(valor);
        if (this.estaVacia()) {
            this.head = nuevoNodo;
            this.tail = nuevoNodo;
        } else {
            this.head!.setAnterior(nuevoNodo);
            nuevoNodo.setSiguiente(this.head!);
            this.head = nuevoNodo;
        }
        this.length++;
    }

    public agregarAlFinal(valor: T): void {
        const nuevoNodo = new NodoDoble<T>(valor);
        if (this.estaVacia()) {
            this.head = nuevoNodo;
            this.tail = nuevoNodo;
        } else {
            this.tail!.setSiguiente(nuevoNodo);
            nuevoNodo.setAnterior(this.tail!);
            this.tail = nuevoNodo;
        }
        this.length++;
    }

    public agregarDespuesDe(referencia: T, valor: T): void {
        const nuevoNodo = new NodoDoble<T>(valor);
        let aux = this.head;
        while (aux!.getDato() !== referencia) {
            aux = aux!.getSiguiente();
        }
        if (aux === null) {
            throw new Error("Referencia no encontrada");
        } else {
            nuevoNodo.setSiguiente(aux.getSiguiente()!);
            nuevoNodo.setAnterior(aux);
            aux.getSiguiente()!.setAnterior(nuevoNodo);
            aux.setSiguiente(nuevoNodo);
            this.length++;
        }
    }

    public obtener(posicion: number): T | null {
        if (posicion < 0 || posicion >= this.length) {
            return null;
        }
        let aux = this.head;
        for (let i = 0; i < posicion; i++) {
            aux = aux!.getSiguiente();
        }
        return aux!.getDato();
    }

    public eliminarElPrimero(): void {
        if (this.estaVacia()) {
            return;
        }
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.head = this.head!.getSiguiente();
            this.head!.setAnterior(null);
        }
        this.length--;
    }

    public eliminarElUltimo(): void {
        if (this.estaVacia()) {
            return;
        }
        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        } else {
            this.tail = this.tail!.getAnterior();
            this.tail!.setSiguiente(null);
        }
        this.length--;
    }

    public eliminar(posicion: number): void {
        if (posicion < 0 || posicion >= this.length) {
            return;
        }
        if (posicion === 0) {
            this.eliminarElPrimero();
            return;
        }
        if (posicion === this.length - 1) {
            this.eliminarElUltimo();
            return;
        }
        let aux = this.head;
        for (let i = 0; i < posicion; i++) {
            aux = aux!.getSiguiente();
        }
        aux!.getAnterior()!.setSiguiente(aux!.getSiguiente()!);
        aux!.getSiguiente()!.setAnterior(aux!.getAnterior()!);
        this.length--;
    }

    public actualizar(aBuscar: T, valor: T): void {
        let aux = this.head;
        while (aux !== null) {
            if (aux.getDato() === aBuscar) {
                aux.setDato(valor);
                return;
            }
            aux = aux.getSiguiente();
        }
    }

    public buscar(valor: T): number {
        let aux = this.head;
        let posicion = 0;
        while (aux !== null) {
            if (aux.getDato() === valor) {
                return posicion;
            }
            aux = aux.getSiguiente();
            posicion++;
        }
        return -1;
    }

    /**
     * transversal @param direccion 0 --> izq a derecha  si es 1 --> derecha a izq
     */
    public transversal(direccion: number = 0): string {
        let aux = this.head;
        let cadena = "|";

        if (direccion === 1) {
            while (aux !== null) {
                cadena += `${aux.getDato()}| <-> |`;
                aux = aux.getAnterior();
            }
            cadena += "null|";
            return cadena;
        } else {
            while (aux !== null) {
                cadena += `${aux.getDato()}| <-> |`;
                aux = aux.getSiguiente();
            }
            cadena += "null|";
            return cadena;
        }
    }
}