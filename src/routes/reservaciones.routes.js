import { Router } from "express";
import {
  actualizarReservacion,
  crearReservacion,
  eliminarReservacion,
  obtenerReservacionId,
  obtenerReservaciones,
} from "../controllers/reservaciones.controller.js";

const router = Router();

router.get("/", obtenerReservaciones);

router.get("/:id", obtenerReservacionId);

router.post("/", crearReservacion);

router.delete("/:id", eliminarReservacion);

router.put("/:id", actualizarReservacion);

export default router;
