package Ordenamiento;
import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        System.out.println(".-.-.-.-.-.- MERGE --.-.-.-.-");
        int[] info = {38, 27, 43, 3, 9, 82, 10, 19, 50, 61};
        System.out.println(Arrays.toString(MergeSort.mergeSort(info)));
    }
}