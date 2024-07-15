import { Router } from "express";
import {
  actualizarMesa,
  crearMesa,
  eliminarMesa,
  obtenerMesas,
  obtenerMesasId,
} from "../controllers/mesas.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
/*
num_mesa      Int
num_sillas    Int
admin         Admin     
id_admin      String*/

const router = Router();

router.get("/", validarJWT,obtenerMesas);

router.get("/:id", obtenerMesasId);

router.post(
  "/",
  [
    check("num_mesa", "El numero de la mesa es obligatorio").not().isEmpty(),
    check("num_sillas", "La cantidad de sillas de la mesa es obligatorio")
      .not()
      .isEmpty(),
    check("id_admin", "El administrador de la mesa es obligatorio")
      .not()
      .isEmpty(),
      validarJWT,
    validarCampos,
  ],
  crearMesa
);

router.delete("/:id", validarJWT,eliminarMesa);

router.put(
  "/:id",
  [
    check("num_mesa", "El numero de la mesa es obligatorio").not().isEmpty(),
    check("num_sillas", "La cantidad de sillas de la mesa es obligatorio")
      .not()
      .isEmpty(),
    check("id_admin", "El administrador de la mesa es obligatorio")
      .not()
      .isEmpty(),
      validarJWT,
    validarCampos,
  ],
  actualizarMesa
);

export default router;
