import { prisma } from '../database/db.js';

export const createCuenta = async (req, res) => {
  try {
    const cuenta = await prisma.cuenta.create({
      data: req.body,
    });
    res.status(201).json(cuenta);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllCuentas = async (req, res) => {
  try {
    const cuentas = await prisma.cuenta.findMany();
    res.status(200).json(cuentas);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getCuentaById = async (req, res) => {
  
  try {
    const cuenta = await prisma.cuenta.findUnique({ where: { id: req.params.id } });
    if (cuenta) {
      res.status(200).json(cuenta);
    } else {
      res.status(404).json({ error: 'Cuenta no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateCuenta = async (req, res) => {

  try {
    const cuenta = await prisma.cuenta.update({
      where: { id:req.params.id },
      data: req.body,
    });
    res.status(200).json(cuenta);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteCuenta = async (req, res) => {
  
  try {
    await prisma.cuenta.delete({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
};
