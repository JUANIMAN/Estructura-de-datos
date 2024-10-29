function mergeSort(data: number[]): number[] {
    if (data.length > 1) {
        const mitad: number = Math.floor(data.length / 2);
        const izquierda: number[] = data.slice(0, mitad);
        const derecha: number[] = data.slice(mitad);
        
        console.log(`${izquierda} --- ${derecha}`);
        
        mergeSort(izquierda);
        mergeSort(derecha);
        
        // merge
        let i: number = 0;
        let d: number = 0;
        let k: number = 0;
        
        while (i < izquierda.length && d < derecha.length) {
            if (izquierda[i] < derecha[d]) {
                data[k] = izquierda[i];
                i++;
            } else {
                data[k] = derecha[d];
                d++;
            }
            k++;
        }
        
        // acomodar los restantes
        while (i < izquierda.length) {
            data[k] = izquierda[i];
            i++;
            k++;
        }
        
        while (d < derecha.length) {
            data[k] = derecha[d];
            d++;
            k++;
        }
    }
    
    console.log(`regreso de rec: ${data}`);
    return data;
}

// Ejemplo de uso
console.log(".-.-.-.-.-.- MERGE --.-.-.-.-");
const info: number[] = [38, 27, 43, 3, 9, 82, 10, 19, 50, 61];
console.log(mergeSort(info));