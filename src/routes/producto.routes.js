import { Router } from "express";
import { actualizarProducto, crearProducto, eliminarProducto, obtenerProductoId, obtenerProductos } from "../controllers/producto.controller.js";

const router = Router();

router.get("/", obtenerProductos );

router.get("/:id", obtenerProductoId);

router.post("/", crearProducto);

router.delete("/:id", eliminarProducto);

router.put("/:id", actualizarProducto);

export default router;
