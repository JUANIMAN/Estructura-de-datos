import { PilaADT } from "./pilaADT";

function sacarPosicionMediaRecursivo(pila: PilaADT<number>, posicionMedia: number, posicionActual: number): number | null {
    if (pila.estaVacia()) {
        throw new Error("La pila está vacía");
    }

    const elemento = pila.pop();

    if (posicionActual === posicionMedia) {
        return elemento;
    }

    const resultado = sacarPosicionMediaRecursivo(pila, posicionMedia, posicionActual + 1);

    pila.push(elemento!);

    return resultado;
}

const pila = new PilaADT<number>();
[1, 2, 3, 4, 5, 6, 7].forEach(num => pila.push(num));

console.log("Pila original:", pila.toString());
const valorMedio = sacarPosicionMediaRecursivo(pila, Math.floor((pila.longitud() / 2)), 0);
console.log("Valor en la posición media:", valorMedio);
console.log("Pila después de la operación:", pila.toString());