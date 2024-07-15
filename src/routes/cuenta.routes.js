// /routes/cuentaRoutes.js
import { Router } from 'express';
import { check } from 'express-validator';
import { createCuenta, getAllCuentas, getCuentaById, updateCuenta, deleteCuenta } from '../controllers/cuentas.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { esMesero } from '../middlewares/valida-mesero.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
  '/',
  [
    check('id_mesero', 'El ID del mesero es obligatorio').not().isEmpty(),
    check('id_mesero', 'El ID del mesero debe ser un UUID válido').isUUID(),
    check('total', 'El total debe ser un número').isFloat(),
    check('pagado', 'El campo pagado debe ser booleano').isBoolean(),
    validarJWT,
    esMesero,
    validarCampos
  ],
  createCuenta
);

router.get('/', validarJWT,getAllCuentas);

router.get(
  '/:id',
  [
    check('id', 'ID inválido').isUUID(),
    validarJWT,
    validarCampos
  ],
  getCuentaById
);

router.put(
  '/:id',
  [
    check('id', 'ID inválido').isUUID(),
    check('id_mesero', 'El ID del mesero es obligatorio').not().isEmpty(),
    check('id_mesero', 'El ID del mesero debe ser un UUID válido').isUUID(),
    check('total', 'El total debe ser un número').isFloat(),
    check('pagado', 'El campo pagado debe ser booleano').isBoolean(),
    validarJWT,
    validarCampos
  ],
  updateCuenta
);

router.delete(
  '/:id',
  [
    check('id', 'ID inválido').isUUID(),
    validarJWT,
    validarCampos
  ],
  deleteCuenta
);

export default router;
