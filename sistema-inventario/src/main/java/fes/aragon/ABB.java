package fes.aragon;

import java.util.List;

public class ABB<T extends Comparable<T>> {
    private class Nodo {
        T dato;
        Nodo izquierdo;
        Nodo derecho;

        public Nodo(T dato) {
            this.dato = dato;
            this.izquierdo = null;
            this.derecho = null;
        }
    }

    private Nodo raiz;

    public ABB() {
        this.raiz = null;
    }

    public void insertar(T elemento) {
        raiz = insertarRec(raiz, elemento);
    }

    private Nodo insertarRec(Nodo nodo, T elemento) {
        if (nodo == null) {
            return new Nodo(elemento);
        }

        int comparacion = elemento.compareTo(nodo.dato);
        if (comparacion < 0) {
            nodo.izquierdo = insertarRec(nodo.izquierdo, elemento);
        } else if (comparacion > 0) {
            nodo.derecho = insertarRec(nodo.derecho, elemento);
        }

        return nodo;
    }

    public T buscar(T elemento) {
        Nodo resultado = buscarRec(raiz, elemento);
        return resultado == null ? null : resultado.dato;
    }

    private Nodo buscarRec(Nodo nodo, T elemento) {
        if (nodo == null || elemento.compareTo(nodo.dato) == 0) {
            return nodo;
        }

        if (elemento.compareTo(nodo.dato) < 0) {
            return buscarRec(nodo.izquierdo, elemento);
        }

        return buscarRec(nodo.derecho, elemento);
    }

    public void eliminar(T elemento) {
        raiz = eliminarRec(raiz, elemento);
    }

    private Nodo eliminarRec(Nodo nodo, T elemento) {
        if (nodo == null) {
            return null;
        }

        int comparacion = elemento.compareTo(nodo.dato);
        if (comparacion < 0) {
            nodo.izquierdo = eliminarRec(nodo.izquierdo, elemento);
        } else if (comparacion > 0) {
            nodo.derecho = eliminarRec(nodo.derecho, elemento);
        } else {
            // Caso 1: Nodo hoja o con un solo hijo
            if (nodo.izquierdo == null) {
                return nodo.derecho;
            } else if (nodo.derecho == null) {
                return nodo.izquierdo;
            }

            // Caso 2: Nodo con dos hijos
            // Encontrar el sucesor inorden (mínimo valor en subárbol derecho)
            nodo.dato = encontrarMinimo(nodo.derecho);
            // Eliminar el sucesor inorden
            nodo.derecho = eliminarRec(nodo.derecho, nodo.dato);
        }

        return nodo;
    }

    private T encontrarMinimo(Nodo nodo) {
        T minimo = nodo.dato;
        while (nodo.izquierdo != null) {
            minimo = nodo.izquierdo.dato;
            nodo = nodo.izquierdo;
        }
        return minimo;
    }

    // Recorrido InOrden
    public void inOrden() {
        inOrdenRec(raiz);
    }

    private void inOrdenRec(Nodo nodo) {
        if (nodo != null) {
            inOrdenRec(nodo.izquierdo);
            System.out.println(nodo.dato.toString());
            inOrdenRec(nodo.derecho);
        }
    }

    public void inOrdenToList(List<T> lista) {
        inOrdenToListRec(raiz, lista);
    }

    private void inOrdenToListRec(Nodo nodo, List<T> lista) {
        if (nodo != null) {
            inOrdenToListRec(nodo.izquierdo, lista);
            lista.add(nodo.dato);
            inOrdenToListRec(nodo.derecho, lista);
        }
    }

    // Recorrido PreOrden
    public void preOrden() {
        preOrdenRec(raiz);
        System.out.println();
    }

    private void preOrdenRec(Nodo nodo) {
        if (nodo != null) {
            System.out.print(nodo.dato + " ");
            preOrdenRec(nodo.izquierdo);
            preOrdenRec(nodo.derecho);
        }
    }

    // Recorrido PostOrden
    public void postOrden() {
        postOrdenRec(raiz);
        System.out.println();
    }

    private void postOrdenRec(Nodo nodo) {
        if (nodo != null) {
            postOrdenRec(nodo.izquierdo);
            postOrdenRec(nodo.derecho);
            System.out.print(nodo.dato + " ");
        }
    }
}
