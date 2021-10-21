const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const auth = require('../middleware/auth');
const {check} = require('express-validator')

//Creacion de pacientes
// api/clientes
router.post('/',
    auth,
    [
        check('nombre', 'El nombre del paciente es obligatorio').not().isEmpty(),
        check('edad', 'La edad es obligatoria').not().isEmpty(),
        check('telefono', 'El telefono del paciente es obligatorio').not().isEmpty(),
        check('tratamiento', 'El tratamiento del paciente es obligatorio').not().isEmpty(),
    ],
    clienteController.crearCliente
);


//Obtener todos los pacientes
router.get('/',
    auth,
    clienteController.obtenerClientes
)


//Eliminar un paciente
router.delete('/:id',
    auth,
    clienteController.eliminarCliente
)


module.exports = router;

