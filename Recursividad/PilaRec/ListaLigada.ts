import { Nodo } from './Nodo';

export class ListaLigada<T> {
    private head: Nodo<T> | null;
    private tail: Nodo<T> | null;
    private longitud: number;

    constructor() {
        this.head = null;
        this.tail = null;
        this.longitud = 0;
    }

    public estaVacia(): boolean {
        return this.longitud === 0;
    }

    public getLongitud(): number {
        return this.longitud;
    }

    public getPrimero(): T | null {
        return this.head?.getDato() ?? null;
    }

    public getUltimo(): T | null {
        return this.tail?.getDato() ?? null;
    }

    public agregarAlInicio(dato: T): void {
        const nuevoNodo = new Nodo<T>(dato);
        if (this.estaVacia()) {
            this.head = this.tail = nuevoNodo;
        } else {
            nuevoNodo.setSiguiente(this.head);
            this.head = nuevoNodo;
        }
        this.longitud++;
    }

    public agregarAlFinal(dato: T): void {
        const nuevoNodo = new Nodo<T>(dato);
        if (this.estaVacia()) {
            this.head = this.tail = nuevoNodo;
        } else {
            this.tail!.setSiguiente(nuevoNodo);
            this.tail = nuevoNodo;
        }
        this.longitud++;
    }

    public agregarDespuesDe(referencia: T, valor: T): void {
        const nodoReferencia = this.buscarNodo(referencia);
        if (nodoReferencia) {
            const nuevoNodo = new Nodo<T>(valor, nodoReferencia.getSiguiente()!);
            nodoReferencia.setSiguiente(nuevoNodo);
            if (nodoReferencia === this.tail) {
                this.tail = nuevoNodo;
            }
            this.longitud++;
        }
    }

    public eliminarElPrimero(): T | null {
        if (this.estaVacia()) return null;
        const datoEliminado = this.head!.getDato();
        this.head = this.head!.getSiguiente();
        this.longitud--;
        if (this.estaVacia()) {
            this.tail = null;
        }
        return datoEliminado;
    }

    public eliminarElUltimo(): T | null {
        if (this.estaVacia()) return null;
        if (this.longitud === 1) {
            return this.eliminarElPrimero();
        }
        let penultimo = this.head;
        while (penultimo!.getSiguiente() !== this.tail) {
            penultimo = penultimo!.getSiguiente();
        }
        const datoEliminado = this.tail!.getDato();
        penultimo!.setSiguiente(null);
        this.tail = penultimo;
        this.longitud--;
        return datoEliminado;
    }

    public eliminar(posicion: number): T | null {
        if (posicion < 0 || posicion >= this.longitud) {
            throw new Error("Posición fuera de rango");
        }
        if (posicion === 0) return this.eliminarElPrimero();
        if (posicion === this.longitud - 1) return this.eliminarElUltimo();

        let anterior = this.head;
        for (let i = 0; i < posicion - 1; i++) {
            anterior = anterior!.getSiguiente();
        }
        const nodoEliminado = anterior!.getSiguiente();
        anterior!.setSiguiente(nodoEliminado!.getSiguiente());
        this.longitud--;
        return nodoEliminado!.getDato();
    }

    public obtener(posicion: number): T | null {
        if (posicion < 0 || posicion >= this.longitud) {
            return null;
        }
        let actual = this.head;
        for (let i = 0; i < posicion; i++) {
            actual = actual!.getSiguiente();
        }
        return actual!.getDato();
    }

    public buscar(valor: T): number {
        let actual = this.head;
        let posicion = 0;
        while (actual !== null) {
            if (this.compararDatos(actual.getDato(), valor)) {
                return posicion;
            }
            actual = actual.getSiguiente();
            posicion++;
        }
        return -1;
    }

    private buscarNodo(valor: T): Nodo<T> | null {
        let actual = this.head;
        while (actual !== null) {
            if (this.compararDatos(actual.getDato(), valor)) {
                return actual;
            }
            actual = actual.getSiguiente();
        }
        return null;
    }

    public actualizar(aBuscar: T, valor: T): boolean {
        const nodo = this.buscarNodo(aBuscar);
        if (nodo) {
            nodo.setDato(valor);
            return true;
        }
        return false;
    }

    public transversal(): string {
        let actual = this.head;
        let cadena = "|";
        while (actual !== null) {
            cadena += `${actual.getDato()}| -> |`;
            actual = actual.getSiguiente();
        }
        cadena += "null|";
        return cadena;
    }

    private compararDatos(a: T | null, b: T | null): boolean {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    public toArray(): T[] {
        const array: T[] = [];
        let actual = this.head;
        while (actual !== null) {
            array.push(actual.getDato()!);
            actual = actual.getSiguiente();
        }
        return array;
    }

    public forEach(callback: (valor: T, indice: number) => void): void {
        let actual = this.head;
        let indice = 0;
        while (actual !== null) {
            callback(actual.getDato()!, indice);
            actual = actual.getSiguiente();
            indice++;
        }
    }
}