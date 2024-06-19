import { prisma } from "../database/db.js";

export const emailExiste = async( correo = '' ) => {
    // Verificar si el correo existe
    const existeEmail = await prisma.admin.findUnique({where:{correo}});
    if ( existeEmail ) 
        throw new Error(`El correo: ${ correo }, ya está registrado`);
    
}

export const categoriaExiste = async (nombre='')=>{
    const existeCategoria = await prisma.categorias.findUnique({where:{nombre}})
    if (existeCategoria)
        throw new Error(`La categoria con el ${nombre}, ya existe`);
}

export const existeAdminPorId = async( id ) => {

    // Verificar si el correo existe
    const existeUsuario = await prisma.admin.findUnique({where:{id}});
    if ( !existeUsuario ) {
        throw new Error(`El id no existe ${ id }`);
    }
}

export const existeCategorioPorID = async (id) =>{
    const existeCategoria = await Categoria.findById(id)
    if (!existeCategoria) {
        throw new Error(`El id no existe ${ id }`);
    }
}


