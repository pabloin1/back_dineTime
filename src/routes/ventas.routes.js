import { Router } from "express";
import { actualizarVenta, crearVenta, eliminarVenta, obtenerVentaId, obtenerVentas } from "../controllers/ventas.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { check } from "express-validator";

const router = Router();

router.get("/", obtenerVentas);

router.get("/:id", obtenerVentaId);

router.post("/",[
    check('precio_Fn','El precio del producto es obligatorio').notEmpty(),
    check('id_mesa','La mesa en donde se dio la venta es obligatoria').notEmpty(),
    validarCampos
] ,crearVenta);

router.delete("/:id", eliminarVenta);

router.put("/:id", actualizarVenta);

export default router;