function sumaDigitos(numero: number): number {
    // Caso base: si el número es menor que 10, retornamos el número
    if (numero < 10) {
        return numero;
    }
    
    // Caso recursivo: sumamos el último dígito con la suma de los dígitos restantes
    return (numero % 10) + sumaDigitos(Math.floor(numero / 10));
}

console.log(sumaDigitos(123));
console.log(sumaDigitos(54321));
