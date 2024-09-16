export enum PerfilCliente {
    NoCliente = 5,
    ClienteNuevo = 4,
    ClienteFrecuente = 3,
    ClientePremium = 2,
    Celebridad = 1
}

export class ClienteBanco {
    private nombre: string;
    private perfil: PerfilCliente;
    private saldo: number;

    constructor(nombre: string, perfil: PerfilCliente, saldo: number = 0) {
        this.nombre = nombre;
        this.perfil = perfil;
        this.saldo = saldo;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPerfil(): PerfilCliente {
        return this.perfil;
    }

    public getSaldo(): number {
        return this.saldo;
    }

    public retirar(monto: number): boolean {
        if (this.saldo >= monto) {
            this.saldo -= monto;
            return true;
        }
        return false;
    }

    public toString(): string {
        return `ClienteBanco{nombre: "${this.nombre}", perfil: ${PerfilCliente[this.perfil]}, saldo: $${this.saldo}}`;
    }
}