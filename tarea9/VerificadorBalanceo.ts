import { PilaADT } from "./pilaADT.js";

export class VerificadorBalanceo {
    private static esApertura(caracter: string): boolean {
        return caracter === '(' || caracter === '{';
    }

    private static esCierre(caracter: string): boolean {
        return caracter === ')' || caracter === '}';
    }

    private static coinciden(apertura: string, cierre: string): boolean {
        return (apertura === '(' && cierre === ')') || (apertura === '{' && cierre === '}');
    }

    private static obtenerEsperado(apertura: string): string {
        let esperado = '';
        switch (apertura) {
            case '(': esperado = ')'; break;
            case '{': esperado = '}'; break;
        }
        return esperado;
    }

    public static verificarBalanceo(texto: string): boolean  {
        const pila = new PilaADT<string>();

        for (let i = 0; i < texto.length; i++) {
            const caracter = texto[i];
            if (this.esApertura(caracter)) {
                pila.push(caracter);
                console.log(`Caracter ${i}: '${caracter}' - Añadido a la pila. Pila actual: ${pila}`);
            } else if (this.esCierre(caracter)) {
                if (pila.estaVacia()) {
                    console.log(`Caracter ${i}: '${caracter}' - Error: No se esperaba un '${caracter}'. Pila vacía.`);
                    return false;
                }
                const ultimaApertura = pila.pop();
                if (!this.coinciden(ultimaApertura!, caracter)) {
                    console.log(`Caracter ${i}: '${caracter}' - Error: No coincide con la última apertura '${ultimaApertura}'. ${pila}`);
                    return false;
                }
                console.log(`Caracter ${i}: '${caracter}' - Coincide con '${ultimaApertura}'. Removido de la pila. Pila actual: ${pila}`);
            }
        }

        if (!pila.estaVacia()) {
            const esperado = this.obtenerEsperado(pila.peek()!);
            console.log(`Error: Se esperaba un '${esperado}'`);
            return false
        }

        return pila.estaVacia();
    }
}