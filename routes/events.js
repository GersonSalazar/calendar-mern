/*
    Event Routes
    /api/events
*/

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {validateJWT} = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');

//Todas tienen que pasar por la validacion de JWT
router.use(validateJWT);

//Obtener eventos
router.get('/', getEventos);

//Crear un nuevo evento
router.post(
    '/',
    [
        check("title", "El titulo es obligatorio").not().isEmpty(),
        check("start", "Fecha de inicio es obligatoria").custom(isDate),
        check("end", "Fecha de finalizacion es obligatoria").custom(isDate),
        validarCampos
    ],
    crearEvento);

//Actualizar evento
router.put('/:id', actualizarEvento);

//borrar evento
router.delete('/:id', eliminarEvento);

module.exports = router;