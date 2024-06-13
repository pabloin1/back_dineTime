import { prisma } from "../database/db.js";

const handleError = (res, message) => (error) => {
  console.error(error);
  return res.status(500).json({ error: message });
};

export const obtenerVentas = async (req, res) => {
  try {
    return res.json({ ventas: await prisma.ventas.findMany() });
  } catch (error) {
    handleError(res, "Error al obtener las ventas")(error);
  }
};

export const obtenerVentaId = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const venta = await prisma.ventas.findUnique({ where: { id: parseInt(id, 10) } });
    return venta ? res.json({ venta }) : res.status(404).json({ error: "Venta no encontrada" });
  } catch (error) {
    handleError(res, "Error al obtener la venta")(error);
  }
};

export const crearVenta = async (req, res) => {
  
  if (!req.body) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  try {
    const nuevaVenta = await prisma.ventas.create({
      data: req.body
    });
    return res.status(201).json({ venta: nuevaVenta });
  } catch (error) {
    handleError(res, "Error al crear la venta")(error);
  }
};

export const actualizarVenta = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id) || req.body) {
    return res.status(400).json({ error: "ID inválido o campos incompletos" });
  }
  try {
    const ventaActualizada = await prisma.ventas.update({
      where: { id: parseInt(id) },
      data:req.body
    });
    return res.json({ venta: ventaActualizada });
  } catch (error) {
    handleError(res, "Error al actualizar la venta")(error);
  }
};

export const eliminarVenta = async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    await prisma.ventas.delete({ where: { id: parseInt(id, 10) } });
    return res.status(204).send();
  } catch (error) {
    handleError(res, "Error al eliminar la venta")(error);
  }
};
