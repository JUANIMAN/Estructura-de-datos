#include <stdio.h>

// Función para sumar dos números enteros
int suma(int a, int b) {
    return a + b;
}

// Función principal
int main() {
    int num1 = 5;
    int num2 = 3;
    int resultado;

    // Llamada a la función suma
    resultado = suma(num1, num2);

    // Imprimir el resultado
    printf("La suma de %d y %d es: %d\n", num1, num2, resultado);

    // Probar la función con otros valores
    printf("La suma de %d y %d es: %d\n", 10, 20, suma(10, 20));

    return 0;