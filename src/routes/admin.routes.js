import { Router } from "express";
import { prisma } from "../database/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    return res.json({ admins: await prisma.admin.findMany() });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los administradores" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const admin = await prisma.admin.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    if (!admin)
      return res.status(404).json({ error: "Administrador no encontrado" });
    return res.json({ admin });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el administrador" });
  }
});

router.post("/", async (req, res) => {
  try {
    const admin = await prisma.admin.create({
      data: req.body,
    });
    return res.json(admin);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "El correo ya está en uso" });
    }
    return res.status(500).json({ error: "Error al crear el administrador" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const admin = await prisma.admin.delete({
      where: { id: parseInt(req.params.id) },
    });
    if (!admin)
      return res.status(404).json({ error: "Administrador no encontrado" });
    return res.json({ admin });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el administrador" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const admin = await prisma.admin.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    return res.json(admin);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "El correo ya está en uso" });
    }
    return res.status(500).json({ error: "Error al actualizar el administrador" });
  }
});

export default router;
