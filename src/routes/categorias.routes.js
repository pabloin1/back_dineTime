import { Router } from "express";
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  obtenerCategoriaId,
  obtenerCategorias,
} from "../controllers/categoria.controller.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { categoriaExiste } from "../helpers/db-validators.js";

const router = Router();

router.get("/", obtenerCategorias);

router.get("/:id", obtenerCategoriaId);

router.post(
  "/",
  [
    check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty(),
    check("nombre").custom(categoriaExiste),
    validarCampos,
  ],
  crearCategoria
);

router.put("/:id", actualizarCategoria);

router.delete("/:id", eliminarCategoria);

export default router;
