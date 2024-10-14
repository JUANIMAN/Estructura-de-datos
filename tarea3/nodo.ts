export class Nodo<T> {
    private dato: T | null;
    private siguiente: Nodo<T> | null;

    constructor(dato?: T, siguiente?: Nodo<T>) {
        this.dato = dato || null;
        this.siguiente = siguiente || null;
    }

    public getDato(): T | null {
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