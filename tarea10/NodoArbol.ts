export class NodoArbol<T> {
    private dato: T | null;
    private hijoIzquierdo: NodoArbol<T> | null;
    private hijoDerecho: NodoArbol<T> | null;
    
    constructor(dato?: T, hijoIzquierdo?: NodoArbol<T>, hijoDerecho?: NodoArbol<T>) {
        this.dato = dato || null;
        this.hijoIzquierdo = hijoIzquierdo || null;
        this.hijoDerecho = hijoDerecho || null;
    }

    public getDato(): T | null {
        return this.dato;
    }

    public setDato(dato: T): void {
        this.dato = dato;
    }

    public getHijoIzquierdo(): NodoArbol<T> | null {
        return this.hijoIzquierdo;
    }

    public setHijoIzquierdo(hijoIzquierdo: NodoArbol<T>): void {
        this.hijoIzquierdo = hijoIzquierdo;
    }

    public getHijoDerecho(): NodoArbol<T> | null {
        return this.hijoDerecho;
    }

    public setHijoDerecho(hijoDerecho: NodoArbol<T>): void {
        this.hijoDerecho = hijoDerecho;
    }

    public toString(): string {
        return `NodoArbol{dato=${this.dato}, hijoIzquierdo=${this.hijoIzquierdo}, hijoDerecho=${this.hijoDerecho}}`;
    }
}