import { prisma } from "../database/db.js";

export const obtenerMesas = async (req, res) => {
  try {
    return res.json({ mesas: await prisma.mesas.findMany({where:{estado:true}}) });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const obtenerMesasId = async (req, res) => {
  try {
    const mesa = await prisma.mesas.findFirst({
      where: { id:req.params.id },
    });
    if (!mesa) {
      return res.status(404).json({ error: "Mesa no encontrada" });
    }
    return res.json({ mesa });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const crearMesa = async (req, res) => {
  try {
    const nuevaMesa = await prisma.mesas.create({
      data: req.body,
    });
    return res.status(201).json({ mesa: nuevaMesa });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const actualizarMesa = async (req, res) => {
  try {
    const mesaActualizada = await prisma.mesas.update({
      where: { id:req.params.id },
      data: req.body,
    });
    return res.json({ mesa: mesaActualizada });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const eliminarMesa = async (req, res) => {
  try {
    const mesaEliminada = await prisma.mesas.update({
      where: { id: req.params.id },
      data: { estado: false },
    });
    return res.json({
      msg:'mesa eliminada correctamente',
     mesaEliminada
    });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};
