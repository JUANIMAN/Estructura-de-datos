package fes.aragon;

public class Producto implements Comparable<Producto> {
    public String name;
    public int idP;
    public double precio;
    public int cantidad;

    // Constructor
    public Producto(String name, int idP, double precio, int cantidad) {
        this.name = name;
        this.idP = idP;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    public String getName() {
        return name;
    }

    public int getIdP() {
        return idP;
    }

    public double getPrecio() {
        return precio;
    }

    public int getCantidad() {
        return cantidad;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setIdP(int idP) {
        this.idP = idP;
    }

    public void setPrecio(double precio) {
        this.precio = precio;
    }

    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }

    @Override
    public int compareTo(Producto o) {
        // Comparamos los códigos de producto (idP)
        return Integer.compare(this.idP, o.idP);
    }

    @Override
    public String toString() {
        return String.format("%-4d | %-20s | $%-10.2f | %d",
                idP, name, precio, cantidad);
    }
}
