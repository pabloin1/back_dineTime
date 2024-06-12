import { Router } from "express";
import { actualizarAdmin, crearAdmin, eliminarAdmin, obtenerAdminId, obtenerAdmins } from "../controllers/admin.controller.js";


const router = Router();

router.get("/",obtenerAdmins);

router.get("/:id", obtenerAdminId);

router.post("/", crearAdmin);

router.delete("/:id", eliminarAdmin);

router.put("/:id", actualizarAdmin);

export default router;
