import { Nodo } from './nodo';

function main() {
    const head = new Nodo<number>();
    head.setDato(10);

    head.setSiguiente(new Nodo(20,));

    const head2 = new Nodo<number>(10, new Nodo(20, new Nodo(40, new Nodo(50))));
    console.log(head.getSiguiente()?.getDato());
    console.log(head2.getSiguiente()?.getSiguiente()?.getSiguiente()?.getDato());
    console.log(head2.getSiguiente()?.getSiguiente()?.getDato());
    head2.getSiguiente()?.setDato(30);
    console.log(head2.getSiguiente()?.getDato());

    head2.getSiguiente()?.setSiguiente(new Nodo(35, head2.getSiguiente()?.getSiguiente()!));
    console.log(head2.getSiguiente()?.getSiguiente()?.getSiguiente()!.getDato());

    let aux: Nodo<number> | null = head2;
    process.stdout.write("|");
    while (aux !== null) {
        process.stdout.write(`${aux.getDato()}| -> |`);
        aux = aux.getSiguiente();
    }
    console.log("null|");
    console.log("-----------------------");
}

function printList(head: Nodo<number>): void {
    let aux: Nodo<number> | null = head;
    process.stdout.write("|");
    while (aux !== null) {
        process.stdout.write(`${aux.getDato()}| -> |`);
        aux = aux.getSiguiente();
    }
    console.log("null|");
}

function practicas() {
    // Crear la estructura de la imagen anexa
    let head = new Nodo<number>(100);
    head.setSiguiente(new Nodo(200, new Nodo(300, new Nodo(400, new Nodo(600)))));

    // Imprimir todo
    printList(head);

    // Cambiar el valor del 3er nodo de 300 a 333
    head.getSiguiente()?.getSiguiente()?.setDato(333);

    // Imprimir todo nuevamente
    console.log("\nDespués de cambiar 300 a 333:");
    printList(head);

    // Insertar un nodo 700 después del nodo 600 (Al final)
    let aux: Nodo<number> | null = head;
    while (aux.getSiguiente() !== null) {
        aux = aux.getSiguiente()!;
    }
    aux.setSiguiente(new Nodo(700));

    // Imprimir todo nuevamente
    console.log("\nDespués de insertar 700 al final:");
    printList(head);

    // Insertar un nodo con valor 50 al principio (antes del nodo 100)
    head = new Nodo(50, head);

    // Imprimir todo nuevamente
    console.log("\nDespués de insertar 50 al principio:");
    printList(head);
}

// Ejecutar la función principal
main();

// Ejecutar las funciones de prácticas
practicas();