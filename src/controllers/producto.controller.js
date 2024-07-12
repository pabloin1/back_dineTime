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

export const topProducto = async (req, res) => {
  try {
    const topProductos = await prisma.producto.findMany({
      orderBy: {
        puntaje: "desc",
      },
      take: 5,
    });
    res.json(topProductos);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Ocurrió un error al obtener los productos" });
  }
}

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
    const producto = await prisma.producto.create({
      data: req.body,
    });
    return res.json(producto);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await prisma.producto.update({
      where: { id: req.params.id },
      data: { estado: false },
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

export const modificarPuntaje = async (req, res) => {
  try {
    const producto = await prisma.producto.update({
      where: { id: req.params.id },
      data: { puntaje: req.body.puntaje }
    });

    if (!producto) {
      return res
        .status(500)
        .json({ msg: "Producto no existente en la base de datos" });
    }

    return res.json({ msg: "Puntaje incrementado", producto });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};