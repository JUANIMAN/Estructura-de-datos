import { DoubleLinkedList } from "./DoubleLinkedList";

function main() {
    const lista = new DoubleLinkedList<number>();

    // Agregar al inicio el 50
    lista.agregarAlInicio(50);

    // Agregar al final el 60, 65, 70, 80 y 90
    lista.agregarAlFinal(60);
    lista.agregarAlFinal(65);
    lista.agregarAlFinal(70);
    lista.agregarAlFinal(80);
    lista.agregarAlFinal(90);

    // Imprimir el contenido
    console.log("Contenido inicial:");
    lista.transversal();

    // Eliminar el de la posición 2
    lista.eliminar(2);

    // Volver a imprimir el contenido
    console.log("\nContenido después de eliminar la posición 2:");
    lista.transversal();

    // Actualizar el cuarto elemento a 88
    lista.actualizar(80, 88);

    // Volver a imprimir el contenido
    console.log("\nContenido después de actualizar el cuarto elemento a 88:");
    lista.transversal();

    // Buscar el valor 80 e imprimir en qué posición se encuentra
    let posicion = lista.buscar(80);
    console.log(`\nEl valor 80 se encuentra en la posición: ${posicion}`);

    // Buscar el valor 88 e imprimir en qué posición se encuentra
    posicion = lista.buscar(88);
    console.log(`\nEl valor 88 se encuentra en la posición: ${posicion}`);
}

main();