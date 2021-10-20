const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

//Creacion de pacientes
// api/clientes
router.post('/',
    clienteController.crearCliente
)

module.exports = router;

