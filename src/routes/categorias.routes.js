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
  existePorId
} from "../helpers/db-validators.js";
import {validarJWT} from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/",[validarJWT,validarCampos],obtenerCategorias);

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
  [
    check("id").custom(existeCategorioPorID),
    check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty(),
    check("nombre").custom(categoriaExiste),
    validarCampos,
  ],
  eliminarCategoria
);

export default router;
