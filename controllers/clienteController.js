const Cliente = require('../models/Cliente');
const { validationResult } = require('express-validator')

exports.crearCliente = async (req, res) => {

    //Revisar si hay errores con express validator
    const errores = validationResult(req);
    if( !errores.isEmpty() ){
        res.status(400).json({errores: errores.array()});
    }

    try {
        //Crear un nuevo paciente
        const cliente = new Cliente(req.body);

        //Guardar el creador via jsonwebtoken
        cliente.creador = req.user.id;
        console.log(req.user);

        cliente.save();
        res.json(cliente);
        console.log(cliente);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}