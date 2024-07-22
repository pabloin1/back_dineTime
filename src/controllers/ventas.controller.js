import { prisma } from "../database/db.js";

export const obtenerVentas = async (req, res) => {
  try {
    return res.json({ ventas: await prisma.ventas.findMany({where:{estado:true}}) });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const obtenerVentaId = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await prisma.ventas.findUnique({ where: { id } });
    return venta
      ? res.json({ venta })
      : res.status(404).json({ error: "Venta no encontrada" });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const crearVenta = async (req, res) => {
  const { precio_Fn, id_mesa} = req.body;

  try {
    const nuevaVenta = await prisma.ventas.create({
      data: {
        precio_Fn,
        id_mesa
      },
    });
    return res.status(201).json({ venta: nuevaVenta });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


export const actualizarVenta = async (req, res) => {
  try {
    const ventaActualizada = await prisma.ventas.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json({ venta: ventaActualizada });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const eliminarVenta = async (req, res) => {
  try {
    await prisma.ventas.update({
      where: { id: req.params.id },
      data: { estado: false },
    });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};
