import { prisma } from "../database/db.js";

export const obtenerVentas = async (req, res) => {
  try {
    return res.json({ ventas: await prisma.ventas.findMany() });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las ventas" });
  }
};

export const obtenerVentaId = async (req, res) => {};

export const crearVenta = async (req, res) => {};

export const actualizarVenta = async (req, res) => {};

export const eliminarVenta = async (req, res) => {};