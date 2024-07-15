export const esMesero = (req, res, next) => {
  const { usuario } = req;

  if (!usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }

  if (usuario.position !== "mesero") {
    return res.status(403).json({
      msg: "El servicio requiere un mesero",
    });
  }

  next();
};
