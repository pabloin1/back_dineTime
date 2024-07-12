import { response, request } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // Leer el administrador que corresponde al uid
        const admin = await prisma.admin.findUnique({
            where: {
                id: uid
            }
        });

        if (!admin) {
            return res.status(401).json({
                msg: 'Token no válido - admin no existe en DB'
            });
        }

        // Verificar si el uid tiene estado true
        if (!admin.estado) {
            return res.status(401).json({
                msg: 'Token no válido - admin con estado: false'
            });
        }

        req.admin = admin;
        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
};
