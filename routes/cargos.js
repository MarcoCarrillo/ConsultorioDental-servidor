const express = require('express');
const router = express.Router();
const cargoController = require('../controllers/cargoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear un cargo 
// api/cargos
router.post('/', 
    auth,
    [
        check('concepto', 'El concepto de cargo es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad de cargo es obligatoria').not().isEmpty(),
        check('cliente', 'El cliente es obligatorio').not().isEmpty()
    ],
    cargoController.crearCargo
);

//Obtener los cargos por clientes
router.get('/',
    auth,
    cargoController.obtenerCargos
);

//Actualizar cargos 
router.put('/:id',
    auth,
    cargoController.actualizarCargo
);

//Eliminar un cargo
router.delete('/:id',
    auth,
    cargoController.eliminarCargo
)

module.exports = router;