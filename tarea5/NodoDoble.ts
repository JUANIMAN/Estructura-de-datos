export class NodoDoble<T> {
    private dato: T;
    private siguiente: NodoDoble<T> | null;
    private anterior: NodoDoble<T> | null;
    
    constructor();
    constructor(dato: T);
    constructor(dato: T, siguiente: NodoDoble<T>, anterior: NodoDoble<T>);
    constructor(dato?: T, siguiente?: NodoDoble<T>, anterior?: NodoDoble<T>) {
        this.dato = dato as T;
        this.siguiente = siguiente || null;
        this.anterior = anterior || null;
    }

    /**
     * getDato
    */
    public getDato(): T {
        return this.dato;
    }

    /**
     * setDato
     */
    public setDato(dato: T): void {
        this.dato = dato;
    }

    /**
     * getSiguiente
     */
    public getSiguiente(): NodoDoble<T> | null {
        return this.siguiente;
    }

    /**
     * setSiguiente
     */
    public setSiguiente(siguiente: NodoDoble<T>): void {
        this.siguiente = siguiente;
    }

    /**
     * getAnterior
     */
    public getAnterior(): NodoDoble<T> | null {
        return this.anterior;
    }

    /**
     * setAnterior
     */
    public setAnterior(anterior: NodoDoble<T>): void {
        this.anterior = anterior;
    }

    public toString(): string {
        return `<--| ${this.dato} |-->`;
    }
}