const Pago = require('../models/Pago');
const Cliente = require('../models/Cliente');
const {validationResult} = require('express-validator');

//Crear un nuevo pago
exports.crearPago = async (req, res) =>{
    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }
}