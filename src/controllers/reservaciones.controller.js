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
    return res.status(500).json({msg:error.message});
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
    return res.status(500).json({msg:error.message});
  }
};

export const crearReservacion = async (req, res) => {
  try {
    const nuevaReservacion = await prisma.reservaciones.create({
      data: req.body
    });
    return res.status(201).json({ reservacion: nuevaReservacion });
  } catch (error) {
    return res.status(500).json({msg:error.message});
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
    return res.status(500).json({msg:error.message});
  }
};

export const eliminarReservacion = async (req, res) => {
  try {
    const reservacionEliminada = await prisma.reservaciones.delete({
      where: { id:req.params.id }
    });
    return res.json({
      msg:"reservacion cancelada",
      reservacionEliminada
    });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};