import express from 'express';
import {
  crearEstadistica,
  obtenerEstadisticas,
  obtenerEstadisticaPorId,
  balanceSemanal,
} from '../controllers/estadistica.controller.js';

const router = express.Router();

router.get('/', obtenerEstadisticas);
router.get('/:id', obtenerEstadisticaPorId);
router.post('/', crearEstadistica);
router.get('/estadisticas/balance-semanal', balanceSemanal);


export default router;

