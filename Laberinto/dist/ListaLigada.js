import { Nodo } from './Nodo.js';
export class ListaLigada {
    constructor() {
        this.head = null;
        this.longitud = 0;
    }
    estaVacia() {
        return this.head === null;
    }
    getLongitud() {
        return this.longitud;
    }
    getPrimero() {
        return this.head.getDato();
    }
    agregarAlInicio(dato) {
        this.head = new Nodo(dato, this.head);
        this.longitud++;
    }
    agregarAlFinal(dato) {
        const nuevoNodo = new Nodo(dato);
        if (this.head === null) {
            this.head = nuevoNodo;
        }
        else {
            let aux = this.head;
            while (aux.getSiguiente() !== null) {
                aux = aux.getSiguiente();
            }
            aux.setSiguiente(nuevoNodo);
        }
        this.longitud++;
    }
    agregarDespuesDe(referencia, valor) {
        let aux = this.head;
        while (aux !== null && aux.getDato() !== referencia) {
            aux = aux.getSiguiente();
        }
        if (aux !== null) {
            const nuevoNodo = new Nodo(valor, aux.getSiguiente());
            aux.setSiguiente(nuevoNodo);
            this.longitud++;
        }
    }
    eliminarElPrimero() {
        let primero = null;
        if (this.head !== null) {
            primero = this.head.getDato();
            this.head = this.head.getSiguiente();
            this.longitud--;
        }
        return primero;
    }
    eliminarElUltimo() {
        let aux = this.head;
        if (aux === null)
            return;
        while (aux.getSiguiente() !== null) {
            aux = aux.getSiguiente();
        }
        aux.setSiguiente(null);
        this.longitud--;
    }
    eliminar(posicion) {
        var _a;
        if (posicion < 0 || posicion >= this.longitud) {
            throw new Error("Posición fuera de rango");
        }
        if (posicion === 0) {
            this.eliminarElPrimero();
        }
        else {
            let aux = this.head;
            for (let i = 0; i < posicion - 1; i++) {
                aux = aux.getSiguiente();
            }
            aux.setSiguiente((_a = aux.getSiguiente()) === null || _a === void 0 ? void 0 : _a.getSiguiente());
            this.longitud--;
        }
    }
    obtener(posicion) {
        if (posicion < 0 || posicion >= this.longitud) {
            return null;
        }
        let aux = this.head;
        for (let i = 0; i < posicion; i++) {
            aux = aux.getSiguiente();
        }
        return aux.getDato();
    }
    buscar(valor) {
        let aux = this.head;
        let posicion = 0;
        while (aux !== null) {
            if (JSON.stringify(aux.getDato()) === JSON.stringify(valor)) {
                return posicion;
            }
            aux = aux.getSiguiente();
            posicion++;
        }
        return -1;
    }
    actualizar(aBuscar, valor) {
        let aux = this.head;
        while (aux !== null) {
            if (JSON.stringify(aux.getDato()) === JSON.stringify(aBuscar)) {
                aux.setDato(valor);
                return;
            }
            aux = aux.getSiguiente();
        }
    }
    transversal() {
        let aux = this.head;
        process.stdout.write("|");
        while (aux !== null) {
            process.stdout.write(`${aux.getDato()}| -> |`);
            aux = aux.getSiguiente();
        }
        console.log("null|");
    }
}
