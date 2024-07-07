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

const router = Router();

router.get("/", obtenerReservaciones);

router.get("/:id", obtenerReservacionId);

router.post(
  "/",
  [
    check("id_mesa", "la mesa de la reservacion es obligatoria").notEmpty(),
    check("pago", "El pago de la reservacion es obligatorio"),
    validarCampos,
  ],
  crearReservacion
);

router.delete("/:id", eliminarReservacion);

router.put(
  "/:id",
  [
    check("id_usuario", "El id del usuario es necesario").notEmpty(),
    check("id_mesa", "la mesa de la reservacion es obligatoria").notEmpty(),
    check("pago", "El pago de la reservacion es obligatorio").notEmpty(),
    validarCampos,
  ],
  actualizarReservacion
);

export default router;
