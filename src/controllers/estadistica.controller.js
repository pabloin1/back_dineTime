import { prisma } from '../database/db.js';

export const crearEstadistica = async (req, res) => {
  const { id_mesa, ocupacion, Total } = req.body;

  try {
    const nuevaEstadistica = await prisma.estadistica.create({
      data: {
        id_mesa,
        ocupacion,
        Total,
      },
    });
    return res.status(201).json({ estadistica: nuevaEstadistica });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const obtenerEstadisticas = async (req, res) => {
  try {
    const estadisticas = await prisma.estadistica.findMany();
    return res.status(200).json( estadisticas );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const obtenerEstadisticaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const estadistica = await prisma.estadistica.findUnique({
      where: { id },
    });
    if (!estadistica) {
      return res.status(404).json({ msg: 'Estadística no encontrada' });
    }
    return res.status(200).json({ estadistica });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


export const balanceSemanal = async (req, res) => {
  const { margin } = req.query; // El margen de "total" pasado como parámetro de consulta (query parameter)
  const marginValue = margin ? parseFloat(margin) : 5000;

  try {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);

    const estadisticas = await prisma.estadistica.findMany({
      where: {
        createdAt: {
          gte: lastWeek,
        },
      },
    });

    const balance = estadisticas.reduce((acc, curr) => {
      return acc + (curr.Total <= marginValue ? curr.ocupacion : 0);
    }, 0);

    return res.status(200).json({ balance });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
