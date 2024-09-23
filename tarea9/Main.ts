import { VerificadorBalanceo } from "./VerificadorBalanceo.js";
import * as fs from 'fs/promises';
import * as path from 'path';

async function leerArchivo(rutaArchivo: string): Promise<string> {
    try {
        const contenido = await fs.readFile(rutaArchivo, 'utf-8');
        return contenido;
    } catch (error) {
        console.error(`Error al leer el archivo: ${error}`);
        return '';
    }
}

async function main() {
    const rutaArchivo = path.join(process.cwd(), 'programa_suma.c');
    
    try {
        const contenidoPrograma = await leerArchivo(rutaArchivo);
        
        if (contenidoPrograma) {
            const { balanceado, pasos } = VerificadorBalanceo.verificarBalanceo(contenidoPrograma);
            console.log(`Archivo: "${rutaArchivo}"`);
            console.log("Pasos de verificación:");
            console.log(pasos.toString())
            console.log(`\nResultado final: ${balanceado ? 'Balanceado' : 'No balanceado'}`);
        } else {
            console.log("No se pudo leer el contenido del archivo.");
        }
    } catch (error) {
        console.error(`Ocurrió un error: ${error}`);
    }
}

main();