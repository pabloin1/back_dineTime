import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = Router();

// Crear Cuenta
router.post('/', async (req, res) => {
  try {
    const cuenta = await prisma.cuenta.create({
      data: req.body,
    });
    res.status(201).json(cuenta);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Obtener todas las Cuentas
router.get('/', async (req, res) => {
  try {
    const cuentas = await prisma.cuenta.findMany();
    res.status(200).json(cuentas);
  } catch (error) {
    res.status(400).json({ error});
  }
});

// Obtener una Cuenta por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cuenta = await prisma.cuenta.findUnique({ where: { id } });
    if (cuenta) {
      res.status(200).json(cuenta);
    } else {
      res.status(404).json({ error: 'Cuenta no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error});
  }
});

// Actualizar Cuenta
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const cuenta = await prisma.cuenta.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json(cuenta);
  } catch (error) {
    res.status(400).json({ error});
  }
});

// Eliminar Cuenta
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.cuenta.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
});

export default router;
