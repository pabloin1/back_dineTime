import { prisma } from "../database/db.js";

export const createCuenta = async (req, res) => {
  try {
    const cuenta = await prisma.cuenta.create({
      data: req.body,
    });
    res.status(201).json(cuenta);
  } catch (error) {
    res.status(400).json({ msg:error.message});
  }
};

export const getAllCuentas = async (req, res) => {
  try {
    const cuentas = await prisma.cuenta.findMany({ where: { estado: true } });
    res.status(200).json(cuentas);
  } catch (error) {
    res.status(400).json({ msg:error.message });
  }
};

export const getCuentaById = async (req, res) => {
  try {
    const cuenta = await prisma.cuenta.findUnique({
      where: { id: req.params.id },
    });
    if (cuenta) {
      res.status(200).json(cuenta);
    } else {
      res.status(404).json({ error: "Cuenta no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ msg:error.message });
  }
};

export const updateCuenta = async (req, res) => {
  try {
    const cuenta = await prisma.cuenta.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(cuenta);
  } catch (error) {
    res.status(400).json({ msg:error.message });
  }
};

export const deleteCuenta = async (req, res) => {
  try {
    await prisma.cuenta.update({
      where: { id: req.params.id },
      data: { estado: false },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ msg:error.message });
  }
};
