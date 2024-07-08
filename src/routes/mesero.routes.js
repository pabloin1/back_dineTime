import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Crear Mesero
router.post('/', async (req, res) => {
  try {
    const mesero = await prisma.mesero.create({
      data: req.body,
    });
    res.status(201).json(mesero);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Obtener todos los Meseros
router.get('/', async (req, res) => {
  try {
    const meseros = await prisma.mesero.findMany();
    res.status(200).json(meseros);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Obtener un Mesero por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mesero = await prisma.mesero.findUnique({ where: { id } });
    if (mesero) {
      res.status(200).json(mesero);
    } else {
      res.status(404).json({ error: 'Mesero no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Actualizar Mesero
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mesero = await prisma.mesero.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(mesero);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Eliminar Mesero
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.mesero.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error});
  }
});

export default router;
