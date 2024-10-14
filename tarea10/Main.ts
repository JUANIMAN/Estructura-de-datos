import { NodoArbol } from './NodoArbol';

class Main {
    public static main(): void {
        // Primer arbol
        const raiz = new NodoArbol(10);
        raiz.setHijoIzquierdo(new NodoArbol(5));
        raiz.setHijoDerecho(new NodoArbol(15));
        raiz.getHijoIzquierdo()?.setHijoIzquierdo(new NodoArbol(1));
        raiz.getHijoDerecho()?.setHijoDerecho(new NodoArbol(25));
        console.log(raiz);

        console.log("\n---------------------\n");

        // Segundo arbol
        const raiz2 = new NodoArbol("Diego", new NodoArbol("Pedro", new NodoArbol("Susan"), new NodoArbol("Diana")), new NodoArbol("Mario"));
        console.log(raiz2);
        
    }
}

// Ejecutar el método main
Main.main();