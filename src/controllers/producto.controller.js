import { prisma } from "../database/db.js";

export const obtenerProductos = async (req, res) => {
  try {
    return res.json({ productos: await prisma.producto.findMany() });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const obtenerProductoId = async (req, res) => {
  try {
    const producto = await prisma.producto.findFirst({
      where: { id: parseInt(req.params.id) },
      include: {
        categoria: true,
      },
    });
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });
    return res.json({ producto });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const crearProducto = async (req, res) => {
  try {
    const producto = await prisma.producto.create({
      data: req.body,
    });
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el producto" });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await prisma.producto.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.json({ producto });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el producto" });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const producto = await prisma.producto.update({
      where: { id:req.params.id },
      data: req.body,
    });
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};
