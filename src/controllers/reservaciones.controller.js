import { prisma } from "../database/db.js";

const handleError = (res, message) => {
  return (error) => {
    console.error(error);
    return res.status(500).json({ error: message });
  };
};

export const obtenerReservaciones = async (req, res) => {
  try {
    
    return res.json({ reservaciones:await prisma.reservaciones.findMany() });
  } catch (error) {
    handleError(res, "Error al obtener las reservaciones")(error);
  }
};

export const obtenerReservacionId = async (req, res) => {
  try {
    const reservacion = await prisma.reservaciones.findUnique({
      where: { id:req.params.id }
    });
    if (!reservacion) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }
    return res.json({ reservacion });
  } catch (error) {
    handleError(res, "Error al obtener la reservación")(error);
  }
};

export const crearReservacion = async (req, res) => {
  try {
    const nuevaReservacion = await prisma.reservaciones.create({
      data: req.body
    });
    return res.status(201).json({ reservacion: nuevaReservacion });
  } catch (error) {
    handleError(res, "Error al crear la reservación")(error);
  }
};

export const actualizarReservacion = async (req, res) => {

  try {
    const reservacionActualizada = await prisma.reservaciones.update({
      where: { id:req.params.id},
      data: req.body
    });
    return res.json({ reservacion: reservacionActualizada });
  } catch (error) {
    handleError(res, "Error al actualizar la reservación")(error);
  }
};

export const eliminarReservacion = async (req, res) => {
  try {
    await prisma.reservaciones.delete({
      where: { id:req.params.id }
    });
    return res.status(204).send();
  } catch (error) {
    handleError(res, "Error al eliminar la reservación")(error);
  }
};