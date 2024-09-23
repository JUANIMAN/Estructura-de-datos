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

    public static verificarBalanceo(texto: string): { balanceado: boolean, pasos: PilaADT<String> } {
        const pila = new PilaADT<string>();
        const pasos = new PilaADT<String>();

        for (let i = 0; i < texto.length; i++) {
            const caracter = texto[i];
            if (this.esApertura(caracter)) {
                pila.push(caracter);
                pasos.push(`Caracter ${i}: '${caracter}' - Añadido a la pila. Pila actual: ${pila}`)
            } else if (this.esCierre(caracter)) {
                if (pila.estaVacia()) {
                    pasos.push(`Caracter ${i}: '${caracter}' - Error: No se esperaba un '${caracter}'. Pila vacía.`);
                    return { balanceado: false, pasos };
                }
                const ultimaApertura = pila.pop();
                if (!this.coinciden(ultimaApertura!, caracter)) {
                    pasos.push(`Caracter ${i}: '${caracter}' - Error: Se esperaba un '${ultimaApertura}'. Pila actual: ${pila}`);
                    return { balanceado: false, pasos };
                }
                pasos.push(`Caracter ${i}: '${caracter}' - Coincide con '${ultimaApertura}'. Removido de la pila. Pila actual: ${pila}`);
            }
        }

        const balanceado = pila.estaVacia();
        pasos.push(`Verificación completada. Pila final: ${pila}. ${balanceado ? 'Balanceado' : 'No balanceado'}`);

        return { balanceado, pasos };
    }
}