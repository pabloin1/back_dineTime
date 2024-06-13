import { Router } from "express";
import { actualizarVenta, crearVenta, eliminarVenta, obtenerVentaId, obtenerVentas } from "../controllers/ventas.controller";

const router = Router();

router.get("/", obtenerVentas);

router.get("/:id", obtenerVentaId);

router.post("/", crearVenta);

router.delete("/:id", eliminarVenta);

router.put("/:id", actualizarVenta);

export default router;