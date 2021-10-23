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
        check('cantidad', 'La cantidad de cargo es obligatoria').not().isEmpty()
    ],
    cargoController.crearCargo
);

module.exports = router;