// /routes/meseroRoutes.js
import { Router } from 'express';
import { check } from 'express-validator';
import { createMesero, getAllMeseros, getMeseroById, updateMesero, deleteMesero } from '../controllers/mesero.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';

const router = Router();

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('apellido', 'El apellido es obligatorio').not().isEmpty(),
    check('email', 'El correo debe ser válido').isEmail(),
    check('position', 'La posición es obligatoria').not().isEmpty(),
    validarCampos
  ],
  createMesero
);

router.get('/', getAllMeseros);

router.get(
  '/:id',
  [
    check('id', 'ID inválido').isUUID(),
    validarCampos
  ],
  getMeseroById
);

router.put(
  '/:id',
  [
    check('id', 'ID inválido').isUUID(),
    check('nombre', 'El nombre no puede estar vacío si se proporciona').optional().not().isEmpty(),
    check('apellido', 'El apellido no puede estar vacío si se proporciona').optional().not().isEmpty(),
    check('email', 'El correo debe ser válido').optional().isEmail(),
    check('position', 'La posición no puede estar vacía si se proporciona').optional().not().isEmpty(),
    validarCampos
  ],
  updateMesero
);

router.delete(
  '/:id',
  [
    check('id', 'ID inválido').isUUID(),
    validarCampos
  ],
  deleteMesero
);

export default router;
