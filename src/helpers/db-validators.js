import { prisma } from "../database/db.js";

export const emailExiste = async (correo = "") => {
  // Verificar si el correo existe
  const existeEmail = await prisma.admin.findUnique({ where: { correo } });
  if (existeEmail) throw new Error(`El correo: ${correo}, ya está registrado`);
};

export const categoriaExiste = async (nombre = "") => {
  const existeCategoria = await prisma.categorias.findUnique({
    where: { nombre },
  });
  if (existeCategoria)
    throw new Error(`La categoria con el ${nombre}, ya existe`);
};

export const existeAdminPorId = async (id) => {
  const existeUsuario = await prisma.admin.findUnique({ where: { id } });
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

export const existeCategorioPorID = async (id) => {
  const existeCategoria = await prisma.categorias.findUnique({ where: { id } });
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

export const existeMesaPorId = async (id) => {
  const existeMesa = await prisma.mesas.findUnique({ where: { id } });
  if (!existeMesa) {
    throw new Error(`El id ${id} no existe`)
  }
};

export const validarID = (id, tabla )=>{
  switch (tabla) {
    case 'mesa':
      
      break;
  
    default:
      break;
  } 
}