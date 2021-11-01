const express = require('express');
const router = express.Router();
const pagoController = require('../controllers/pagoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear un pago 
// api/pagos
router.post('/',
    auth,
    [
        check('concepto', 'El concepto de cargo es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad de cargo es obligatoria').not().isEmpty(),
        check('cliente', 'El cliente es obligatorio').not().isEmpty()
    ],
    pagoController.crearPago
);

//Obtener los pagos por cliente
router.get('/',
    auth,
    pagoController.obtenerPagos
);

//Actualizar pagos 
router.put('/:id',
    pagoController.actualizarPago
);

router.delete('/:id',
    pagoController.eliminarPago
); 

module.exports = router;
