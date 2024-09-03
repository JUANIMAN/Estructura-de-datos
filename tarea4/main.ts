import { ListaLigada } from './ListaLigada';
import { SmartPhone } from './SmartPhone';

class Main {
    public static main(): void {
        // Crear una lista de SmartPhones
        const listaSmartPhones = new ListaLigada<SmartPhone>();

        // Agregar 5 SmartPhones
        listaSmartPhones.agregarAlFinal(new SmartPhone("Apple", "iPhone 12", 999));
        listaSmartPhones.agregarAlFinal(new SmartPhone("Samsung", "Galaxy S21", 899));
        listaSmartPhones.agregarAlFinal(new SmartPhone("Google", "Pixel 5", 699));
        listaSmartPhones.agregarAlFinal(new SmartPhone("OnePlus", "9 Pro", 969));
        listaSmartPhones.agregarAlFinal(new SmartPhone("Xiaomi", "Mi 11", 749));

        // Imprimir el contenido
        console.log("Lista original:");
        listaSmartPhones.transversal();

        // Eliminar el de la posición 2
        listaSmartPhones.eliminar(2);

        // Volver a imprimir el contenido
        console.log("\nLista después de eliminar el elemento en la posición 2:");
        listaSmartPhones.transversal();

        // Actualizar el segundo elemento
        const aBuscar = new SmartPhone("Samsung", "Galaxy S21", 899);
        const nuevoSmartPhone = new SmartPhone("Samsung", "Galaxy S21 Ultra", 1199);
        listaSmartPhones.actualizar(aBuscar, nuevoSmartPhone);

        // Volver a imprimir el contenido
        console.log("\nLista después de actualizar el segundo elemento:");
        listaSmartPhones.transversal();

        // Agregar un elemento al inicio y otro diferente al final
        listaSmartPhones.agregarAlInicio(new SmartPhone("Huawei", "P40 Pro", 799));
        listaSmartPhones.agregarAlFinal(new SmartPhone("Sony", "Xperia 1 III", 1299));

        // Volver a imprimir el contenido
        console.log("\nLista después de agregar al inicio y al final:");
        listaSmartPhones.transversal();

        // Eliminar el primero
        listaSmartPhones.eliminarElPrimero();

        // Volver a imprimir el contenido
        console.log("\nLista final después de eliminar el primer elemento:");
        listaSmartPhones.transversal();
    }
}

// Ejecutar el método main
Main.main();