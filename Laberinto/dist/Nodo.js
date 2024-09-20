export class Nodo {
    constructor(dato, siguiente) {
        this.dato = dato;
        this.siguiente = siguiente || null;
    }
    getDato() {
        return this.dato;
    }
    setDato(dato) {
        this.dato = dato;
    }
    getSiguiente() {
        return this.siguiente;
    }
    setSiguiente(siguiente) {
        this.siguiente = siguiente;
    }
    toString() {
        return `Nodo{dato=${this.dato}, siguiente=${this.siguiente}}`;
    }
}
