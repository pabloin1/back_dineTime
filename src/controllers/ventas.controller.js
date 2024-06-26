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
  try {
    const venta = await prisma.ventas.findUnique({ where: { id} });
    return venta ? res.json({ venta }) : res.status(404).json({ error: "Venta no encontrada" });
  } catch (error) {
    handleError(res, "Error al obtener la venta")(error);
  }
};

export const crearVenta = async (req, res) => {
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

  try {
    const ventaActualizada = await prisma.ventas.update({
      where: { id:req.params.id },
      data:req.body
    });
    return res.json({ venta: ventaActualizada });
  } catch (error) {
    handleError(res, "Error al actualizar la venta")(error);
  }
};

export const eliminarVenta = async (req, res) => {

  try {
    await prisma.ventas.delete({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (error) {
    handleError(res, "Error al eliminar la venta")(error);
  }
};
