const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const auth = require('../middleware/auth');

//Creacion de pacientes
// api/clientes
router.post('/',
    auth,
    clienteController.crearCliente
);

router.get('/',
    auth,
    clienteController.crearCliente
)


module.exports = router;

