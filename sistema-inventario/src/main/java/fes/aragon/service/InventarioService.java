package fes.aragon.service;

import fes.aragon.ABB;
import fes.aragon.Producto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InventarioService {
    private final ABB<Producto> inventario;
    private final List<Producto> listaProductos;

    public InventarioService() {
        this.inventario = new ABB<>();
        this.listaProductos = new ArrayList<>();
    }

    public void agregarProducto(Producto producto) {
        inventario.insertar(producto);
        actualizarLista();
    }

    public void eliminarProducto(int id) {
        Producto producto = new Producto("", id, 0, 0);
        inventario.eliminar(producto);
        actualizarLista();
    }

    public Producto buscarProducto(int id) {
        return inventario.buscar(new Producto("", id, 0, 0));
    }

    public List<Producto> obtenerTodosLosProductos() {
        actualizarLista();
        return listaProductos;
    }

    private void actualizarLista() {
        listaProductos.clear();
        inventario.inOrdenToList(listaProductos);
    }
}