import { ListaLigada } from "./ListaLigada.js";
export class PilaADT {
    constructor() {
        this.datos = new ListaLigada();
    }
    estaVacia() {
        return this.datos.getLongitud() === 0;
    }
    longitud() {
        return this.datos.getLongitud();
    }
    peek() {
        return this.datos.getPrimero();
    }
    push(elemento) {
        this.datos.agregarAlInicio(elemento);
    }
    pop() {
        return this.datos.eliminarElPrimero();
    }
    toString() {
        if (this.estaVacia()) {
            return "PilaADT: [ ]";
        }
        let result = "PilaADT: [ ";
        let current = this.datos.getPrimero();
        let index = 0;
        while (current !== null) {
            result += current === null || current === void 0 ? void 0 : current.toString();
            if (index === 0) {
                result += " (Tope)";
            }
            if (index === this.longitud() - 1) {
                result += " (Base)";
            }
            if (index < this.longitud() - 1) {
                result += " | ";
            }
            current = this.datos.obtener(index + 1);
            index++;
        }
        result += " ]";
        return result;
    }
}
