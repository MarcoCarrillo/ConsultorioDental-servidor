const Cargo = require('../models/Cargo');
const Cliente = require('../models/Cliente');
const {validationResult} = require('express-validator')

//Crea un nuevo cargo
exports.crearCargo = async (req, res) => {
    
    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }


}
