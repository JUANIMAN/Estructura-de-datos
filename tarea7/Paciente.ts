export class Paciente {
    private nombre: string;
    private id: number;

    constructor(nombre: string, id: number) {
        this.nombre = nombre;
        this.id = id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getId(): number {
        return this.id;
    }

    public toString(): string {
        return `Paciente {nombre: "${this.nombre}", id: ${this.id}}`;
    }
}