//Rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator')
const authController = require('../controllers/authController');

//Autentica un usuario
// api/auth
router.post('/', 
    [
        check('usuario', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({min: 6})
    ],
    authController.autenticarUsuario
);

module.exports = router;