const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.autenticarUsuario = async (req, res) => {
    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }

    
}