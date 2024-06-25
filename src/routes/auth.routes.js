import { Router } from 'express';
import { check } from 'express-validator';


import { validarCampos } from '../middlewares/validar-campos.js';


import { login, googleSingIn } from '../controllers/auth.controller.js';


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

router.post('/google',[
    check('id_token', 'token de google es necesario').not().isEmpty(),
    validarCampos
],googleSingIn);



export default router;