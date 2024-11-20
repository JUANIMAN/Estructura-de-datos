package fes.aragon.controller;

import fes.aragon.service.InventarioService;
import fes.aragon.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/inventario")
public class InventarioController {

    @Autowired
    private InventarioService inventarioService;

    @GetMapping
    public String listarProductos(Model model) {
        model.addAttribute("productos", inventarioService.obtenerTodosLosProductos());
        return "inventario/lista";
    }

    @GetMapping("/nuevo")
    public String mostrarFormularioNuevo(Model model) {
        model.addAttribute("producto", new Producto("", 0, 0, 0));
        return "inventario/form";
    }

    @PostMapping("/guardar")
    public String guardarProducto(@ModelAttribute Producto producto, RedirectAttributes redirectAttributes) {
        try {
            if (inventarioService.buscarProducto(producto.getIdP()) != null) {
                redirectAttributes.addFlashAttribute("error", "Ya existe un producto con ese ID");
                return "redirect:/inventario/nuevo";
            }
            inventarioService.agregarProducto(producto);
            redirectAttributes.addFlashAttribute("mensaje", "Producto guardado exitosamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al guardar el producto: " + e.getMessage());
        }
        return "redirect:/inventario";
    }

    @GetMapping("/eliminar/{id}")
    public String eliminarProducto(@PathVariable int id, RedirectAttributes redirectAttributes) {
        try {
            inventarioService.eliminarProducto(id);
            redirectAttributes.addFlashAttribute("mensaje", "Producto eliminado exitosamente");
        } catch (Exception e) {
            redirectAttributes.addFlashAttribute("error", "Error al eliminar el producto: " + e.getMessage());
        }
        return "redirect:/inventario";
    }

    @GetMapping("/buscar")
    public String buscarProducto(@RequestParam(required = false) Integer id, Model model) {
        if (id != null) {
            Producto producto = inventarioService.buscarProducto(id);
            if (producto != null) {
                model.addAttribute("productoEncontrado", producto);
            } else {
                model.addAttribute("error", "No se encontró el producto con ID: " + id);
            }
        }
        return "inventario/buscar";
    }
}
