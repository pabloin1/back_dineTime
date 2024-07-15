import { Router } from 'express';
import { check } from 'express-validator';


import { validarCampos } from '../middlewares/validar-campos.js';


import { login, loginMesero} from '../controllers/auth.controller.js';


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],login );

router.post('/loginMesero',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
],loginMesero );


export default router;