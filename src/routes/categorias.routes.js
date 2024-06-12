import { Router } from "express";
import { actualizarCategoria, crearCategoria, eliminarCategoria, obtenerCategoriaId, obtenerCategorias } from "../controllers/categoria.controller.js";


const router = Router();

router.get("/",obtenerCategorias);

router.get("/:id", obtenerCategoriaId);

router.post("/",crearCategoria );

router.put("/:id", actualizarCategoria);

router.delete("/:id",eliminarCategoria);

export default router;
