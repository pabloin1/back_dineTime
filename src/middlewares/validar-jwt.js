import { response, request } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/db.js';

export const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el administrador o mesero que corresponde al uid
        let usuario = await prisma.admin.findUnique({
            where: { id: uid }
        });

        if (!usuario) {
            usuario = await prisma.mesero.findUnique({
                where: { id: uid }
            });

            if (!usuario) {
                return res.status(401).json({
                    msg: 'Token no válido - usuario no existe en DB'
                });
            }
        }

        // Verificar si el uid tiene estado true
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no válido - usuario con estado: false'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
