function CuentaRegresiva(n: number): void {
    if (n !== 0) {
        console.log(n);
        CuentaRegresiva(n - 1);
    }
}

class Main {
    public static main(): void {
        CuentaRegresiva(5);
    }
}

Main.main();
