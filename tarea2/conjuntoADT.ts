export class ConjuntoADT<T> {
    private elementos: T[];

    constructor() {
        this.elementos = [];
    }

    longitud(): number {
        return this.elementos.length;
    }

    contiene(elemento: T): boolean {
        return this.elementos.includes(elemento);
    }

    agregar(elemento: T): void {
        if (!this.contiene(elemento)) {
            this.elementos.push(elemento);
        }
    }

    eliminar(elemento: T): void {
        const index = this.elementos.indexOf(elemento);
        if (index !== -1) {
            this.elementos.splice(index, 1);
        }
    }

    equals(otroConjunto: ConjuntoADT<T>): boolean {
        if (this.longitud() !== otroConjunto.longitud()) {
            return false;
        }
        return this.elementos.every(elemento => otroConjunto.contiene(elemento));
    }

    esSubConjunto(otroConjunto: ConjuntoADT<T>): boolean {
        return this.elementos.every(elemento => otroConjunto.contiene(elemento));
    }

    union(otroConjunto: ConjuntoADT<T>): ConjuntoADT<T> {
        const nuevoConjunto = new ConjuntoADT<T>();
        this.elementos.forEach(elemento => nuevoConjunto.agregar(elemento));
        otroConjunto.elementos.forEach(elemento => nuevoConjunto.agregar(elemento));
        return nuevoConjunto;
    }

    interseccion(otroConjunto: ConjuntoADT<T>): ConjuntoADT<T> {
        const nuevoConjunto = new ConjuntoADT<T>();
        this.elementos.forEach(elemento => {
            if (otroConjunto.contiene(elemento)) {
                nuevoConjunto.agregar(elemento);
            }
        });
        return nuevoConjunto;
    }

    diferencia(otroConjunto: ConjuntoADT<T>): ConjuntoADT<T> {
        const nuevoConjunto = new ConjuntoADT<T>();
        this.elementos.forEach(elemento => {
            if (!otroConjunto.contiene(elemento)) {
                nuevoConjunto.agregar(elemento);
            }
        });
        return nuevoConjunto;
    }
}
