import { Router } from "express";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  obtenerProductoId,
  obtenerProductos,
} from "../controllers/producto.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();

router.get("/", obtenerProductos);

router.get("/:id", obtenerProductoId);

router.post(
  "/",
  [
    check("nombre", "El nombre del producto es obligatorio").notEmpty(),
    check("precio", "El precio del producto es obligatorio").notEmpty(),
    check("categoriaId", "La categoria del producto es obligatoria").notEmpty(),
    validarCampos,
  ],
  crearProducto
);

router.delete("/:id", eliminarProducto);

router.put(
  "/:id",
  [
    check("nombre", "El nombre del producto es obligatorio").notEmpty(),
    check("precio", "El precio del producto es obligatorio").notEmpty(),
    check("categoriaId", "La categoria del producto es obligatoria").notEmpty(),
    validarCampos,
  ],
  actualizarProducto
);

export default router;
