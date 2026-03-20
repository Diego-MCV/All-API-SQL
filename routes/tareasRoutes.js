const express = require('express');
const router = express.Router();
const verificarToken = require('../middlewares/authMiddleware');

const {
    obtenerTareas,
    crearTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    eliminarTareas,
    crearTareaUsuario,
    obtenerTareaUsuario
} = require('../controllers/tareasController');

router.get('/', verificarToken, obtenerTareas);
router.post('/', verificarToken, crearTarea);
router.post('/usuario/:usuario_id', verificarToken, crearTareaUsuario);
router.get('/usuario/:usuario_id', verificarToken, obtenerTareaUsuario);
router.get('/:id', verificarToken, obtenerTarea);
router.put('/:id', verificarToken, actualizarTarea);
router.delete('/:id', verificarToken, eliminarTarea);
router.delete('/', verificarToken, eliminarTareas);

module.exports = router;