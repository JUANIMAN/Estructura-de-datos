import { ConjuntoADT } from './conjuntoADT';

// Función para imprimir conjuntos
function imprimirConjunto<T>(nombre: string, conjunto: ConjuntoADT<T>): void {
    console.log(`${nombre}: [${conjunto['elementos'].join(', ')}]`);
}

// Función principal
function main() {
    // Creación de dos conjuntos
    const conjuntoA = new ConjuntoADT<number>();
    const conjuntoB = new ConjuntoADT<number>();

    // Agregación de elementos
    console.log("Agregando elementos a los conjuntos:");
    [1, 2, 3, 4, 5].forEach(num => conjuntoA.agregar(num));
    [4, 5, 6, 7, 8].forEach(num => conjuntoB.agregar(num));

    imprimirConjunto("Conjunto A", conjuntoA);
    imprimirConjunto("Conjunto B", conjuntoB);

    // Eliminación de un elemento
    console.log("\nEliminando el elemento 3 del Conjunto A:");
    conjuntoA.eliminar(3);
    imprimirConjunto("Conjunto A después de eliminar", conjuntoA);

    // Comprobación de pertenencia
    console.log("\nComprobación de pertenencia:");
    console.log(`¿El Conjunto A contiene 2? ${conjuntoA.contiene(2)}`);
    console.log(`¿El Conjunto B contiene 3? ${conjuntoB.contiene(3)}`);

    // Operación de unión
    console.log("\nUnión de conjuntos:");
    const union = conjuntoA.union(conjuntoB);
    imprimirConjunto("A ∪ B", union);

    // Operación de intersección
    console.log("\nIntersección de conjuntos:");
    const interseccion = conjuntoA.interseccion(conjuntoB);
    imprimirConjunto("A ∩ B", interseccion);

    // Operación de diferencia
    console.log("\nDiferencia de conjuntos:");
    const diferencia = conjuntoA.diferencia(conjuntoB);
    imprimirConjunto("A - B", diferencia);

    // Comprobación de igualdad
    console.log("\nComprobación de igualdad:");
    console.log(`¿A es igual a B? ${conjuntoA.equals(conjuntoB)}`);

    // Comprobación de subconjunto
    console.log("\nComprobación de subconjunto:");
    console.log(`¿A es subconjunto de B? ${conjuntoA.esSubConjunto(conjuntoB)}`);
}

// Ejecutar la función principal
main();
