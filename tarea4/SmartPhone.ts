export class SmartPhone {
    private marca: string;
    private modelo: string;
    private precio: number;

    constructor(marca: string, modelo: string, precio: number) {
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }

    public getMarca(): string {
        return this.marca;
    }

    public getModelo(): string {
        return this.modelo;
    }

    public getPrecio(): number {
        return this.precio;
    }

    public setPrecio(precio: number): void {
        this.precio = precio;
    }

    public toString(): string {
        return `${this.marca} ${this.modelo} ($${this.precio})`;
    }
}
