function potencia(base: number, exponente: number): number {
    // Caso base 1: cualquier número elevado a 0 es 1
    if (exponente === 0) {
        return 1;
    }
    
    // Caso base 2: cualquier número elevado a 1 es el mismo número
    if (exponente === 1) {
        return base;
    }
    
    // Caso recursivo para exponentes positivos
    if (exponente > 0) {
        return base * potencia(base, exponente - 1);
    }
    
    // Caso recursivo para exponentes negativos
    return 1 / potencia(base, -exponente);
}

console.log(potencia(2, 3));   // Salida: 8
console.log(potencia(5, 2));   // Salida: 25
console.log(potencia(3, 0));   // Salida: 1
console.log(potencia(4, -2));  // Salida: 0.0625