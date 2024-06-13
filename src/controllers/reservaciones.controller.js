import { prisma } from "../database/db.js";

export const obtenerReservaciones = async (req, res) => {
  try {
    return res.json({ admins: await prisma.reservaciones.findMany() });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener los administradores" });
  }
};

export const obtenerReservacionId = async (req, res) => {};

export const crearReservacion = async (req, res) => {};

export const actualizarReservacion = async (req, res) => {};

export const eliminarReservacion = async (req, res) => {};
