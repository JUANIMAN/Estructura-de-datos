import { colaADT } from "./ColaADT";
import { Paciente } from "./Paciente";

class ClinicaMedica {
    private cola: colaADT<Paciente> = new colaADT<Paciente>();

    public agregarPaciente(paciente: Paciente): void {
        this.cola.encolar(paciente);
        console.log(`Paciente ${paciente.getNombre()} agregado a la cola.`);
    }

    public atenderPaciente(): void {
        const paciente = this.cola.desencolar();
        if (paciente) {
            console.log(`Atendiendo al paciente ${paciente.getNombre()}.`);
        } else {
            console.log("No hay pacientes en la cola.");
        }
    }

    public mostrarCola(): void {
        console.log("Estado actual de la cola:");
        console.log(this.cola.toString());
    }

    public mostrarSiguiente(): void {
        const siguiente = this.cola.frente();
        if (siguiente) {
            console.log(`El siguiente paciente es: ${siguiente.getNombre()}`);
        } else {
            console.log("No hay pacientes en la cola.");
        }
    }

    public static main(): void {
        console.log("Iniciando sistema de gestión de pacientes...");

        const clinica = new ClinicaMedica();

        // 1. Agregar 3 pacientes a la cola
        clinica.agregarPaciente(new Paciente("Juan", 1));
        clinica.agregarPaciente(new Paciente("María", 2));
        clinica.agregarPaciente(new Paciente("Pedro", 3));

        // 2. Mostrar el contenido de la cola
        clinica.mostrarCola();

        // 3. Mostrar el paciente que sigue (sin sacarlo de la cola)
        clinica.mostrarSiguiente();

        // 4. Atender al siguiente
        clinica.atenderPaciente();

        // 5. Mostrar el contenido de la cola
        clinica.mostrarCola();

        // Meter 2 nuevos pacientes
        clinica.agregarPaciente(new Paciente("Ana", 4));
        clinica.agregarPaciente(new Paciente("Luis", 5));

        // 4. Atender al siguiente
        clinica.atenderPaciente();

        // 5. Mostrar el contenido de la cola
        clinica.mostrarCola();

        // Verificar si la cola está vacía
        console.log(`¿La cola está vacía? ${clinica.cola.estaVacia() ? "Sí" : "No"}`);

    }
}

// Ejecutar el programa
ClinicaMedica.main();
