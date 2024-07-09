import { prisma } from "../database/db.js";

export const obtenerCategorias = async (req, res) => {
  try {
    return res.json({
      categorias: await prisma.categorias.findMany({
        include: { productos: true },
      }),
    });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const obtenerCategoriaId = async (req, res) => {
  try {
    const categoria = await prisma.categorias.findFirst({
      where: { id: req.params.id },
      include: { productos: true },
    });

    const { productos, ...resto } = categoria;

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    return res.json({ productos });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const obtenerCategoriaTipo = async (req, res) => {
  try {
    const categoria = await prisma.categorias.findFirst({
      where: { id: req.params.tipo },
      include: { productos: true },
    });
    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    return res.json({ categoria });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const crearCategoria = async (req, res) => {
  try {
    const categoria = await prisma.categorias.create({ data: req.body });
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const actualizarCategoria = async (req, res) => {
  try {
    const categoria = await prisma.categorias.update({
      where: { id: req.params.id },
      data: req.body,
    });
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};

export const eliminarCategoria = async (req, res) => {
  //hola
  try {
    const categoria = await prisma.categorias.delete({
      where: { id: req.params.id },
    });
    return res.json({ categoria });
  } catch (error) {
    return res.status(500).json({msg:error.message});
  }
};
