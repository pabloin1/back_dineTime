import { Router } from "express";
import { actualizarMesa, crearMesa, eliminarMesa, obtenerMesas, obtenerMesasId } from "../controllers/mesas.controller";
const router = Router();

router.get("/", obtenerMesas);

router.get("/:id", obtenerMesasId);

router.post("/", crearMesa);

router.delete("/:id", eliminarMesa);

router.put("/:id", actualizarMesa);

export default router;
