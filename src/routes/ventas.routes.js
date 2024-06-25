import { Router } from "express";
import { actualizarVenta, crearVenta, eliminarVenta, obtenerVentaId, obtenerVentas } from "../controllers/ventas.controller";
import { validarCampos } from "../middlewares/validar-campos";
import { check } from "express-validator";

const router = Router();

router.get("/", obtenerVentas);

router.get("/:id", obtenerVentaId);

router.post("/",[
    check('id_producto','El producto es obligatorio').notEmpty(),
    check('cantidad','La existencia del producto es obligatorio').notEmpty(),
    check('precio_Fn','El precio del producto es obligatorio').notEmpty(),
    check('id_mesa','La mesa en donde se dio la venta es obligatoria').notEmpty(),
    validarCampos
] ,crearVenta);

router.delete("/:id", eliminarVenta);

router.put("/:id", actualizarVenta);

export default router;