import { prisma } from "../database/db.js";
import { v4 as uuidv4 } from "uuid";

export const obtenerAdmins = async (req, res) => {
  try {
    return res.json({ admins: await prisma.admin.findMany() });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al obtener los administradores" });
  }
};

export const obtenerAdminId = async (req, res) => {
  try {
    const admin = await prisma.admin.findFirst({
      where: { id:req.params.id},
    });
    if (!admin)
      return res.status(404).json({ error: "Administrador no encontrado" });
    return res.json({ admin });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el administrador" });
  }
};

export const crearAdmin = async (req, res) => {
  const { nombre, apellido, correo, password } = req.body;
  const id = uuidv4();

  try {
    const admin = await prisma.admin.create({
      data: { id, nombre, apellido, correo, password },
    });
    return res.json(admin);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al crear el administrador", error });
  }
};

export const eliminarAdmin = async (req, res) => {
  try {
    const admin = await prisma.admin.delete({
      where: { id:req.params.id },
    });
    if (!admin)
      return res.status(404).json({ error: "Administrador no encontrado" });
    return res.json({ admin });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error al eliminar el administrador" });
  }
};

export const actualizarAdmin = async (req, res) => {
  try {
    const admin = await prisma.admin.update({
      where: { id:req.params.id },
      data: req.body,
    });
    return res.json(admin);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "El correo ya está en uso" });
    }
    return res
      .status(500)
      .json({ error: "Error al actualizar el administrador" });
  }
};
