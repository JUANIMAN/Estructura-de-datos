export class Nodo<T> {
    private dato: T;
    private siguiente: Nodo<T> | null;

    constructor();
    constructor(dato: T);
    constructor(dato: T, siguiente: Nodo<T>);
    constructor(dato?: T, siguiente?: Nodo<T>) {
        this.dato = dato as T;
        this.siguiente = siguiente || null;
    }

    public getDato(): T {
        return this.dato;
    }

    public setDato(dato: T): void {
        this.dato = dato;
    }

    public getSiguiente(): Nodo<T> | null {
        return this.siguiente;
    }

    public setSiguiente(siguiente: Nodo<T> | null): void {
        this.siguiente = siguiente;
    }

    public toString(): string {
        return `Nodo{dato=${this.dato}, siguiente=${this.siguiente}}`;
    }
}