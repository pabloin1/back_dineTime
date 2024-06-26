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
import {
  categoriaExiste,
  existeCategorioPorID,
} from "../helpers/db-validators.js";

const router = Router();

router.get("/", obtenerCategorias);

router.get(
  "/:id",
  [check("id").custom(existeCategorioPorID), validarCampos],
  obtenerCategoriaId
);

router.get("/obtenerTipo/:tipo", obtenerCategoriaId);

router.post(
  "/",
  [
    check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty(),
    check("nombre").custom(categoriaExiste),
    validarCampos,
  ],
  crearCategoria
);

router.put(
  "/:id",
  [check("id").custom(existeCategorioPorID), validarCampos],
  actualizarCategoria
);

router.delete(
  "/:id",
  [check("id").custom(existeCategorioPorID), validarCampos],
  eliminarCategoria
);

export default router;
