function mergeSort(arr) {
    // Caso base: si el array tiene 1 o menos elementos, ya está ordenado
    if (arr.length <= 1) {
        return arr;
    }

    // Encontrar el punto medio del array
    const medio = Math.floor(arr.length / 2);

    // Dividir el array en mitades izquierda y derecha
    const izquierda = arr.slice(0, medio);
    const derecha = arr.slice(medio);

    // Recursivamente ordenar ambas mitades
    return merge(
        mergeSort(izquierda),
        mergeSort(derecha)
    );
}

function merge(izquierda, derecha) {
    let resultado = [];
    let indiceIzquierda = 0;
    let indiceDerecha = 0;

    // Mientras tengamos elementos en ambos arrays
    while (indiceIzquierda < izquierda.length && indiceDerecha < derecha.length) {
        if (izquierda[indiceIzquierda] < derecha[indiceDerecha]) {
            resultado.push(izquierda[indiceIzquierda]);
            indiceIzquierda++;
        } else {
            resultado.push(derecha[indiceDerecha]);
            indiceDerecha++;
        }
    }

    // Si quedan elementos en la izquierda, agregarlos al resultado
    while (indiceIzquierda < izquierda.length) {
        resultado.push(izquierda[indiceIzquierda]);
        indiceIzquierda++;
    }

    // Si quedan elementos en la derecha, agregarlos al resultado
    while (indiceDerecha < derecha.length) {
        resultado.push(derecha[indiceDerecha]);
        indiceDerecha++;
    }

    return resultado;
}

// Ejemplo de uso
const arrayDesordenado = [64, 34, 25, 12, 22, 11, 90];
console.log('Array desordenado:', arrayDesordenado);

const arrayOrdenado = mergeSort(arrayDesordenado);
console.log('Array ordenado:', arrayOrdenado);

// Ejemplo con strings
const nombres = ['Zoe', 'Ana', 'Carlos', 'Beatriz', 'David'];
console.log('Nombres desordenados:', nombres);

const nombresOrdenados = mergeSort(nombres);
console.log('Nombres ordenados:', nombresOrdenados);
