// /controllers/meseroController.js
import { prisma } from '../database/db.js';

export const createMesero = async (req, res) => {
  try {
    const mesero = await prisma.mesero.create({
      data: req.body,
    });
    res.status(201).json(mesero);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllMeseros = async (req, res) => {
  try {
    const meseros = await prisma.mesero.findMany();
    res.status(200).json(meseros);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getMeseroById = async (req, res) => {
  
  try {
    const mesero = await prisma.mesero.findUnique({ where: { id : req.params.id } });
    if (mesero) {
      res.status(200).json(mesero);
    } else {
      res.status(404).json({ error: 'Mesero no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateMesero = async (req, res) => {
 
  try {
    const mesero = await prisma.mesero.update({
      where: { id : req.params.id },
      data: req.body,
    });
    res.status(200).json(mesero);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteMesero = async (req, res) => {
  try {
    await prisma.mesero.delete({ where: { id : req.params.id} });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error });
  }
};
