import { Router } from "express";
import { prisma } from "../database/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    return res.json({ productos: await prisma.producto.findMany() });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener los productos" });
  }
});

router.get("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).json({ error: "ID inválido" });

  try {
    const producto = await prisma.producto.findFirst({
      where: { id: parseInt(req.params.id) },
      include:{
        categoria:true
      }
    });
    if (!producto)
      return res.status(404).json({ error: "Producto no encontrado" });
    return res.json({ producto });
  } catch (error) {
    return res.status(500).json({ error: "Error al obtener el producto" });
  }
});

router.post("/", async (req, res) => {
  try {
    const producto = await prisma.producto.create({
      data: req.body,
    });
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ error: "Error al crear el producto" });
  }
});

router.delete("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).json({ error: "ID inválido" });

  try {
    const producto = await prisma.producto.delete({
      where: { id: parseInt(req.params.id) },
    });
    return res.json({ producto });
  } catch (error) {
    return res.status(500).json({ error: "Error al eliminar el producto" });
  }
});

router.put("/:id", async (req, res) => {
  if (isNaN(parseInt(req.params.id)))
    return res.status(400).json({ error: "ID inválido" });

  try {
    const producto = await prisma.producto.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
});

export default router;
