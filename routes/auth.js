//Rutas de usuarios / Auth
// host + api/auth


const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {createUser, loginUser, revalidateToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const {validateJWT} = require('../middlewares/validar-jwt');


router.post(
    '/new',
    [//middlewares
        check("name", "El nombre es obligatorio").not().isEmpty(),
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({min:6}),
        validarCampos
    ],
    createUser);

router.post(
    '/',
    [
        check("email", "El email es obligatorio").isEmail(),
        check("password", "El password debe de ser de 6 caracteres").isLength({min:6}),
        validarCampos
    ],
    loginUser);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;