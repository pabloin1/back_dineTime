import { prisma } from "../database/db.js";

export const obtenerMesas = async (req, res) => {
  try {
    return res.json({ mesas: await prisma.mesas.findMany() });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las mesas" });
  }
};

export const obtenerMesasId = async (req, res) => {
  try {
    const mesa = await prisma.mesas.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada" });
    }
    return res.json({ mesa });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la mesa" });
  }
};

export const crearMesa = async (req, res) => {
  try {
    const nuevaMesa = await prisma.mesas.create({
      data: req.body,
    });
    return res.status(201).json({ mesa: nuevaMesa });
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la mesa" });
  }
};

export const actualizarMesa = async (req, res) => {
  try {
    const mesaActualizada = await prisma.mesas.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    return res.json({ mesa: mesaActualizada });
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar la mesa" });
  }
};

export const eliminarMesa = async (req, res) => {
  try {
    await prisma.mesas.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la mesa" });
  }
};
