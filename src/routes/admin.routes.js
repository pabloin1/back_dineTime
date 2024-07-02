import { Router } from "express";
import {
  actualizarAdmin,
  crearAdmin,
  eliminarAdmin,
  obtenerAdminId,
  obtenerAdmins,
} from "../controllers/admin.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { emailExiste, existeAdminPorId,existePorId } from "../helpers/db-validators.js";

const router = Router();

router.get("/", obtenerAdmins);

router.get(
  "/:id",
  [check("id").custom(existePorId('admin')),validarCampos],
  obtenerAdminId
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo es obligatorio").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("correo", "El correo debe de ser un correo valido").isEmail(),
    check("password", "La contraseña debe ser mayor a 6 digitos").isLength(6),
    check("correo").custom(emailExiste),
    validarCampos,
  ],
  crearAdmin
);

router.delete("/:id", eliminarAdmin);

router.put(
  "/:id",
  check("id").custom(existeAdminPorId),
  check("nombre", "El nombre es obligatorio").not().isEmpty(),
  check("correo", "El correo es obligatorio").not().isEmpty(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  check("correo", "El correo debe de ser un correo valido").isEmail(),
  check("password", "La contraseña debe ser mayor a 6 digitos").isLength(6),
  check("correo").custom(emailExiste),
  validarCampos,
  actualizarAdmin
);

export default router;
