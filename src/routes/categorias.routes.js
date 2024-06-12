import { Router } from "express";
import { prisma } from "../database/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    return res.json({ categorias: await prisma.categorias.findMany({
        include:{productos:true}
    }) });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener las categorías" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const categoria = await prisma.categorias.findFirst({
      where: { id: parseInt(req.params.id) },
    });
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    return res.json({ categoria });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener la categoría" });
  }
});

router.post("/", async (req, res) => {
  try {
    const categoria = await prisma.categorias.create({ data: req.body });
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear la categoría" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const categoria = await prisma.categorias.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar la categoría" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const categoria = await prisma.categorias.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.json({ categoria });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar la categoría" });
  }
});

export default router;
