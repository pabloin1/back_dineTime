import { response, request, json } from "express";
import bcryptjs from "bcryptjs";

import {prisma} from '../database/db.js'

import { generarJWT } from "../helpers/generar-jwt.js";
//import { googleVerify } from "../helpers/google-verify.js";

export const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await prisma.admin.findUnique({where:{correo}});
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

export const googleSingIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleVerify(id_token);

    let usuario = await findOne({ correo });

    if (!usuario) {
      //crear
      const data = {
        nombre,
        correo,
        password: ":p",
        img,
        google: true,
      };

      usuario = new Usuario(data);

      await usuario.save();
    }

    //si el usuario esta en db
    if (!usuario.estado) {
        return res.status(401).json({
            msg: "hable con el administrador, usuario bloqueado"
        })
       
    }

    //generar jwt
    const token = await generarJWT(usuario.id);

    res.json({
      msg: "todo bien",
      usuario,
      token
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};