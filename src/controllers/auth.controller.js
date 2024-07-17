import { response, request, json } from "express";
import bcryptjs from "bcryptjs";

import { prisma } from "../database/db.js";

import { generarJWT } from "../helpers/generar-jwt.js";
//import { googleVerify } from "../helpers/google-verify.js";

export const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    // Verificar si el email existe
    const usuario = await prisma.admin.findUnique({ where: { correo } });
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
      correo: usuario.correo,
      uid: usuario.id,
      msg: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: error.message });
  }
};

export const loginMesero = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar si el email existe
    const mesero = await prisma.mesero.findUnique({ where: { email } });
    if (!mesero) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - email",
      });
    }

    // Verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, mesero.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    // Generar el JWT
    const token = await generarJWT(mesero.id);

    res.json({
      email: mesero.email,
      msg: "Inicio de sesión exitoso",
      token,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
