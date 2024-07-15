import { prisma } from '../database/db.js';

export const validarReservacion = async (req, res, next) => {
  const { dia, hora } = req.body;

  try {
    // Buscar una reservación con el mismo día y hora
    const reservacionExistente = await prisma.reservaciones.findFirst({
      where: {
        dia,
        hora
      }
    });

    if (reservacionExistente) {
      return res.status(400).json({
        msg: 'Ya existe una reservación para ese día y hora'
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: 'Hable con el administrador'
    });
  }
};
