import { Router } from "express";
import {
  actualizarReservacion,
  crearReservacion,
  eliminarReservacion,
  obtenerReservacionId,
  obtenerReservaciones,
} from "../controllers/reservaciones.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarReservacion } from "../middlewares/validar-reservacion.js";

const router = Router();

router.get("/", validarJWT,obtenerReservaciones);

router.get("/:id", obtenerReservacionId);

router.post(
  "/",
  [
    check('dia','el dia de la reservacion es obligatorio').notEmpty(),
    check('hora', 'la hora de la reservacion es obligatoria').notEmpty(),
    validarReservacion,
    validarCampos,
  ],
  crearReservacion
);

router.delete("/:id", eliminarReservacion);

router.put(
  "/:id",
  [
    check('dia','el dia de la reservacion es obligatorio').notEmpty(),
    check('hora', 'la hora de la reservacion es obligatoria').notEmpty(),
    validarCampos,
  ],
  actualizarReservacion
);

export default router;
