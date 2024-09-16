import { ColaConPrioridadAcotada } from "./ColaConPrioridadAcotada";
import { ClienteBanco, PerfilCliente } from "./ClienteBanco";

class SistemaBanco {
    private cola: ColaConPrioridadAcotada<ClienteBanco>;

    constructor() {
        this.cola = new ColaConPrioridadAcotada<ClienteBanco>(5);
    }

    public agregarCliente(cliente: ClienteBanco): void {
        this.cola.encolar(cliente, cliente.getPerfil());
        console.log(`${cliente.getNombre()} ha sido agregado a la cola.`);
    }

    public atenderCliente(): void {
        const cliente = this.cola.desencolar();
        if (cliente) {
            console.log(`Atendiendo a ${cliente.getNombre()}`);
            if (cliente.retirar(10000)) {
                console.log(`${cliente.getNombre()} ha retirado $10,000. Nuevo saldo: $${cliente.getSaldo()}`);
            } else {
                console.log(`${cliente.getNombre()} no tiene suficiente saldo para retirar $10,000.`);
            }
        } else {
            console.log("No hay más clientes en la cola.");
        }
    }

    public mostrarEstadoCola(): void {
        console.log("Estado actual de la cola:");
        console.log(this.cola.toString());
    }

    public static main(): void {
        console.log("Iniciando sistema de atencion a clientes(Banco)...");
        
        const sistema = new SistemaBanco();

        // 1. Lleguen 2 clientes nuevos
        sistema.agregarCliente(new ClienteBanco("Juan", PerfilCliente.ClienteNuevo, 15000));
        sistema.agregarCliente(new ClienteBanco("María", PerfilCliente.ClienteNuevo, 20000));

        // 2. Lleguen 3 personas que no son clientes
        sistema.agregarCliente(new ClienteBanco("Pedro", PerfilCliente.NoCliente));
        sistema.agregarCliente(new ClienteBanco("Ana", PerfilCliente.NoCliente));
        sistema.agregarCliente(new ClienteBanco("Luis", PerfilCliente.NoCliente));

        // 3. Llega una celebridad
        sistema.agregarCliente(new ClienteBanco("Famoso", PerfilCliente.Celebridad, 1000000));

        // 4. Imprime el estado de la cola con prioridad acotada
        sistema.mostrarEstadoCola();

        // 5. Se atienda al siguiente cliente, en donde retire $10,000 de su cuenta
        sistema.atenderCliente();

        // 6. Llegan dos clientes más, uno frecuente y un premium
        sistema.agregarCliente(new ClienteBanco("Carlos", PerfilCliente.ClienteFrecuente, 50000));
        sistema.agregarCliente(new ClienteBanco("Elena", PerfilCliente.ClientePremium, 100000));

        // 7. Atender al siguiente cliente
        sistema.atenderCliente();

        // 8. Imprime el estado de la cola con prioridad acotada
        sistema.mostrarEstadoCola();

        // 9. Atender todos los clientes restantes
        while (!sistema.cola.estaVacia()) {
            sistema.atenderCliente();
        }

        // 10. Imprime el estado de la cola con prioridad acotada
        sistema.mostrarEstadoCola();
    }
}

// Ejecutar el programa
SistemaBanco.main();