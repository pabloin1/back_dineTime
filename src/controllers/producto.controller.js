import { prisma } from "../database/db.js";

export const obtenerProductos = async (req, res) => {
  try {
    return res.json({
      productos: await prisma.producto.findMany({ where: { estado: true } }),
    });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
};

export const obtenerProductoId = async (req, res) => {
  try {
    const producto = await prisma.producto.findFirst({
      where: { id: req.params.id },
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
    const { nombre, cantidad, ...rest } = req.body;

    // Verificar si el producto ya existe
    const productoExistente = await prisma.producto.findUnique({
      where: {
        nombre: nombre,
      },
    });

    if (productoExistente) {
      // Incrementar la cantidad del producto existente
      const productoActualizado = await prisma.producto.update({
        where: {
          id: productoExistente.id,
        },
        data: {
          cantidad: productoExistente.cantidad + cantidad,
        },
      });
      return res.json({
        msg: "Cantidad del producto actualizada",
        productoActualizado,
      });
    } else {
      // Crear un nuevo producto
      const nuevoProducto = await prisma.producto.create({
        data: {
          nombre,
          cantidad,
          ...rest,
        },
      });
      return res.json(nuevoProducto);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await prisma.producto.delete({
      where: { id: req.params.id },
    });
    return res.json({ producto });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const producto = await prisma.producto.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
