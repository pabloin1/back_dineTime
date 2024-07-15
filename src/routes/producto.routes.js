import { Router } from "express";
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  modificarPuntaje,
  obtenerProductoId,
  obtenerProductos,
  topProducto,
} from "../controllers/producto.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/", validarJWT,obtenerProductos);

router.get("/top-productos",validarJWT, topProducto);

router.get("/:id",validarJWT, obtenerProductoId);

router.post(
  "/",
  [
    check("nombre", "El nombre del producto es obligatorio").notEmpty(),
    check("precio", "El precio del producto es obligatorio").notEmpty(),
    check("categoriaId", "La categoria del producto es obligatoria").notEmpty(),
    validarJWT,
    validarCampos,
  ],
  crearProducto
);

router.delete("/:id", validarJWT,eliminarProducto);

router.put(
  "/:id",
  [
    check("nombre", "El nombre del producto es obligatorio").notEmpty(),
    check("precio", "El precio del producto es obligatorio").notEmpty(),
    check("categoriaId", "La categoria del producto es obligatoria").notEmpty(),
    validarJWT,
    validarCampos,
  ],
  actualizarProducto
);

router.put(
  "/puntaje/:id",
  [check("puntaje", "El puntaje es obligatorio").notEmpty(),validarJWT, validarCampos],
  modificarPuntaje
);

export default router;
