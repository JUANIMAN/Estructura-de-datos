package Ordenamiento;
import java.util.Arrays;

public class MergeSort {
    public static int[] mergeSort(int[] data) {
        if (data.length > 1) {
            int mitad = data.length / 2;
            int[] izquierda = Arrays.copyOfRange(data, 0, mitad);
            int[] derecha = Arrays.copyOfRange(data, mitad, data.length);
            System.out.println(Arrays.toString(izquierda) + " --- " + Arrays.toString(derecha));
            
            mergeSort(izquierda);
            mergeSort(derecha);
            
            // merge
            int i = 0;  // índice para izquierda
            int d = 0;  // índice para derecha
            int k = 0;  // índice para el array original
            
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
        System.out.println("regreso de rec: " + Arrays.toString(data));
        return data;
    }
}